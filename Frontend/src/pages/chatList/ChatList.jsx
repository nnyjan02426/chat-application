import "./chatList.css";
import { useState, useEffect } from "react";
import ChatTile from "./chatTile/ChatTile";
import SearchBar from "./searchBar/SearchBar";
import UserTile from "./userTile/UserTile";

const ChatList = ({ showEdit, showChatroom }) => {
  const [chatrooms, setChatrooms] = useState([]);

  // fetch chatrooms which the user is participated in
  useEffect(() => {
    const fetchChatrooms = async () => {
      try {
        const response = await fetch('/api/chatrooms', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const data = await response.json();

        if (response.ok) {
          setChatrooms(data.chatrooms); // Save the fetched chatrooms in state
        } else {
          alert(data.message || 'Failed to fetch chatrooms.');
        }
      } catch (error) {
        console.error('Error fetching chatrooms:', error);
      }
    };

    fetchChatrooms();
  }, []);

  // Handle joining a room
  const handleJoinRoom = async (roomId) => {
    try {
      const response = await fetch(`/api/chatrooms/join`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ roomId }),
      });
      const data = await response.json();
      if (response.ok) {
        setChatrooms((prev) => [...prev, data.chatroom]); // Add the new room to the list
        alert(`Joined room: ${roomId}`);
      } else {
        alert(data.message || "Failed to join room.");
      }
    } catch (error) {
      console.error("Error joining room:", error);
    }
  };

  // Handle creating a new room
  const handleCreateRoom = async () => {
    try {
      const response = await fetch(`/api/chatrooms/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setChatrooms((prev) => [...prev, data.chatroom]); // Add the new room to the list
        alert(`Created new room: ${data.chatroom.roomId}`);
      } else {
        alert(data.message || "Failed to create room.");
      }
    } catch (error) {
      console.error("Error creating room:", error);
    }
  };

  return (
    <div className="chatList">
      <UserTile showEdit={showEdit} />
      <SearchBar onJoinRoom={handleJoinRoom} onCreateRoom={handleCreateRoom} />

      <div className="column">
        {chatrooms.map((chatroom) => (
          <ChatTile
            key={chatroom.roomId}
            chatroom={chatroom}
            showChatroom={() => showChatroom(chatroom.roomId)}
          />
        ))}
      </div>
    </div>
  );
}

export default ChatList;

