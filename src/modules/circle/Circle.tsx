import { test, responseToTeamDropdownProps } from './TeamDataExample';
import React, { useEffect, useState } from 'react';
import { Header } from 'src/components/header/Header';
import { NavBar, SearchBar, TeamDropdown } from 'lib-productivio';
import './circle.scss';
import { useDispatch } from 'react-redux';
import { circleFetchAndPost, CircleFetchGetProps } from './actions';
import { useSelector } from 'react-redux';

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
    dispatch(circleFetchAndPost(DEFAULT_PROPS));
  }, []);

  // const onSearch2 = (searchTerm: string) => {
  //   setPropsData((prevData) => ({
  //     ...prevData,
  //     data: test.data.filter((item) =>
  //       item.username.toUpperCase().includes(searchTerm.toUpperCase())
  //     ),
  //   }));
  // };

  // const [propsData, setPropsData] = useState(test);

  const onSearch = (searchTerm: string) => {
    if (teamsData != null) {
      // console.log('teamsData', teamsData);
      // setFilteredTeamsData(() => ({
      //   ...teamsData,
      //   data: teamsData.workers.map((worker: any) =>
      //     worker.name.toUpperCase().includes(searchTerm.toUpperCase())
      //   ),
      // }));

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
    <div style={{ width: '100vw' }}>
      <Header />
      <SearchBar onSearch={onSearch} />
      {loading && (
        <>
          <p style={{ textAlign: 'center' }}>Loading...</p>
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
              )}
            />
          );
        })}
      <NavBar />
    </div>
  );
};
