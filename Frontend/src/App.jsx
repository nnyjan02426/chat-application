import './App.css';
import Chatroom from './pages/chatroom/Chatroom';
import ChatList from './pages/chatList/ChatList';
import Details from './pages/details/Details';
import Login from './pages/login/Login';


const App = () => {
  const user = true;
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
