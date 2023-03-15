import React, { useState, useEffect } from 'react';
import './searchBar.scss';
import { GoSearch } from 'react-icons/go';
import { MdKeyboardVoice } from 'react-icons/md';

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

const DELAY_TIME = 500;

function SearchBar(props: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const { onSearch } = props;
  const timerRef = React.useRef<number>();

  const handleDelayedSearch = (newSearchTerm: string) => {
    clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      onSearch(newSearchTerm);
    }, DELAY_TIME);
  };

  useEffect(() => {
    return () => {
      clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <form>
      <div className="search-bar">
        <div className="search-bar__button-input">
          <button className="search-bar__button" type="submit">
            <GoSearch className="search-bar__icon" />
          </button>
          <input
            className="search-bar__input"
            type="text"
            value={searchTerm}
            onChange={(event) => {
              setSearchTerm(event.target.value);
            }}
            onBlur={() => handleDelayedSearch(searchTerm)}
            placeholder="Search"
          ></input>
        </div>
        <MdKeyboardVoice className="search-bar__icon-voice" />
      </div>
    </form>
  );
}

export default SearchBar;
