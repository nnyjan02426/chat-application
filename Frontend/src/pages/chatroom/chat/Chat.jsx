import { useEffect, useRef, useState } from 'react';
import './chat.css';
import defaultAvatar from './default-user.svg';

const Chat = ({ messages, userId, participants }) => {
    // auto scrolls to the last message receives or sent
    const endRef = useRef(null);
    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // check if message is image
    const isImage = (content) => {
        // check for base64 image header
        if (content.startsWith('data:image/') || content.startsWith('blob:http://')) return true;

        // check image file extension
        const imageExtensions = ['jpeg', 'jpg', 'png', 'gif', 'bmp', 'webp', 'svg', 'tiff', 'tif', 'ico', 'heic', 'avif'];
        const extension = content.split('.').pop().toLowerCase();
        return imageExtensions.includes(extension);
    }

    const [userCache, setUserCache] = useState({}); //cache for username & avatar
    const fetchUserDetails = async (userId) => {
        if (userCache[userId]) return userCache[userId];

        try {
            const response = await fetch(`/api/users/${userId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            const data = await response.json();

            if (response.ok) {
                // Update the cache with the new user details
                setUserCache((prevCache) => ({
                    ...prevCache,
                    [userId]: { username: data.username, avatar: data.avatar || defaultAvatar },
                }));
                return { username: data.username, avatar: data.avatar || defaultAvatar };
            } else {
                console.error('Failed to fetch user details:', data.message);
                return { username: 'Unknown', avatar: defaultAvatar }; // Fallback
            }
        } catch (error) {
            console.error('Error fetching user details:', error);
            return { username: 'Unknown', avatar: defaultAvatar }; // Fallback
        }
    }

    const getSenderDetail = async (senderId) => {
        if (!userCache[senderId]) await fetchUserDetails(senderId);
        return userCache[senderId] || { username: 'unknown', avatar: defaultAvatar };
    }

    return (
        <div id='chat'>
            {messages.map((msg, index) => (
                <div key={index} className={`message ${msg.sender === userId ? 'sent' : 'receive'}`}>
                    {/* shows the avatar of the received messages' sender */}
                    {(msg.sender !== userId) &&
                        <img
                            src={getSenderDetail(msg.sender).avatar}
                            alt='senderAvatar'
                            title={getSenderDetail(msg.sender).username}
                            id='senderAvatar' />}

                    {isImage(String(msg.content)) ? (
                        <img src={msg.content} alt={String(msg.content)} className='imageMessage' />
                    ) : (
                        <p className='textMessage'>{msg.content}</p>
                    )}
                    <span id='timestamp'>{msg.timestamp}</span>
                </div>
            ))}

            <div ref={endRef}></div>
        </div>
    );
}

export default Chat;
