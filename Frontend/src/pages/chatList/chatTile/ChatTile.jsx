import './chatTile.css';
import defaultUser from './default-user.svg';
import leaveIcon from './leave.svg';
import { jwtDecode } from 'jwt-decode';

const getUserIdFromToken = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const decoded = jwtDecode(token); // Decode the token
    return decoded.id; // Return the user ID from the payload
  } catch (error) {
    console.error('Failed to decode token:', error);
    return null;
  }

};

const ChatTile = ({ chatroom, showChatroom }) => {
  const currentUserId = getUserIdFromToken();
  const otherParticipants = chatroom.participants.filter((p) => p._id !== currentUserId);

  return (
    <div className='chatTile' onClick={showChatroom}>
      {/* shows first user's avatar */}
      <img src={otherParticipants[0]?.avatar || defaultUser} alt='user' id='userImage' />

      {/* shows users' name */}
      <div className='text'>
        <p id='participants' className='participants'>{
          otherParticipants.map((p) => p.username).join(', ')
        }</p>
        <span id='chatPreview'>{chatroom.lastMessage || 'No messages yet!'}</span>
      </div>
      {/* TODO: leave chatroom by pressing the leave button */}
      <img src={leaveIcon} alt='leave' id='leaveIcon' className='button icon' />
    </div>
  );
}

export default ChatTile;
