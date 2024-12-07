import './roomname.css';
import defaultUser from './default-user.svg';

const Roomname = ({ roomName }) => {
  return (
    <>
      <div className='roomname'>
        <div className='text'>
          <p>{roomName}</p>
        </div>
        {/* shows user's image */}
        {/* <img src={defaultUser} alt='user' id='userImage' /> */}

        {/* shows user's name */}
        {/* <div className='text'> */}
        {/*   <p id='username'>User Name</p> */}
        {/*   <span id='note'>some text</span> */}
        {/* </div> */}
      </div>
    </>
  );
}

export default Roomname;
