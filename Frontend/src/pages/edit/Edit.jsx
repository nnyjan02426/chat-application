import './edit.css';
import { useEffect, useState } from 'react';
import logout from './logout.svg';
import defaultAvatar from './defaultAvatar.svg';
import userIcon from './user.svg';
import clearIcon from './clear.svg';
import enterIcon from './enter.svg';

const Edit = ({ dividerPosition, setUser }) => {
    const [username, setUsername] = useState('');
    const [avatar, setAvatar] = useState({ file: null, url: "" })
    const [isLoading, setIsLoading] = useState(false);

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

    const handleAvatar = (e) => {
        if (e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = () => {
                setAvatar({
                    file,
                    url: reader.result, // Base64 string for image
                });
            };
            reader.readAsDataURL(file);
        }
        // if (e.target.files[0]) {
        //   setAvatar({
        //     file: e.target.files[0],
        //     url: URL.createObjectURL(e.target.files[0])
        //   })
        // }
    }

    const handleUpdate = async () => {
        setIsLoading(true);

        try {
            const payload = {
                username,
                avatar: avatar.url, // Base64 string or URL
            };

            const response = await fetch('/api/users/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (response.ok) {
                alert('Profile updated successfully!');
                setAvatar({ file: null, url: data.user.avatar });
                setUsername(data.user.username);
            } else {
                alert(data.message || 'Failed to update profile.');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Server error. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setUser(false);
        alert('Logout successful!');

        // Redirect to chatroom or reload the app
        window.location.reload();
    };

    return (
        <div id='editPage' style={{ flex: `${100 - dividerPosition} 0 0` }}>
            <h2>Update User Info</h2>
            <div id='updateUserInfo'>
                {/* change avatar */}
                <div id='updateAvatar'>
                    <p>Change User Avatar</p>
                    <label htmlFor='file'>
                        <img src={avatar.url || defaultAvatar} alt="" /><p>Upload an Image</p>
                    </label>
                    <input
                        type="file"
                        id="file"
                        style={{ display: 'none' }}
                        accept="image/*"
                        onChange={handleAvatar} />
                </div>

                {/* change username */}
                <div id='updateUsername'>
                    <p>Change Username</p>
                    <div className='searchInput'>
                        <img src={userIcon} alt='' id='user-icon' className='icon' />
                        <input type="text" placeholder={username} id='username-input' onChange={(e) => setUsername(e.target.value)} />
                        <img src={clearIcon} alt='x' id='clear' className='button' onClick={() => setUsername('')} />
                    </div>
                </div>

                {/* update the changes */}
                <div id='updateInfo' className='TextButton' onClick={handleUpdate}>
                    <p>{isLoading ? 'Updating...' : 'Update'}</p>
                    <img src={enterIcon} alt='update' className='icon' />
                </div>
            </div>

            <div id='borderline'></div>

            {/* logout button */}
            <div id='logout' className='TextButton' onClick={handleLogout}>
                <p>log out</p>
                <img src={logout} alt='logout' className='icon' />
            </div>

            {/* <div id='ShowChatroom' className='TextButton' onClick={setShowEdit(false)}> */}
            {/*   <p>show chatroom</p> */}
            {/*   <img src={logout} alt='logout' className='icon' /> */}
            {/* </div> */}
        </div>
    );
}
export default Edit;
