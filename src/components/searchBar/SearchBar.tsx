import React, { useState } from 'react';
import './searchBar.scss';
import { GoSearch } from 'react-icons/go';
import { MdKeyboardVoice } from 'react-icons/md';

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

function SearchBar(props: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="search-bar">
        <div className="search-bar__button-input">
          <button className="search-bar__button" type="submit">
            <GoSearch className="search-bar__icon" />
          </button>
          <input
            className="search-bar__input"
            type="text"
            value={searchTerm}
            onChange={handleChange}
            placeholder="Search"
          ></input>
        </div>
        <MdKeyboardVoice className="search-bar__icon-voice" />
      </div>
    </form>
  );
}

export default SearchBar;
