import React from 'react';
import { Header } from 'src/components/header/Header';
import { NavBar, SearchBar, TeamDropdown } from 'lib-productivio';
import './circle.scss';
import { test } from './TeamDataExample';

//TODO: add search functionality
const onSearch = (searchTerm: string) => {};

export const Circle = () => {
  return (
    <>
      <Header></Header>
      <SearchBar onSearch={onSearch}></SearchBar>
      <TeamDropdown {...test}></TeamDropdown>
      <NavBar></NavBar>
    </>
  );
};
