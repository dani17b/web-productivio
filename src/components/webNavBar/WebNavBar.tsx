//import { NavBar } from 'lib-productivio';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export const WebNavBar = () => {
  const links = ['/', '/circle', '/form', '/ranking', '/login'];
  const navigate = useNavigate();

  const onClickFunctions = links.map((link) => {
    return () => {
      navigate(link);
      // console.log(link);
    };
  });

  return <div>Nav</div>;
};
