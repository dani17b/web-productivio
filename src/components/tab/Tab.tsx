import uuid from 'react-uuid';
import './tab.scss';

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

export const Tab = (props: TabProps) => {
  const { tabLabel, tabContent } = props;

  const getUniqueId = () => {
    if (tabLabel) {
      return uuid();
    }
  };

  const getTabLabel = () => {
    if (tabLabel && tabContent) {
      return (
        <div className="tab-container__label" id={getUniqueId()}>
          {tabLabel}
          <div className="tab-container__label__x" /*onClick={}*/>x</div>
        </div>
      );
    }
  };

  // TODO function that dinamically creates tabs as they're dragged to the middle section

  return (
    <div className="tab-container">
      {getTabLabel()}
      <div className="tab-container__content">Hola soy el contenido</div>
    </div>
  );
};
