/* eslint-disable no-unused-vars */
import { test, responseToTeamDropdownProps } from './TeamDataExample';
import React, { useEffect, useState } from 'react';
import { Header } from 'src/components/header/Header';
import { NavBar, SearchBar, TeamDropdown } from 'lib-productivio';
import './circle.scss';
import { useDispatch } from 'react-redux';
import { circleFetchAndPost, CircleFetchGetProps } from './actions';
import { useSelector } from 'react-redux';

//TODO: add search functionality

export const Circle = () => {
  const dispatch = useDispatch();
  const { teamsData, loading } = useSelector((state: any) => state.circleFetch);
  const [userId, setUserId] = useState<CircleFetchGetProps>({
    userId: 1,
  });
  useEffect(() => {
    dispatch(circleFetchAndPost(userId));
  }, []);
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
    <div style={{ width: '100vw' }}>
      <Header />
      <SearchBar onSearch={onSearch} />
      {loading && (
        <>
          <p style={{ textAlign: 'center' }}>Loading...</p>
        </>
      )}
      {!loading &&
        teamsData &&
        teamsData.map((team: any) => {
          return <TeamDropdown {...responseToTeamDropdownProps(team)} />;
        })}
      <NavBar />
    </div>
  );
};
