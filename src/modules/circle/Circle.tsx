import { test } from './TeamDataExample';
import React, { useEffect, useState } from 'react';
import { Header } from 'src/components/header/Header';
import { NavBar, SearchBar, TeamDropdown } from 'lib-productivio';
import './circle.scss';
import { TeamDropdownProps } from 'src/components/teamDropdown/TeamDropdown';
import { useDispatch } from 'react-redux';
import { circleFetch, CircleFetchProps } from './actions';
import { useSelector } from 'react-redux';

//TODO: add search functionality

export const Circle = () => {
  const dispatch = useDispatch();
  const [data, loading] = useSelector((state:any) => state.circleFetch);
  const [userId, setUserId] = useState<CircleFetchProps>({
    userId = 0,
  });
  useEffect(() => {
    dispatch(circleFetch(userId));

  });
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
