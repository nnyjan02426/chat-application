import './App.css';
import Chatroom from './pages/chatroom/Chatroom';
import ChatList from './pages/chatList/ChatList';
import Details from './pages/details/Details';
import Login from './pages/login/Login';
import { useState } from 'react';


const App = () => {
  const [user, setUser] = useState(localStorage.getItem('token') ? true : false);
  // const user = true;

  return (
    <div id='App'>
      {user ? (
        <>
          <ChatList />
          <Chatroom />
          <Details />
        </>
      ) : (<Login />)}
    </div>
  );
}

export default App;
