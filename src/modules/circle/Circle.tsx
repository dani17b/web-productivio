import React from 'react';
import { Header } from 'src/components/header/Header';
import { NavBar, SearchBar, TeamDropdown } from 'lib-productivio';
import './circle.scss';

//TODO: add search functionality
const onSearch = (searchTerm: string) => {};

export const Circle = () => {
  return (
    <>
      <Header></Header>
      <SearchBar onSearch={onSearch}></SearchBar>
      <TeamDropdown
        title="EQUIPO A"
        data={[
          {
            user: {
              username: 'JohnDoe',
              description: 'Software Engineer',
              score: 4.5,
              profileColor: '#FF5733',
              img: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8bWFsZSUyMHByb2ZpbGV8ZW58MHx8MHx8&w=1000&q=80',
            },
          },
          {
            user: {
              username: 'JaneSmith',
              description: 'Graphic Designer',
              score: 3.8,
              profileColor: '#F5B041',
              img: 'https://newprofilepic2.photo-cdn.net//assets/images/article/profile.jpg',
            },
          },
          {
            user: {
              username: 'BobJohnson',
              description: 'Product Manager',
              score: 4.2,
              profileColor: '#48C9B0',
              img: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
            },
          },
        ]}
        bgColor="#86C4D1"
      ></TeamDropdown>
      <TeamDropdown
        title="EQUIPO A"
        data={[
          {
            user: {
              username: 'JohnDoe',
              description: 'Software Engineer',
              score: 4.5,
              profileColor: '#FF5733',
              img: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8bWFsZSUyMHByb2ZpbGV8ZW58MHx8MHx8&w=1000&q=80',
            },
          },
          {
            user: {
              username: 'JaneSmith',
              description: 'Graphic Designer',
              score: 3.8,
              profileColor: '#F5B041',
              img: 'https://newprofilepic2.photo-cdn.net//assets/images/article/profile.jpg',
            },
          },
          {
            user: {
              username: 'BobJohnson',
              description: 'Product Manager',
              score: 4.2,
              profileColor: '#48C9B0',
              img: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
            },
          },
        ]}
        bgColor="#A786D1"
      ></TeamDropdown>
      <TeamDropdown
        title="EQUIPO A"
        data={[
          {
            user: {
              username: 'JohnDoe',
              description: 'Software Engineer',
              score: 4.5,
              profileColor: '#FF5733',
              img: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8bWFsZSUyMHByb2ZpbGV8ZW58MHx8MHx8&w=1000&q=80',
            },
          },
          {
            user: {
              username: 'JaneSmith',
              description: 'Graphic Designer',
              score: 3.8,
              profileColor: '#F5B041',
              img: 'https://newprofilepic2.photo-cdn.net//assets/images/article/profile.jpg',
            },
          },
          {
            user: {
              username: 'BobJohnson',
              description: 'Product Manager',
              score: 4.2,
              profileColor: '#48C9B0',
              img: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
            },
          },
        ]}
        bgColor="#86D18E"
      ></TeamDropdown>
      <NavBar></NavBar>
    </>
  );
};
