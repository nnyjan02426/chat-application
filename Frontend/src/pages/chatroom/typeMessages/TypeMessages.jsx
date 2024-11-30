import './typeMessages.css';
import image from './image.svg';
import send from './send.svg';

const TypeMessages = () => {
  return (
    <>
      <div id='typeMessages'>
        <img src={image} alt='image' id='addImage' className='button' />
        <span id='inputText'>
          <input type='text' placeholder='type message here' />
        </span>
        <img src={send} alt='send' id='send' className='button' />
      </div>
    </>
  );
}

export default TypeMessages;
