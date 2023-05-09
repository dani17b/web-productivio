import './tabComponent.scss';
import { v4 as uuidv4 } from 'uuid';
import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import { Tabs, Tab } from '@mui/material';
import { TabContext } from '@mui/lab';
import { parseTsxToJson } from 'src/utils/parser/TsxToJson';
import { IoIosClose } from 'react-icons/io';
import axios from 'axios';
import { SERVER_BASE_URL } from 'src/config/Config';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteJsonFromArray,
  pushJsonToArray,
  setActiveTabId,
  setJsonArray,
} from '../../actions';

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
  tabContent: string;
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
        const newTabId = uuidv4();
        const jsonTab = parseTsxToJson(code, newTabId);
        dispatch(pushJsonToArray(jsonTab));
        const newTab = {
          tabId: newTabId,
          tabLabel: jsonTab.component.name,
          tabContent: 'Holis',
        };

        const newTabs = [...tabs, newTab];
        console.log('Tab abierta: ', newTab.tabId);

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
   * Obtains and returns the active tab id dynamically
   */
  const getSelectedTabId = (): string => {
    debugger;
    let activeTabId = tabs[tabIndex].tabId;
    console.log('Selected tabId: ', activeTabId);
    return activeTabId;
  };

  /**
   * Sets the focus on the previous tab's content & deletes the closed module from the Json array
   */
  const closeTab = (index: number) => {
    const tabToClose = tabs[index];
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

    const moduleToClose = modules.find(
      (module: { id: string }) => module.id === tabToClose.tabId
    );
    if (moduleToClose) {
      dispatch(deleteJsonFromArray(moduleToClose));
      console.log('Tab cerrada: ', moduleToClose);
      dispatch(setActiveTabId(newTabs[index].tabId));
    }
  };

  /**
   * Updates active tab id
   **/
  const handleSelected = () => {
    let selectedTabId = getSelectedTabId();
    dispatch(setActiveTabId(selectedTabId));
  };

  /**
   * Sets default tab
   */
  const DEFAULT_TAB_PATH = 'modules/blankModule/BlankModule.tsx';
  useEffect(() => {
    axios
      .request({
        url: `file/${DEFAULT_TAB_PATH}`,
        method: 'GET',
        baseURL: SERVER_BASE_URL,
      })
      .then((response) => {
        debugger;
        const defaultModuleCode = response.data;
        console.log(defaultModuleCode);
        const defaultTabId = uuidv4();
        const defaultTab = parseTsxToJson(defaultModuleCode, defaultTabId);
        dispatch(setJsonArray([...modules, defaultTab]));
        dispatch(setActiveTabId(defaultTabId));

        const newDefaultTab = {
          tabId: defaultTabId,
          tabLabel: defaultTab.component.name,
          tabContent: '',
        };

        const newTabs = [...tabs, newDefaultTab];
        setTabs(newTabs);
        console.log(newDefaultTab);
      });
  }, []);

  return (
    <div className="tab-container">
      <div className="tab-container__trial-button-container">
        <button className="tab-container__trial-button" onClick={addPage}>
          Open Page
        </button>
        <button className="tab-container__trial-button" onClick={addNewPage}>
          New Page
        </button>
      </div>
      <TabContext value={tabIndex.toString()}>
        <Tabs
          className="tab-container__tab-row"
          value={tabIndex}
          onChange={handleChange}
        >
          <Tab
            key={tabs[0].tabId}
            label={tabs[0].tabLabel}
            value={'0'}
            onClick={handleSelected}
            icon={
              <IoIosClose
                className="tab-container__tab-row__close"
                onClick={() => closeTab(0)}
              />
            }
          ></Tab>
          {tabs.map((tab, index) => (
            <Tab
              key={tab.tabId}
              label={tab.tabLabel}
              value={index.toString()}
              onClick={handleSelected}
              icon={
                <IoIosClose
                  className="tab-container__tab-row__close"
                  onClick={() => closeTab(index)}
                />
              }
            />
          ))}
        </Tabs>
        {/* <div className="tab-container__tab-content">
          {tabs.map((tab, index) => (
            <TabPanel key={tab.tabId} value={index.toString()}>
              <div ref={handleContentRef(index)}>{tab.tabContent}</div>
            </TabPanel>
          ))}
        </div> */}
      </TabContext>
    </div>
  );
};
