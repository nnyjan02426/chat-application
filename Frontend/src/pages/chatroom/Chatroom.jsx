import "./chatroom.css";
import Chat from "./chat/Chat";
import Roomname from "./roomname/Roomname";
import TypeMessages from "./typeMessages/TypeMessages";

const Chatroom = () => {
  return (
    <>
      <div id="chatroom">
        <Roomname />
        <Chat />
        <TypeMessages />
      </div>
    </>
  );
}

export default Chatroom;

