import './userTile.css';
import more from './more-horizontal.svg';
import defaultUser from './default-user.svg';
import edit from './edit.svg';
import logout from './logout.svg';

const UserTile = () => {
  return (
    <div id='userTile'>
      <div className='user'>
        {/* shows user's image */}
        <img src={defaultUser} alt='user' id='userImage' />
        {/* shows user's name */}
        <p id='username'>User Name</p>
      </div>

      <div className='buttons'>
        {/* other settings, e.g. edit, delete */}
        <img src={more} alt='more' className='button' id='more-button' />
        <img src={edit} alt='edit' className='button' />
        <img src={logout} alt='logout' className='button' />
      </div>
    </div>
  );
}

export default UserTile;
