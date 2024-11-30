import { useEffect, useRef } from 'react';
import './chat.css';
import sampleImage from './default-user.svg';

const Chat = () => {
  const endRef = useRef(null);
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <>
      <div id='chat'>
        <div className='message sent'>
          <p className='textMessage'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eget justo eget orci dignissim rhoncus sed eget augue. Suspendisse potenti. Pellentesque luctus id felis nec faucibus. Duis ut consequat massa. Quisque dapibus consequat mi, non ultrices metus tempus at. In finibus euismod purus. Aenean finibus placerat nibh hendrerit semper. Vivamus mauris nulla, auctor nec mauris vitae, tincidunt lacinia turpis. Proin luctus dui eget varius egestas. Donec mollis accumsan nisl. Maecenas ultrices magna sed urna consectetur faucibus. Integer finibus, elit non finibus eleifend, ipsum urna hendrerit orci, rutrum vehicula mi elit at diam. Aenean luctus interdum lorem, id fermentum odio blandit vitae.
          </p>
          <span className='timestamp'>12:54</span>
        </div>

        <div className='message receive'>
          <img src={sampleImage} alt='sampleImage' />
          <p className='textMessage'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eget justo eget orci dignissim rhoncus sed eget augue. Suspendisse potenti. Pellentesque luctus id felis nec faucibus. Duis ut consequat massa. Quisque dapibus consequat mi, non ultrices metus tempus at. In finibus euismod purus. Aenean finibus placerat nibh hendrerit semper. Vivamus mauris nulla, auctor nec mauris vitae, tincidunt lacinia turpis. Proin luctus dui eget varius egestas. Donec mollis accumsan nisl. Maecenas ultrices magna sed urna consectetur faucibus. Integer finibus, elit non finibus eleifend, ipsum urna hendrerit orci, rutrum vehicula mi elit at diam. Aenean luctus interdum lorem, id fermentum odio blandit vitae.
          </p>
          <span className='timestamp'>12:54</span>
        </div>

        <div className='message sent'>
          <p className='textMessage'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eget justo eget orci dignissim rhoncus sed eget augue. Suspendisse potenti. Pellentesque luctus id felis nec faucibus. Duis ut consequat massa. Quisque dapibus consequat mi, non ultrices metus tempus at. In finibus euismod purus. Aenean finibus placerat nibh hendrerit semper. Vivamus mauris nulla, auctor nec mauris vitae, tincidunt lacinia turpis. Proin luctus dui eget varius egestas. Donec mollis accumsan nisl. Maecenas ultrices magna sed urna consectetur faucibus. Integer finibus, elit non finibus eleifend, ipsum urna hendrerit orci, rutrum vehicula mi elit at diam. Aenean luctus interdum lorem, id fermentum odio blandit vitae.
          </p>
          <span className='timestamp'>12:54</span>
        </div>

        <div ref={endRef}></div>
      </div>
    </>
  );
}

export default Chat;
