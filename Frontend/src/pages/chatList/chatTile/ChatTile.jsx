import './chatTile.css';
import defaultUser from './default-user.svg';
import edit from './edit.svg';

const ChatTile = () => {
  return (
    <div className='chatTile'>
      {/* shows user's image */}
      <img src={defaultUser} alt='user image' id='userImage' />

      {/* shows user's name */}
      <div className='text'>
        <p id='username'>User Name</p>
        <span id='chatPreview'>some text</span>
      </div>
      <img src={edit} alt='edit' id='edit' className='button' />
    </div>
  );
}

export default ChatTile;
