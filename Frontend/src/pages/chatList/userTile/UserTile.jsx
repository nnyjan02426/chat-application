import './userTile.css';
// import moreIcon from './more-horizontal.svg';
import defaultAvatar from './defaultAvatar.svg';
import editIcon from './edit.svg';
import { useEffect, useState } from 'react';


const UserTile = ({ showEdit }) => {
  const [username, setUsername] = useState('');
  const [avatar, setAvatar] = useState(defaultAvatar);

  // Fetch user profile on component mount
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch('/api/users/profile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          setUsername(data.user.username);
          setAvatar({ file: null, url: data.user.avatar || defaultAvatar });
        } else {
          alert(data.message || 'Failed to fetch user data.');
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
        alert('Server error. Please try again later.');
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <div id='userTile'>
      <div className='user'>
        {/* shows user's image */}
        <img src={avatar} alt='user' id='userImage' />
        {/* shows user's name */}
        <p id='username'>{username}</p>
      </div>

      <div className='buttons'>
        {/* other settings, e.g. edit, delete */}
        {/* <img src={moreIcon} alt='more' className='button icon' id='more-button' /> */}
        <img src={editIcon} alt='edit' className='button icon' onClick={showEdit} />
      </div>
    </div>
  );
}

export default UserTile;
