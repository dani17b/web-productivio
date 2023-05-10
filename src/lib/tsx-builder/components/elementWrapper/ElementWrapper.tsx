import './elementWrapper.scss';
import { AiTwotoneEdit } from 'react-icons/ai';

export const ElementWrapper = ({
  children,
  selectElement,
  removeElement,
}: any) => {
  return (
    <div className="element-wrapper">
      Wrapper
      {children}
      <div className="element-wrapper__buttons">
        <AiTwotoneEdit
          className="element-wrapper__buttons-item"
          onClick={selectElement}
        >
          Editar
        </AiTwotoneEdit>
        <div className="element-wrapper__buttons-item" onClick={removeElement}>
          Borrar
        </div>
      </div>
    </div>
  );
};
