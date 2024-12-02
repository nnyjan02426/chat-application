import "./chatList.css";
import ChatTile from "./chatTile/ChatTile";
import SearchBar from "./searchBar/SearchBar";
import UserTile from "./userTile/UserTile";

const ChatList = () => {
  return (
    <div className="chatList">
      <UserTile />
      <SearchBar />

      {/* TODO: add chat list */}
      <div className="column">
        <ChatTile />
        <ChatTile />
        <ChatTile />
        <ChatTile />
        <ChatTile />
        <ChatTile />
        <ChatTile />
      </div>
    </div>
  );
}

export default ChatList;

