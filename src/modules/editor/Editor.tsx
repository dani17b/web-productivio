//@ts-nocheck
import './editor.scss';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { parse, buildJsx } from '../../lib/tsx-builder';
import { InfoPanel } from './components/infoPanel/InfoPanel';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getFiles } from './actions';
import { useSelector } from 'react-redux';
import { ComponentsList } from './components/componentList/ComponentList';
import {
  MyComponent,
  MyComponentProps,
} from 'src/components/propsEditor/TestComponent';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { TaskProgressBar } from 'lib-productivio';

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
  const [styles, setStyles] = useState<MyComponentProps['style']>([]);

  const layouts = [
    { i: 'a', x: 0, y: 0, w: 1, h: 2, isResizable: true, static: true },
    { i: 'b', x: 1, y: 0, w: 3, h: 2, isResizable: true, minW: 2, maxW: 4 },
    { i: 'c', x: 4, y: 0, w: 1, h: 2, isResizable: true },
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
          <MyComponent text="Hello World!" style={styles} />
          <ResponsiveGridLayout
            className="layout"
            layouts={layouts}
            breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
            cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
          >
            {layouts.map((lay) => (
              <div
                key={lay.i}
                data-grid={{
                  x: lay.x,
                  y: lay.y,
                  w: lay.w,
                  h: lay.h,
                  static: lay.static,
                }}
                c
                lassName="layout-item"
              >
                <TaskProgressBar percentage={50} />
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
            styles={styles}
            setStyles={setStyles}
          />
        </div>
      </div>
    </DndProvider>
  );
};
