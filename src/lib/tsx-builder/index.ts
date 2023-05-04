import React from 'react';
import { ElementWrapper } from './components/elementWrapper/ElementWrapper';

export const parse = (jsxFile: string) => {
  // Lee el fichero y devuelve lo que encuentre
  // console.log(jsxFile);
  return {
    imports: [],
    components: [
      {
        name: 'ScreenSample',
        dom: {
          type: 'div',
          content: 'Hola mundo',
        },
      },
    ],
  };
};

export const build = (jsxDefinition: any) => {
  let fileStr = '';

  for (let i = 0; i < jsxDefinition.components.length; i++) {
    const componentDefinition = jsxDefinition.components[i];
    let componentStr = '';
    componentStr += `export const ${componentDefinition.name} = () => {`;
    componentStr += buildComponent(componentDefinition);
    componentStr += '}';

    fileStr += `\n\n${componentStr}`;
  }

  return fileStr;
};

const buildComponent = (componentDefinition: any) => {
  let componentStr = '';

  componentStr += `\n\treturn (\n\t\t${buildDom(
    componentDefinition.dom
  )} \n\t);\n`;
  return componentStr;
};

export const buildDom = (dom: any) => {
  if (typeof dom.content === 'string') {
    return `<${dom.type}>${dom.content}</${dom.type}>`;
  }

  debugger;
  return '';
};

export const buildJsx = (dom: any, options: any) => {
  // TODO mapear las props
  const element = React.createElement(dom.type, { key: 1 }, dom.content);

  return React.createElement(
    ElementWrapper,
    {
      selectElement: () => options.selectElement(dom),
      removeElement: () => options.removeElement(dom),
    },
    element
  );
};
