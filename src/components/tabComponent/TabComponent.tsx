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
  const { tabLabel, tabContent } = props;
  const [tabIndex, setTabIndex] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  //TODO lógica para crear dinámicamente las pestañas una vez sepamos cómo nos van a pasar la info

  //TODO creación dinámica de tabIndexes linkeados al nuevo tab que se cree

  return (
    <div className="tab-container">
      <TabContext value={tabIndex.toString()}>
        <Tabs
          className="tab-container__tab-row"
          value={tabIndex}
          onChange={handleChange}
        >
          <Tab label={tabLabel} value="0" />
          <Tab label="Prueba 2" value="1" />
        </Tabs>
        <div className="tab-container__tab-content">
          <TabPanel value="0">{tabContent}</TabPanel>
          <TabPanel value="1">Contenido de prueba 2</TabPanel>
        </div>
      </TabContext>
    </div>
  );
};
