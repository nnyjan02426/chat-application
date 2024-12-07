import './typeMessages.css';
import image from './image.svg';
import send from './send.svg';
import { useState } from 'react';

const TypeMessages = ({ onSendMessage }) => {
    const [inputText, setInputText] = useState('');
    const [uploadImage, setUploadImage] = useState({ file: null, url: '' });

    const handleImage = (e) => {
        if (e.target.files[0]) {
            const file = e.target.files[0];
            const url = URL.createObjectURL(file);
            setUploadImage({ file, url });

            // Optionally preview the image in the UI
            console.log('Selected image:', file.name);
        }
    };

    const handleSend = () => {
        if (inputText.trim()) {
            onSendMessage(inputText);
            setInputText(''); // clear input after send
        }
        if (uploadImage.file) {
            // Upload the image or send its details
            onSendMessage(uploadImage.url); // Replace with the actual image URL from your backend if needed
            setUploadImage({ file: null, url: '' }); // Clear the selected image after sending
        }
    }
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') { handleSend(); }
    }

    return (
        <>
            <div id='typeMessages'>
                <div id="uploadImage">
                    <label htmlFor="file">
                        <img src={image} alt='uploadImage' id='addImage' className='button' />
                        <input
                            type="file"
                            id="file"
                            style={{ display: 'none' }}
                            accept="image/*" // Limit to image files
                            onChange={handleImage}
                        />
                    </label>
                </div>
                <span id='inputText'>
                    {uploadImage.url && (
                        <div id="imagePreview">
                            <img src={uploadImage.url} alt="Preview" />
                            <p>{uploadImage.file?.name}</p>
                        </div>
                    )}

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
