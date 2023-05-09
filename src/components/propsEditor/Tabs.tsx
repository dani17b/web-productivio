//@ts-nockeck
import React, { useState } from 'react';
import PropsEditor from './EditorProps';
import { StyleEditor } from './StyleEditor';
import './tabs.scss';

interface TabProps {
  title: string;
  children: React.ReactNode;
}
const handleStylesChange = (styles: any) => {
  // Aquí puedes manejar los cambios en los estilos
  console.log(styles);
};

const Tab: React.FC<TabProps> = ({ title, children }) => (
  <>
    <h2>{title}</h2>
    {children}
  </>
);

export const Tabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      <button onClick={() => setActiveTab(0)}>PropsEditor</button>
      <button onClick={() => setActiveTab(1)}>StyleEditor</button>
      {activeTab === 0 ? (
        <Tab title="PropsEditor">
          <PropsEditor
            componentProps={{
              width: 0,
              height: 0,
              text: '',
              color: '',
              backgroundColor: '',
              fontSize: 0,
              textAlign: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              fontWeight: 'bold',
              style: {},
            }}
            onPropsChange={function (newProps: {
              width: number;
              height: number;
              text: string;
              color: string;
              backgroundColor: string;
              fontSize: number;
              textAlign: 'center' | 'left' | 'right';
              flexDirection:
                | 'row'
                | 'row-reverse'
                | 'column'
                | 'column-reverse';
              justifyContent:
                | 'center'
                | 'flex-start'
                | 'flex-end'
                | 'space-between'
                | 'space-around';
              alignItems:
                | 'center'
                | 'flex-start'
                | 'flex-end'
                | 'baseline'
                | 'stretch';
              fontWeight: 'bold' | 'normal';
              style?: React.CSSProperties | undefined;
            }): void {
              throw new Error('Function not implemented.');
            }}
          />{' '}
        </Tab>
      ) : (
        <Tab title="StyleEditor">
          <StyleEditor
            initialStyles={{ color: 'red' }}
            onStylesChange={handleStylesChange}
          />
        </Tab>
      )}
    </>
  );
};
