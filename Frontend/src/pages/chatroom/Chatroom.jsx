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
const username = (token) ? jwtDecode(token).username : 'unknown';


const Chatroom = () => {
  const [messages, setMessages] = useState([]);
  // TODO: change rooms?
  const [currentRoom, setCurrentRoom] = useState('general');

  useEffect(() => {
    // join chatroom
    socket.emit('join_room', currentRoom);

    // listen for messages
    socket.on('receive_message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => { socket.off('receive_message'); }
  }, [currentRoom]);

  const sendMessage = (messageContent) => {
    const message = {
      roomId: currentRoom,
      sender: username,
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
        <Roomname roomName={currentRoom} />
        <Chat messages={messages} username={username} />
        <TypeMessages onSendMessage={sendMessage} />
      </div>
    </>
  );
}

export default Chatroom;

