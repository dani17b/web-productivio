import './tab.scss';

interface TabProps {
  /**
   * Tab's id (auto-generated)
   */
  tabId: number;
  /**
   * Tab's name. Initially the component's name
   */
  tabLabel: string;
  /**
   * Component placed inside that particular tab
   */
  tabContent: React.ReactNode;
}

// TODO autogenerate tab ID

// TODO function that dinamically creates tabs as they're dragged to the middle section

export const Tab = (props: TabProps) => {
  const { tabId, tabLabel, tabContent } = props;

  return (
    <div className="tab-container">
      <div className="tab-container__label"></div>
      <div className="tab-container__content"></div>
    </div>
  );
};
