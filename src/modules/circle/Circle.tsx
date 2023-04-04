import { responseToTeamDropdownProps } from './TeamDataMapper';
import React, { useEffect, useState } from 'react';
import { Header } from 'src/components/header/Header';
import { Loading, NavBar, SearchBar, TeamDropdown } from 'lib-productivio';
import './circle.scss';
import { useDispatch, useSelector } from 'react-redux';
import { circleFetch, CircleFetchGetProps } from './actions';

export const Circle = () => {
  const dispatch = useDispatch();

  const BG_COLOURS = [
    '#ffb6c1', // Lighter pink
    '#ffdab9', // Lighter orange
    '#d3a5e0', // Lighter purple
    '#a5d5d7', // Lighter teal
    '#f2b5b5', // Lighter red
    '#aee6b4', // Lighter green
    '#ffe6b3', // Lighter peach
    '#add8e6', // Lighter blue
    '#e0ffff', // Lighter turquoise
  ];

  const { teamsData, loading } = useSelector((state: any) => state.circleFetch);
  const [filteredTeamsData, setFilteredTeamsData] = useState([]);

  const DEFAULT_PROPS: CircleFetchGetProps = {
    userId: 1,
  };

  useEffect(() => {
    dispatch(circleFetch(DEFAULT_PROPS));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSearch = (searchTerm: string) => {
    if (teamsData) {
      setFilteredTeamsData(
        teamsData.filter((team: any) => {
          return (
            team.workers.filter((worker: any) => {
              return worker.name
                .toUpperCase()
                .includes(searchTerm.toUpperCase());
            }).length > 0
          );
        })
      );
    }
  };

  useEffect(() => {
    if (teamsData != null) {
      setFilteredTeamsData(teamsData);
    }
  }, [teamsData]);

  return (
    <div className="circle-page" style={{ width: '100vw' }}>
      <Header />
      <SearchBar onSearch={onSearch} />
      {loading && (
        <>
          <Loading />
        </>
      )}
      {!loading &&
        filteredTeamsData.length > 0 &&
        filteredTeamsData.map((team: any, i: number) => {
          return (
            <TeamDropdown
             key={`team_${i}`}
              {...responseToTeamDropdownProps(
                team,
                BG_COLOURS[i % BG_COLOURS.length]
              )}            />
          );
        })}
      <NavBar />
    </div>
  );
};
