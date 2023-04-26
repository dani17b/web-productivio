//@ts-nocheck
import './editor.scss';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { parse, buildJsx } from '../../lib/tsx-builder';
import { InfoPanel } from './components/infoPanel/InfoPanel';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getCode, getFiles } from './actions';
import { useSelector } from 'react-redux';
import { ComponentsList } from './components/componentList/ComponentList';
import {
  TestComponent,
  TestComponentProps,
} from 'src/components/propsEditor/TestComponent';
import { TabComponent } from './components/tabComponent/TabComponent';
import { parseTsxToJson } from './../../utils/parser/TsxToJson';

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
  const { code } = useSelector((state) => state.code);

  if (code != [] && code != undefined && code != '') {
    console.log('code', code);
    console.log(parseTsxToJson(code));
  }

  useEffect(() => {
    dispatch(
      getFiles(
        'C:\\Users\\paula.alba\\Desktop\\workspace\\dev\\web-productivio'
      )
      // 'C:\\Users\\paula.alba\\Desktop\\workspace\\dev\\web-productivio'
      // 'C:\\Users\\enrique.jimenez\\Documents\\formaciónDani\\productivio\\web-productivio'
    );
  }, []);

  useEffect(() => {
    if (files.length > 0) {
      // let path = files.map((file) => file.path);
      // let name = files.map((file) => file.name);
      dispatch(getCode('modules/notFound', 'NotFound.tsx'));
    }
  }, [files]);

  const componentDef = parse(`export const ScreenSample = () => {
        return (
            <div>Hola mundo</div>
        );
    }`);

  // const file = {
  //   filename: 'Test.js',
  //   content:
  //     "console.log('Este es un archivo de ejemplo.');",
  // };

  //dispatch(postFile(file));
  // dispatch(updateFile(file));

  //const componentStr = build(componentDef);

  console.log(componentDef);
  const [styles, setStyles] = useState<TestComponentProps['style']>([
    {
      color: '#1b1918',
      backgroundColor: '#C70039',
      margin: '10px',
      textAlign: 'center',
    },
  ]);
  const [text, setText] = useState<TestComponentProps['text']>('Hello World!');
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="editor">
        <div className="editor__components">
          <Column>
            <ComponentsList />
          </Column>
        </div>
        <Column className="editor__canvas">
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
          <TestComponent text={text} style={styles} />
          <TabComponent
            tabLabel="Hello World"
            tabContent={
              <div className="editor__canvas__wrapper">
                {buildJsx(componentDef.components[0].dom, {
                  selectElement: (element) => {
                    console.log('edit element', element);
                    setSelectedElement(element);
                  },
                  removeElement: (element) => {
                    console.log('remove element', element);
                    setSelectedElement(element);
                  },
                })}{' '}
              </div>
            }
          />
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
            text={text}
            setText={setText}
          />
        </div>
      </div>
    </DndProvider>
  );
};
