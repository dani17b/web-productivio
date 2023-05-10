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

  const handleTabClick = (index: number) => {
    setSelectedTab(index);
  };

  return (
    <div>
      <div className="left-column-buttons">
        {tabNames.map((name, index) => (
          <button
            className="left-column-buttons__button"
            key={index}
            onClick={() => handleTabClick(index)}
          >
            {name}
          </button>
        ))}
      </div>
      <div>{children[selectedTab]}</div>
    </div>
  );
};
