/* eslint-disable max-len */
//@ts-nocheck
import './editor.scss';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { parse, buildJsx } from '../../lib/tsx-builder';
import { InfoPanel } from './components/infoPanel/InfoPanel';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getFiles } from './actions';
import { Likes, TaskProgressBar } from 'lib-productivio';
import { useSelector } from 'react-redux';
import { ComponentsList } from './components/componentList/ComponentList';
import { WidthProvider, Responsive } from 'react-grid-layout';
import uuid from 'react-uuid';
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

  interface Item {
    i: string;
    x: number;
    y: number;
    w: number;
    h: number;
  }

  const [layout, setLayout] = useState([
    { i: uuid(), x: 0, y: 0, w: 1.5, h: 1, static: false, maxH: 30, component: <Likes totalLikes={100} likedByMe={false} />},
    { i: uuid(), x: 0, y: 0, w: 3, h: 3, static: false, maxH: 30, component: <TaskProgressBar percentage={45} />},
  ]);

  const onLayoutChange = (newLayout: Item[]) => {
    setLayout(newLayout);
  };

  useEffect(() => {
    console.log(layout);
  }, [layout]);

  

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
          <div
            className="layout-grid"
            
          >
            <ResponsiveGridLayout
              className="layout"
              autoSize={false}
              layouts={{ lg: layout }}
              onLayoutChange={onLayoutChange}
              margin={[0, 0]}
              containerPadding={[0, 0]}
              isBounded={true}
              rowHeight={30}
              isResizable={true}
            >
              {layout.map((lay) => (
                <div
                  key={lay.i}
                  id={lay.i}
                  className="movable-item"
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    boxSizing: 'border-box',
                  }}
                >
                  <TaskProgressBar />

                </div>
              ))}
            </ResponsiveGridLayout>
          </div>
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
