import './typeMessages.css';
import image from './image.svg';
import send from './send.svg';
import { useState } from 'react';

const TypeMessages = ({ onSendMessage }) => {
  const [inputText, setInputText] = useState('');

  const handleSend = () => {
    if (inputText.trim()) {
      onSendMessage(inputText);
      setInputText(''); // clear input after send
    }
  }
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') { handleSend(); }
  }

  return (
    <>
      <div id='typeMessages'>
        <img src={image} alt='imageButton' id='addImage' className='button' />
        <span id='inputText'>
          <input
            type='text'
            placeholder='type message here'
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyPress} />
        </span>
        <img src={send} alt='send' id='send' className='button' onClick={handleSend} />
      </div>
    </>
  );
}

export default TypeMessages;
