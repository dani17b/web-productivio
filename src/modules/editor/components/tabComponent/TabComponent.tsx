import './tabComponent.scss';
import React, { useRef } from 'react';
import { useState } from 'react';
import { Tabs, Tab } from '@mui/material';
import { TabContext, TabPanel } from '@mui/lab';
import CloseIcon from '@mui/icons-material/Close';

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
    // { tabLabel: 'Generada', tabContent: 'Contenido de la pestaña generada' },
    props,
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

  const contentRefs = useRef<Array<HTMLDivElement | null>>([]);

  const closeTab = (index: number) => {
    const newTabs = [...tabs];
    newTabs.splice(index, 1);

    let newTabIndex = tabIndex;
    if (index <= tabIndex) {
      newTabIndex = Math.max(0, tabIndex - 1);
    }

    setTabIndex(newTabIndex);
    setTabs(newTabs);

    const focusedElement = document.activeElement as HTMLElement;
    if (focusedElement && focusedElement !== document.body) {
      focusedElement.focus();
    }
  };

  const handleContentRef =
    (index: number) => (element: HTMLDivElement | null) => {
      contentRefs.current[index] = element;
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
            <Tab
              key={index}
              label={tab.tabLabel}
              value={index.toString()}
              icon={
                <CloseIcon
                  className="tab-container__tab-row__close"
                  onClick={() => closeTab(index)}
                />
              }
            />
          ))}
        </Tabs>
        <div className="tab-container__tab-content">
          {tabs.map((tab, index) => (
            <TabPanel key={index} value={index.toString()}>
              <div ref={handleContentRef(index)}>{tab.tabContent}</div>
            </TabPanel>
          ))}
        </div>
      </TabContext>
    </div>
  );
};
