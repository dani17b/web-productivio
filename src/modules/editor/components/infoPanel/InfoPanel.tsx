import { StyleEditor } from 'src/components/propsEditor/StyleEditor';
import './infoPanel.scss';
import { IoCloseOutline } from 'react-icons/io5';
import { PropsEditor } from 'src/components/propsEditor/PropsEditor';

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
          <PropsEditor
            initialText={Object.assign({}, ...text)}
            onTextChange={setText}
          />{' '}
        </div>
      </div>
      <div className="info-panel__section">
        <div className="info-panel__section-title">Estilos</div>
        <div className="info-panel__section-content">
          <StyleEditor
            initialStyles={Object.assign({}, ...styles)}
            onStylesChange={setStyles}
          />
        </div>
      </div>
      Info panel, nombre del componente, descricion, propiedades, estilo, enlace
      a documentacion
      {JSON.stringify(element, null, 2)}
    </div>
  );
};
