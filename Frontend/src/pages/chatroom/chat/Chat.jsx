import { useEffect, useRef } from 'react';
import './chat.css';
import defaultAvatar from './default-user.svg';

const Chat = ({ messages, username }) => {
  // auto scrolls to the last message receives or sent
  const endRef = useRef(null);
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const isImage = (content) => {
    // check for base64 image header
    if (content.startsWith('data:image/') || content.startsWith('blob:http://')) return true;

    // check image file extension
    const imageExtensions = ['jpeg', 'jpg', 'png', 'gif', 'bmp', 'webp', 'svg', 'tiff', 'tif', 'ico', 'heic', 'avif'];
    const extension = content.split('.').pop().toLowerCase();
    return imageExtensions.includes(extension);
  }

  return (
    <div id='chat'>
      {messages.map((msg, index) => (
        <div key={index} className={`message ${msg.sender === username ? 'sent' : 'receive'}`}>
          {/* shows the avatar of the received messages' sender */}
          {(msg.sender !== username) &&
            <img src={defaultAvatar} alt='sampleImage' />}

          {isImage(String(msg.content)) ? (
            <img src={msg.content} alt="imageMessage" className='imageMessage' />
          ) : (
            <p className='textMessage'>{msg.content}</p>
          )}
          <span id='timestamp'>{msg.timestamp}</span>
        </div>
      ))}
      {/* <div className='message sent'> */}
      {/*   <p className='textMessage'> */}
      {/*     Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eget justo eget orci dignissim rhoncus sed eget augue. Suspendisse potenti. Pellentesque luctus id felis nec faucibus. Duis ut consequat massa. Quisque dapibus consequat mi, non ultrices metus tempus at. In finibus euismod purus. Aenean finibus placerat nibh hendrerit semper. Vivamus mauris nulla, auctor nec mauris vitae, tincidunt lacinia turpis. Proin luctus dui eget varius egestas. Donec mollis accumsan nisl. Maecenas ultrices magna sed urna consectetur faucibus. Integer finibus, elit non finibus eleifend, ipsum urna hendrerit orci, rutrum vehicula mi elit at diam. Aenean luctus interdum lorem, id fermentum odio blandit vitae. */}
      {/*   </p> */}
      {/*   <span className='timestamp'>12:54</span> */}
      {/* </div> */}
      {/**/}
      {/* <div className='message receive'> */}
      {/*   <img src={sampleImage} alt='sampleImage' /> */}
      {/*   <p className='textMessage'> */}
      {/*     Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eget justo eget orci dignissim rhoncus sed eget augue. Suspendisse potenti. Pellentesque luctus id felis nec faucibus. Duis ut consequat massa. Quisque dapibus consequat mi, non ultrices metus tempus at. In finibus euismod purus. Aenean finibus placerat nibh hendrerit semper. Vivamus mauris nulla, auctor nec mauris vitae, tincidunt lacinia turpis. Proin luctus dui eget varius egestas. Donec mollis accumsan nisl. Maecenas ultrices magna sed urna consectetur faucibus. Integer finibus, elit non finibus eleifend, ipsum urna hendrerit orci, rutrum vehicula mi elit at diam. Aenean luctus interdum lorem, id fermentum odio blandit vitae. */}
      {/*   </p> */}
      {/*   <span className='timestamp'>12:54</span> */}
      {/* </div> */}
      {/**/}
      {/* <div className='message sent'> */}
      {/*   <p className='textMessage'> */}
      {/*     Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eget justo eget orci dignissim rhoncus sed eget augue. Suspendisse potenti. Pellentesque luctus id felis nec faucibus. Duis ut consequat massa. Quisque dapibus consequat mi, non ultrices metus tempus at. In finibus euismod purus. Aenean finibus placerat nibh hendrerit semper. Vivamus mauris nulla, auctor nec mauris vitae, tincidunt lacinia turpis. Proin luctus dui eget varius egestas. Donec mollis accumsan nisl. Maecenas ultrices magna sed urna consectetur faucibus. Integer finibus, elit non finibus eleifend, ipsum urna hendrerit orci, rutrum vehicula mi elit at diam. Aenean luctus interdum lorem, id fermentum odio blandit vitae. */}
      {/*   </p> */}
      {/*   <span className='timestamp'>12:54</span> */}
      {/* </div> */}

      <div ref={endRef}></div>
    </div>
  );
}

export default Chat;
