import * as React from 'react';

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
      <div>
        {tabNames.map((name, index) => (
          <button key={index} onClick={() => handleTabClick(index)}>
            {name}
          </button>
        ))}
      </div>
      <div>{children[selectedTab]}</div>
    </div>
  );
};
