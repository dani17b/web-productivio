import React, { useState } from 'react';
import { Header } from 'src/components/header/Header';
import { WebNavBar } from 'src/components/webNavBar/WebNavBar';
import './notFound.scss';

export const NotFound = () => {

  return (
    <div className='notFound'>
      <Header></Header>
      <div>
        <h1>404 - Page Not Found</h1>
        <p>Sorry, the page does not exist (by the moment)</p>
      </div>
      <WebNavBar />
    </div>
  );
};
