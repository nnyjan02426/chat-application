import './roomname.css';
import { useState, useEffect } from 'react';
import copyIcon from './copy.svg';

const Roomname = ({ roomId }) => {
  const [participants, setParticipants] = useState([]);

  // fetch participants from the backend
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
          setParticipants(data.chatroom.participants); // Assuming the API returns a chatroom with participants
        } else {
          alert(data.message || 'Failed to fetch participants.');
        }
      } catch (error) {
        console.error('Error fetching participants:', error);
      }
    };

    fetchParticipants();
  }, [roomId]);

  // copy roomId to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(roomId).then(() => {
      alert('Room ID copied to clipboard!');
    }).catch((error) => {
      console.error('Failed to copy room ID:', error);
    });
  };

  return (
    <div className='roomname'>
      {/* copy roomId */}
      <img src={copyIcon} alt='copy' id='copyIcon' className='icon button' onClick={handleCopy} />
      {/* shows room details */}
      <div className='text'>
        <p id='roomId' title={`${roomId}`}>
          <span style={{ fontWeight: 'bold' }}>Room ID: </span>
          {roomId}
        </p>
        <span className='participants' id='participants'>
          Participants: {participants.map((p) => p.username).join(', ')}
        </span>
      </div>
    </div>
  );
}

export default Roomname;
