//@ts-nocheck
import './editor.scss';
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
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const ResponsiveGridLayout = WidthProvider(Responsive);

export const Column = ({ children, className, title }) => {
  return (
    <div className={className}>
      {title}
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

  console.log(componentDef);
  const [styles, setStyles] = useState<MyComponentProps['style']>([]);
  const [layout, setLayout] = useState([]);

  const handleComponentSelect = (component, index) => {
    setLayout((prevLayout) => [
      ...prevLayout,
      {
        i: `${component.name}-${index}`,
        x: 0,
        y: Infinity,
        w: 2,
        h: 2,
        component: (
          <div className="movable-item">
            {component.icon}
          </div>
        ),
      },
    ]);
  };

  return (
    <div className="editor">
      <div className="editor__components">
        <Column>
          <ComponentsList onComponentSelect={handleComponentSelect} />
        </Column>
      </div>
      <div className="editor__canvas">
        <ResponsiveGridLayout
          className="layout"
          rowHeight={30}
          cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        >
          {layout.map((item) => (
            <div key={item.i} data-grid={item}>
              {item.component}
            </div>
          ))}
        </ResponsiveGridLayout>
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
      </div>
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
  );
};
