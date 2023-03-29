import React, { useState } from 'react';
import { Header } from 'src/components/header/Header';
import { NavBar, SearchBar, TeamDropdown } from 'lib-productivio';
import './circle.scss';
import { test } from './TeamDataExample';

//TODO: add search functionality

export const Circle = () => {
  const onSearch = (searchTerm: string) => {
    setData((prevData) => ({
      ...prevData,
      data: test.data.filter((item) =>
        item.username.toUpperCase().includes(searchTerm.toUpperCase())
      ),
    }));
  };

  const [data, setData] = useState(test);
  return (
    <>
      <Header></Header>
      <SearchBar onSearch={onSearch}></SearchBar>
      <TeamDropdown {...data}></TeamDropdown>
      <NavBar></NavBar>
    </>
  );
};
