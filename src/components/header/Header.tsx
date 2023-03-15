import './header.scss';

import React from 'react';
import { GrNotification } from 'react-icons/gr';

export const Header = () => {
  return (
    <header className="header">
      <h1>Productivio</h1>
      <div className="notifications">
        <GrNotification />
        <span className="count">3</span>
      </div>
    </header>
  );
};
