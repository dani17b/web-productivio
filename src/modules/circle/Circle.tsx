import React from 'react';
import { Header } from 'src/components/header/Header';
import { TeamDropdown } from 'src/components/teamDropdown/TeamDropdown';

export const Circle = () => {
  return (
    <>
      <Header></Header>
      <TeamDropdown
        title="EQUIPO A"
        data={[
          { id: 1, name: 'John' },
          { id: 2, name: 'Jane' },
          { id: 3, name: 'Bob' },
        ]}
        bgColor="#86C4D1"
      ></TeamDropdown>
      <TeamDropdown
        title="FP DUAL"
        data={[
          { id: 1, name: 'John' },
          { id: 2, name: 'Jane' },
          { id: 3, name: 'Bob' },
        ]}
        bgColor="#A786D1"
      ></TeamDropdown>
      <TeamDropdown
        title="OTRO"
        data={[
          { id: 1, name: 'John' },
          { id: 2, name: 'Jane' },
          { id: 3, name: 'Bob' },
        ]}
        bgColor="#86D18E"
      ></TeamDropdown>
    </>
  );
};
