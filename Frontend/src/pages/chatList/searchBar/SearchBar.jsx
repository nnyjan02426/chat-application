import './searchBar.css';
import clear from './clear.svg';
import search from './search.svg';
import addUser from './add-user.svg';

const SearchBar = () => {
  return (
    <div id='searchBar'>
      <div className='searchInput'>
        <img src={search} alt='' id='search' className='icon' />
        <input type="text" placeholder='search' />
        <img src={clear} alt='x' id='clear' className='button' />
      </div>
      <img src={addUser} alt='+' id='addUser' className='button' />
    </div>
  );
}

export default SearchBar;

