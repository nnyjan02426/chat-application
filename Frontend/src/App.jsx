import './App.css';
import Chatroom from './pages/chatroom/Chatroom';
import ChatList from './pages/chatList/ChatList';
import Edit from './pages/edit/Edit';
import Login from './pages/login/Login';
import { useState } from 'react';


const App = () => {
  const [user, setUser] = useState(localStorage.getItem('token') ? true : false);
  // const [user, setUser] = useState(true);
  const [showEdit, setShowEdit] = useState(true);
  const [currentRoomId, setCurrentRoomId] = useState(null);

  return (
    <div id='App'>
      {user ? (
        <>
          <ChatList
            showEdit={() => setShowEdit(true)}
            showChatroom={(roomId) => {
              setShowEdit(false);
              setCurrentRoomId(roomId);
            }} />
          {showEdit ?
            <Chatroom roomId={currentRoomId} /> :
            <Edit setUser={setUser} />
          }
        </>
      ) : (<Login setUser={setUser} />)}
    </div>
  );
}

export default App;
