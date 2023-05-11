import * as React from 'react';
import './tabSelector.scss';

interface TabSelectorProps {
  tabNames: string[];
  children: React.ReactNode[];
}

export const TabSelector: React.FC<TabSelectorProps> = ({
  tabNames,
  children,
}) => {
  const [selectedTab, setSelectedTab] = React.useState(0);

  // const handleTabClick = (index: number) => {
  //   setSelectedTab(index);
  // };

  return (
    <div>
      <select
        className="left-column-dropdown"
        value={selectedTab}
        onChange={(event) => setSelectedTab(Number(event.target.value))}
      >
        {tabNames.map((name, index) => (
          <option
            key={index}
            value={index}
            className="left-column-dropdown__option"
          >
            {name}
          </option>
        ))}
      </select>

      <div>{children[selectedTab]}</div>
    </div>
  );
};
