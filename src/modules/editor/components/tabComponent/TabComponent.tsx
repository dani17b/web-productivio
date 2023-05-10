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
  /**
   * Determines whether or not a tab is selected & focused on
   */
  selectedTab: boolean;
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
      selectedTab: true,
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
          selectedTab: true,
        };
        dispatch(setActiveTabId(newTab.tabId));

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
    const updatedTabs = tabs.map((tab, index) => ({
      ...tab,
      selectedTab: index === newValue,
    }));

    const selectedTab = tabs[newValue];
    console.log('Pestaña seleccionada:', selectedTab);

    setTabIndex(newValue);
    setTabs(updatedTabs);
  };

  const tabRefs = useRef<Array<HTMLDivElement | null>>([]);

  const handleTabRef = (index: number) => (element: HTMLDivElement | null) => {
    tabRefs.current[index] = element;
  };

  /**
   * Sets the focus on the previous tab's content & deletes the closed module from the Json array
   */
  const closeTab = (e: React.SyntheticEvent, index: number) => {
    e.stopPropagation();
    const tabToClose = tabs[index];
    const newTabs = [...tabs];
    newTabs.splice(index, 1);

    let newTabIndex = tabIndex;
    if (index <= tabIndex) {
      newTabIndex = Math.max(0, tabIndex - 1);
    }

    const updatedTabs = newTabs.map((tab, newIndex) => ({
      ...tab,
      selected: newIndex === newTabIndex,
    }));

    setTabIndex(newTabIndex);
    setTabs(updatedTabs);

    const focusedElement = tabRefs.current[newTabIndex];
    if (focusedElement) {
      focusedElement.focus();

      console.log('Foco establecido en la pestaña anterior');
      console.log('Pestaña anterior:', newTabs[newTabIndex]);
    }

    // const previousTabIndex = Math.max(0, newTabIndex - 1);

    // if (previousTabIndex >= 0 && tabRefs.current[previousTabIndex]) {
    //   const previousTab = tabRefs.current[previousTabIndex];
    //   previousTab?.focus();

    //   console.log('Enfoque establecido en el tab anterior:', previousTab);
    //   console.log('ID del tab anterior:', newTabs[previousTabIndex].tabId);
    // } else if (newTabs.length > 0 && tabRefs.current[newTabIndex]) {
    //   const nextTab = tabRefs.current[newTabIndex];
    //   nextTab?.focus();

    //   console.log('Enfoque establecido en el siguiente tab:', nextTab);
    //   console.log('ID del siguiente tab:', newTabs[newTabIndex].tabId);
    // }

    const moduleToClose = modules.find(
      (module: { id: string }) => module.id === tabToClose.tabId
    );
    if (moduleToClose) {
      dispatch(deleteJsonFromArray(moduleToClose));
      console.log('Tab cerrada: ', moduleToClose);
      dispatch(setActiveTabId(newTabs[newTabIndex].tabId));
    }
  };

  /**
   * Updates active tab id
   **/
  const handleSelected = (tabId: string) => {
    console.log('click');
    dispatch(setActiveTabId(tabId));
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
        const defaultModuleCode = response.data;
        const defaultTabId = uuidv4();
        const defaultTab = parseTsxToJson(defaultModuleCode, defaultTabId);
        dispatch(setJsonArray([...modules, defaultTab]));
        dispatch(setActiveTabId(defaultTabId));

        const newDefaultTab = {
          tabId: defaultTabId,
          tabLabel: 'Default',
          tabContent: '',
          selectedTab: true,
        };

        const newTabs = [newDefaultTab];
        setTabs(newTabs);
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
          {tabs.map((tab, index) => (
            <Tab
              key={tab.tabId}
              label={tab.tabLabel}
              value={index.toString()}
              onClick={() => {
                handleSelected(tab.tabId);
              }}
              icon={
                <IoIosClose
                  className="tab-container__tab-row__close"
                  onClick={(e) => closeTab(e, index)}
                />
              }
              ref={handleTabRef(index)}
            />
          ))}
        </Tabs>
        {/* In case it's needed, the TabPanel, which contains the content. Goes here. */}
      </TabContext>
    </div>
  );
};
