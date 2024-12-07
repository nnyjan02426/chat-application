import './searchBar.css';
import { useState } from 'react';
import clear from './clear.svg';
import search from './search.svg';
import addRoom from './add-user.svg';

const SearchBar = ({ onJoinRoom, onCreateRoom }) => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
    if (searchText.trim() === '') {
      alert('Please enter a room ID to search for a existing room');
      return;
    }
    onJoinRoom(searchText.trim());
    setSearchText('');
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') { handleSearch(); }
  }
  const handleCreateRoom = () => {
    if (searchText.trim() !== '') {
      alert('Clear the search bar and click add to create new room');
      return;
    }
    onCreateRoom();
  }

  return (
    <div id='searchBar'>
      <div className='searchInput'>
        <img
          src={search}
          alt='search room'
          title='search room'
          id='search'
          className='icon button'
          onClick={handleSearch}
        />
        <input
          type="text"
          placeholder='search'
          onKeyDown={handleKeyPress}
        />
        <img
          src={clear}
          alt='x'
          id='clear'
          className='button icon'
          onClick={() => setSearchText('')}
        />
      </div>
      <img
        src={addRoom}
        title='add chatroom'
        alt='+'
        id='addUser'
        className='button icon '
        onClick={handleCreateRoom}
      />
    </div>
  );
}

export default SearchBar;

