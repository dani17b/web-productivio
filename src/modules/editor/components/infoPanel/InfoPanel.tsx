import './infoPanel.scss';
import { IoCloseOutline } from 'react-icons/io5';
import React from 'react';
import PropsEditor from '../../../../components/propsEditor/EditorProps';
import { StyleEditor } from '../../../../components/propsEditor/StyleEditor';
import { Tabs } from 'src/components/propsEditor/Tabs';

interface InfoPanelProps {
  element: any;
  onClose: any;
  styles: any;
  setStyles: any;
  text: any;
  setText: any;
}

export const InfoPanel = (props: InfoPanelProps) => {
  const { element, onClose, styles, setStyles, text, setText } = props;

  if (element == null) {
    return () => {};
  }

  return (
    <div className="info-panel">
      <div className="info-panel__header">
        <div className="info-panel__header-title">{`<${element.type}>`}</div>
        <div className="info-panel__header-close" onClick={onClose}>
          <IoCloseOutline />
        </div>
      </div>
      <div className="info-panel__section">
        <div className="info-panel__section-title">Propiedades</div>
        <div className="info-panel__section-content">
          <Tabs />
        </div>
      </div>
      <div className="info-panel__section">
        <div className="info-panel__section-title"></div>
        <div className="info-panel__section-content"></div>
      </div>
    </div>
  );
};
