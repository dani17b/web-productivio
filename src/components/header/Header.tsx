import './header.scss';

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

export const Header = () => {
  return (
    <header className="header">
      <h1>Productivio</h1>
      <div className="notifications">
        <FontAwesomeIcon icon={faBell} />
        <span className="count">3</span>
      </div>
    </header>
  );
};
