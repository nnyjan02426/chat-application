import './App.css';
import Chatroom from './pages/chatroom/Chatroom';
import ChatList from './pages/chatList/ChatList';
import Edit from './pages/edit/Edit';
import Login from './pages/login/Login';
import { useEffect, useState } from 'react';


const App = () => {
    const [user, setUser] = useState(localStorage.getItem('token') ? true : false);
    // const [user, setUser] = useState(true);
    const [showEdit, setShowEdit] = useState(true);
    const [currentRoomId, setCurrentRoomId] = useState(null);

    const [appHeight, setAppHeight] = useState('100vh');
    useEffect(() => {
        const updateAppHeight = () => {
            const screenHeight = window.innerHeight;
            if (showEdit) {
                setAppHeight(screenHeight < 600 ? '100%' : '100vh');
            } else {
                setAppHeight(screenHeight < 250 ? '100%' : '100vh');
            }
        }
        updateAppHeight();
        window.addEventListener('resize', updateAppHeight);
        return () => {
            window.removeEventListener('resize', updateAppHeight);
        }
    }, [showEdit])

    // for divider: change size
    const [dividerPosition, setDividerPosition] = useState(30);
    const [isDragging, setIsDragging] = useState(false);
    const handleMouseMove = (e) => {
        if (!isDragging) return;
        const newPos = (e.clientX / window.innerWidth) * 100;
        if (newPos > 20 && newPos < 80) {
            setDividerPosition(newPos);
        }
    }
    const handleTouchMove = (e) => {
        if (!isDragging) return;
        const newPos = (e.touches[0].clientX / window.innerWidth) * 100;
        if (newPos > 20 && newPos < 80) {
            setDividerPosition(newPos);
        }
    }

    return (
        <>
            {user ? (
                <div
                    id='App'
                    style={{ height: appHeight }}
                    onMouseMove={handleMouseMove}
                    onMouseUp={() => setIsDragging(false)}
                    onMouseLeave={() => setIsDragging(false)}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={() => setIsDragging(false)}
                >
                    <ChatList
                        dividerPosition={dividerPosition}
                        showEdit={() => setShowEdit(true)}
                        showChatroom={(roomId) => {
                            setShowEdit(false);
                            setCurrentRoomId(roomId);
                        }} />

                    {/* drag divider to change size */}
                    <div
                        id='divider'
                        onMouseDown={() => setIsDragging(true)}
                        onTouchStart={() => setIsDragging(true)}
                        style={{ cursor: isDragging ? "grabbing" : "ew-resize" }}
                    ></div>

                    {showEdit ?
                        <Edit dividerPosition={dividerPosition} setUser={setUser} /> :
                        <Chatroom dividerPosition={dividerPosition} roomId={currentRoomId} />
                    }
                </div>
            ) : (<Login setUser={setUser} />)}
        </>
    );
}

export default App;
