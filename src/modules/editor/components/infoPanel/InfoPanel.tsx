// @ts-nocheck
import './infoPanel.scss';
import { IoCloseOutline } from 'react-icons/io5';

export const InfoPanel = ({ element, onClose }) => {
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
      <div className='info-panel__section'>
        <div className="info-panel__section-title">Propiedades</div>
        <div className="info-panel__section-content">Formulario con las posibles propiedades a cambiar</div>
      </div>
      <div className='info-panel__section'>
        <div className="info-panel__section-title">Estilos</div>
        <div className="info-panel__section-content">Formulario con las posibles estilos a cambiar</div>
      </div>
      Info panel, nombre del componente, descricion, propiedades, estilo, enlace
      a documentacion
      {JSON.stringify(element, null, 2)}
    </div>
  );
};
