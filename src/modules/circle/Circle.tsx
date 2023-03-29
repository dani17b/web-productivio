import { test } from './TeamDataExample';
import React, { useEffect, useState } from 'react';
import { Header } from 'src/components/header/Header';
import { NavBar, SearchBar, TeamDropdown } from 'lib-productivio';
import './circle.scss';
import { useDispatch } from 'react-redux';
import { circleFetch, CircleFetchProps } from './actions';
import { useSelector } from 'react-redux';

//TODO: add search functionality

export const Circle = () => {
  const dispatch = useDispatch();
  const { teamsData, loading } = useSelector((state: any) => state.circleFetch);
  const [userId, setUserId] = useState<CircleFetchProps>({
    userId: 1,
  });
  useEffect(() => {
    dispatch(circleFetch(userId));
  });
  const onSearch = (searchTerm: string) => {
    setPropsData((prevData) => ({
      ...prevData,
      data: test.data.filter((item) =>
        item.username.toUpperCase().includes(searchTerm.toUpperCase())
      ),
    }));
  };

  const [propsData, setPropsData] = useState(test);

  return (
    <>
      <Header></Header>
      <SearchBar onSearch={onSearch}></SearchBar>
      <TeamDropdown {...propsData}></TeamDropdown>
      <NavBar></NavBar>
    </>
  );
};
