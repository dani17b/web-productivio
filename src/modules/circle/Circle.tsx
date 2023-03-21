import React from 'react';
import { Header } from 'src/components/header/Header';
import { TeamDropdown } from 'src/components/teamDropdown/TeamDropdown';

export const Circle = () => {
  return (
    <>
      <Header></Header>
      <TeamDropdown
        title="Equipo A"
        data={[
          { id: 1, name: 'John' },
          { id: 2, name: 'Jane' },
          { id: 3, name: 'Bob' },
        ]}
      ></TeamDropdown>
    </>
  );
};
