import './tabComponent.scss';
import { v4 as uuidv4 } from 'uuid';
import React, { useRef } from 'react';
import { useState } from 'react';
import { Tabs, Tab } from '@mui/material';
import { TabContext, TabPanel } from '@mui/lab';
import { parseTsxToJson } from 'src/utils/parser/TsxToJson';
import { IoIosClose } from 'react-icons/io';
import axios from 'axios';
import { SERVER_BASE_URL } from 'src/config/Config';
import { useDispatch, useSelector } from 'react-redux';
import { setJsonArray } from '../../actions';

export interface TabProps {
  /**
   * Unique tab ID
   */
  tabId: string;
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
  /**
   * Tab and tabIndex state
   */
  const [tabs, setTabs] = useState<TabProps[]>([
    {
      tabId: '',
      tabLabel: props.tabLabel,
      tabContent: props.tabContent,
    },
  ]);
  const [tabIndex, setTabIndex] = useState(0);

  const dispatch = useDispatch();

  const { modules } = useSelector((state: any) => state.editor);

  /**
   * Adds tab for existing component
   */
  const addPage = () => {
    getModule('modules/notFound/NotFound.tsx');
  };

  /**
   * Adds tab for new component
   */
  const addNewPage = () => {
    getModule('modules/blankModule/BlankModule.tsx');
  };

  const getModule = (path: string) => {
    axios
      .request({
        url: `file/${path}`,
        method: 'GET',
        baseURL: SERVER_BASE_URL,
      })
      .then((response) => {
        let code = response.data;
        dispatch(setJsonArray([...modules, parseTsxToJson(code)]));
        const newTabId = uuidv4();
        const newTab = {
          tabId: newTabId,
          tabLabel: parseTsxToJson(code).component.name,
          tabContent: 'Holis',
        };

        const newTabs = [...tabs, newTab];

        setTabs(newTabs);
        setTabIndex(newTabs.length - 1);
      });
  };

  /**
   * Sets a new tab index when the parent component changes a new tab is added
   */
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  const contentRefs = useRef<Array<HTMLDivElement | null>>([]);

  const handleContentRef =
    (index: number) => (element: HTMLDivElement | null) => {
      contentRefs.current[index] = element;
    };

  /**
   * Sets the focus on the previous tab's content
   */
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

  return (
    <div className="tab-container">
      <TabContext value={tabIndex.toString()}>
        <Tabs
          className="tab-container__tab-row"
          value={tabIndex}
          onChange={handleChange}
        >
          {tabs.map((tab, index) => (
            <Tab
              key={tab.tabId}
              label={tab.tabLabel}
              value={index.toString()}
              icon={
                <IoIosClose
                  className="tab-container__tab-row__close"
                  onClick={() => closeTab(index)}
                />
              }
            />
          ))}
        </Tabs>
        <div className="tab-container__tab-content">
          {tabs.map((tab, index) => (
            <TabPanel key={tab.tabId} value={index.toString()}>
              <div ref={handleContentRef(index)}>{tab.tabContent}</div>
            </TabPanel>
          ))}
        </div>
      </TabContext>
      <div className="tab-container__trial-button-container">
        <button className="tab-container__trial-button" onClick={addPage}>
          Open Page
        </button>
        <button className="tab-container__trial-button" onClick={addNewPage}>
          New Page
        </button>
      </div>
    </div>
  );
};
