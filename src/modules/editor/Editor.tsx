/* eslint-disable @typescript-eslint/no-unused-vars */
//@ts-nocheck
import './editor.scss';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { parse, buildJsx } from '../../lib/tsx-builder';
import { InfoPanel } from './components/infoPanel/InfoPanel';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getFiles } from './actions';
import { Likes } from 'lib-productivio';
import { useSelector } from 'react-redux';
import { ComponentsList } from './components/componentList/ComponentList';
import { WidthProvider, Responsive } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const ResponsiveGridLayout = WidthProvider(Responsive);

export const Column = ({ children, className, title }) => {
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

export const MovableItem = ({ children }) => {
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
      {children}
    </div>
  );
};

export const Editor = () => {
  const [selectedElement, setSelectedElement] = useState(null);

  const dispatch = useDispatch();

  const { files } = useSelector((state) => state.editor);

  useEffect(() => {
    dispatch(getFiles('C:\\workspace\\dev\\web-productivio'));
  }, [dispatch]);

  useEffect(() => {
    if (files.length > 0) {
      // TODO cargar el componente en si, que sera el que se muestre en el editor abierto
      //debugger;
    }
  }, [files]);

  const componentDef = parse(`export const ScreenSample = () => {
        return (
            <div>Hola mundo</div>
        );
    }`);

  //const componentStr = build(componentDef);

  console.log(componentDef);

  const layout = [
    { i: 'a', x: 0, y: 0, w: 5, h: 5, static: false },
    { i: 'b', x: 6, y: 0, w: 2, h: 2, static: false },
  ];

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="editor">
        <div className="editor__components">
          <Column children={undefined} className={undefined} title={undefined}>
            <ComponentsList />
          </Column>
        </div>
        <Column
          className="editor__canvas"
          children={undefined}
          title={undefined}
        >
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
          <ResponsiveGridLayout
            className="layout"
            layouts={{ lg: layout }}
            rowHeight={30}
            isResizable={true}
          >
            {layout.map((lay) => (
              <div
                key={lay.i}
                className="movable-item"
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  border: '1px solid black',
                }}
              >
                <Likes />
              </div>
            ))}
          </ResponsiveGridLayout>
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
