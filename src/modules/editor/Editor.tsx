// @ts-nocheck
import './editor.scss';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { parse, buildJsx } from '../../lib/tsx-builder';
import { InfoPanel } from './components/infoPanel/InfoPanel';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getCode, getFiles } from './actions';
import { useSelector } from 'react-redux';

const Column = ({ children, className, title }) => {
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: 'TYPE',
    drop: () => ({ name: 'Some name' }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  console.log('options', { canDrop, isOver });

  return (
    <div ref={drop} className={className}>
      {title}
      {children}
    </div>
  );
};

const MovableItem = () => {
  const [{ isDragging }, drag] = useDrag({
    item: { name: 'Any custom name' },
    type: 'TYPE',
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0.4 : 1;

  return (
    <div ref={drag} className="movable-item" style={{ opacity }}>
      We will move this item
    </div>
  );
};

export const Editor = () => {
  const [selectedElement, setSelectedElement] = useState(null);

  const dispatch = useDispatch();

  const { files } = useSelector((state) => state.editor);
  const { code } = useSelector((state) => state.code);

  console.log('code', code);

  useEffect(() => {
    dispatch(
      getFiles()
      // 'C:\\Users\\paula.alba\\Desktop\\workspace\\dev\\web-productivio'
    );
  }, []);

  useEffect(() => {
    if (files.length > 0) {
      dispatch(getCode('components', 'input', 'Input.tsx'));
    }
  }, [files]);

  const componentDef = parse(`export const ScreenSample = () => {
        return (
            <div>Hola mundo</div>
        );
    }`);

  //const componentStr = build(componentDef);

  console.log(componentDef);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="editor">
        <div className="editor__components">
          Selector de elementos
          <Column>
            <MovableItem />
          </Column>
        </div>
        <Column className="editor__canvas">
          {code}
          {buildJsx(componentDef.components[0].dom, {
            selectElement: (element) => {
              console.log('edit element', element);
              setSelectedElement(element);
            },
            removeElement: (element) => {
              console.log('remove element', element);
              setSelectedElement(element);
            },
          })}
          {/* <pre>{fileContent}</pre> */}
        </Column>
        <div
          className="editor__element"
          style={{
            marginRight: selectedElement == null ? -250 : 0,
          }}
        >
          <InfoPanel
            element={selectedElement}
            onClose={() => setSelectedElement(null)}
          />
        </div>
      </div>
    </DndProvider>
  );
};
