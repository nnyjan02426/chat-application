import "./chatroom.css";
import Chat from "./chat/Chat";
import Roomname from "./roomname/Roomname";
import TypeMessages from "./typeMessages/TypeMessages";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { jwtDecode } from "jwt-decode";


// backend url
const socket = io('http://localhost:3000');

// fetch username from stored token
const token = localStorage.getItem('token');
const { id: userId, username } = (token) ? jwtDecode(token) : { id: null, username: 'unknown' };

const Chatroom = ({ roomId }) => {
  const [messages, setMessages] = useState([]);
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const response = await fetch(`/api/chatrooms/${roomId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          setParticipants(data.chatroom.participants); // Assuming API includes participants
        } else {
          alert(data.message || 'Failed to fetch participants.');
        }
      } catch (error) {
        console.error('Error fetching participants:', error);
      }
    };
    fetchParticipants();
  }, [roomId]);

  useEffect(() => {
    // join chatroom
    socket.emit('join_room', roomId);

    // listen for messages
    socket.on('receive_message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => { socket.off('receive_message'); }
  }, [roomId]);

  const sendMessage = (messageContent) => {
    const message = {
      roomId: roomId,
      sender: userId,
      content: messageContent,
      timestamp: new Date().toLocaleTimeString(),
    }

    // emit message to backend
    socket.emit('send_message', message);
    // add message to local state
    setMessages((prevMessages) => [...prevMessages, message]);
  }

  return (
    <>
      <div id="chatroom">
        <Roomname roomId={roomId} />
        <Chat messages={messages} username={username} userId={userId} participants={participants} />
        <TypeMessages onSendMessage={sendMessage} />
      </div>
    </>
  );
}

export default Chatroom;

