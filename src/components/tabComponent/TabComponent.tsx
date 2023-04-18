import './tabComponent.scss';
import React from 'react';
import { useState } from 'react';
import { Tabs, Tab } from '@mui/material';
import { TabContext, TabPanel } from '@mui/lab';

interface TabProps {
  /**
   * Tab's name. Initially the module's name
   */
  tabLabel: string;
  /**
   * Module placed inside that particular tab
   */
  tabContent: string /*React.ReactNode*/;
}

export const TabComponent = (props: TabProps) => {
  const [tabs, setTabs] = useState<TabProps[]>([
    { tabLabel: 'Generada', tabContent: 'Contenido de la pestaña generada' },
  ]);
  const [tabIndex, setTabIndex] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  const addTab: React.MouseEventHandler<HTMLButtonElement> = () => {
    const newTabIndex = tabs.length.toString();
    const newTabs = [
      ...tabs,
      {
        tabLabel: `Tab ${newTabIndex}`,
        tabContent: `Contenido de la pestaña ${newTabIndex}`,
      },
    ];

    setTabs(newTabs);
    setTabIndex(newTabs.length - 1);
  };

  return (
    <div className="tab-container">
      <div className="tab-container__trial-button-container">
        <button className="tab-container__trial-button" onClick={addTab}>
          Add
        </button>
      </div>
      <TabContext value={tabIndex.toString()}>
        <Tabs
          className="tab-container__tab-row"
          value={tabIndex}
          onChange={handleChange}
        >
          {tabs.map((tab, index) => (
            <Tab key={index} label={tab.tabLabel} value={index.toString()} />
          ))}
        </Tabs>
        <div className="tab-container__tab-content">
          {tabs.map((tab, index) => (
            <TabPanel key={index} value={index.toString()}>
              {tab.tabContent}
            </TabPanel>
          ))}
        </div>
      </TabContext>
    </div>
  );
};
