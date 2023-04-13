import './elementWrapper.scss';

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
        <div className="element-wrapper__buttons-item" onClick={selectElement}>
          Editar
        </div>
        <div className="element-wrapper__buttons-item" onClick={removeElement}>
          Borrar
        </div>
      </div>
    </div>
  );
};
