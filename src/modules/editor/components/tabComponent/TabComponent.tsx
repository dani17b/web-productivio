import './tabComponent.scss';
import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import { Tabs, Tab } from '@mui/material';
import { TabContext, TabPanel } from '@mui/lab';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { parseTsxToJson } from 'src/utils/parser/TsxToJson';
import { getCode } from '../../actions';

export interface TabProps {
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
  const [tabs, setTabs] = useState<TabProps[]>([props]);
  const [tabIndex, setTabIndex] = useState(0);

  /**
   * Gets code from back
   */
  const dispatch = useDispatch();
  const { code } = useSelector((state: any) => state.code);
  const [addPageClick, setAddPageClick] = useState(false);

  useEffect(() => {
    if (addPageClick) {
      dispatch(getCode('modules/notFound', 'NotFound.tsx'));
    }
  }, [addPageClick]);

  /**
   * Adds tab for existing component
   */
  const addPage = () => {
    setAddPageClick(true);
    if (code != undefined && code != '') {
      console.log('code', code);
      console.log(parseTsxToJson(code));
    }

    const newTabs = [
      ...tabs,
      {
        tabLabel: parseTsxToJson(code).component.name,
        tabContent: 'Not found ',
      },
    ];

    setTabs(newTabs);
    setTabIndex(newTabs.length - 1);
  };

  /**
   * Adds tab for new component
   */
  const addNewPage: React.MouseEventHandler<HTMLButtonElement> = async () => {
    try {
      const code = await dispatch(
        getCode('modules/blankModule', 'BlankModule.tsx')
      );
      const newTabs = [
        ...tabs,
        {
          tabLabel: 'Pruebita',
          tabContent: code,
        },
      ];

      setTabs(newTabs);
      setTabIndex(newTabs.length - 1);
    } catch (error) {
      console.log('Error fetching code', error);
    }
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
      <div className="tab-container__trial-button-container">
        <button className="tab-container__trial-button" onClick={addPage}>
          Add Page
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
