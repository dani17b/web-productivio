//@ts-nocheck
import './editor.scss';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { parse, buildJsx } from '../../lib/tsx-builder';
import { InfoPanel } from './components/infoPanel/InfoPanel';
import { useEffect, useState } from 'react';
import {
  getComponents,
  getFiles,
  getPath,
  postFile,
  updateFile,
} from './actions';
import { useDispatch, useSelector } from 'react-redux';
import { ComponentsList } from './components/componentList/ComponentList';
import {
  TestComponent,
  TestComponentProps,
} from 'src/components/propsEditor/TestComponent';
import { TabComponent } from './components/tabComponent/TabComponent';
import { parseJsonToTsx } from 'src/utils/parser/JsonToTsx';

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
  const dispatch = useDispatch();
  const [selectedElement, setSelectedElement] = useState(null);
  //const { code } = useSelector((state) => state.code);
  const [inputValue, setInputValue] = useState('');
  const {modules} = useSelector((state) => state.editor);
  const [ path, setPath ] = useState(null);


  


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getPath();
        setPath(response);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  

 
  const handleSave = () => {
      const buildTsxJsonToSave = {
       filename: inputValue + '.scss',
       content: parseJsonToTsx(modules[0])   
   }
   saveOrUpdate(buildTsxJsonToSave);
   console.log(buildTsxJsonToSave);

//   const buildScssJsonToSave = {
//     filename: {inputValue} + '.scss',
//     content: parseJsonToTsx(modules)   
// }  
  };

  const saveOrUpdate = (build) => {
    const {filename, content} = build;
    getFiles(path)
    .then((data: any) => {
      const fileExists = data.find((obj: any) => obj.name === filename);
      if (fileExists) {
        console.log('El archivo existe');
        dispatch(updateFile(build));
      } else {
        console.log('El archivo no existe');
        dispatch(postFile(build));
        return false;
      }
    })
    .catch((error: any) => {
      console.log(error);
    });
  }
  

  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const path = await getPath();
        const data = await getFiles(path);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const path = await getPath();
        const data = await getComponents(path);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const componentDef = parse(`export const ScreenSample = () => {
        return (
            <div>Hola mundo</div>
        );
    }`);

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
          {/* {buildJsx(componentDef.components[0].dom, {
            selectElement: (element) => {
              console.log('edit element', element);
              setSelectedElement(element);
            },
            removeElement: (element) => {
              console.log('remove element', element);
              setSelectedElement(element);
            }, */}
          {/* })} */}
          {/*  */}
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
                <TestComponent text={text} style={styles} />
              </div>
            }
          />
          <div className="editor-header">
            <input
              onChange={(e) => setInputValue(e.target.value)}
              value={inputValue}
            ></input>
            <button onClick={handleSave}>Guardar</button>
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
