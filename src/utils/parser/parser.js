export const reactToJson = (input) => {
  // extract component name from the 'export default' statement
  const componentName = input.match(/export const (\w+)/)[1];

  // extract JSX element type and text content from 'return' statement
  const [, elementType, content] = input.match(/<(\w+)>(.+)<\/\w+>/);

  // construct final output object
  const output = {
    component: {
      name: componentName,
      type: elementType,
      children: [
        {
          type: 'textNode',
          content: content.trim(),
        },
      ],
    },
  };

  return output;
};

export function parseCode(code) {
  const componentName = code.match(/export const (\w+)/)[1];

  const [, jsxContents] = code.match(/return\s+\((.+)\)/s);
  const jsxTree = parseJSXTree(jsxContents.trim());

  const component = {
    name: componentName,
    type: jsxTree.type,
    children: jsxTree.children,
  };

  return { component };
}

function parseJSXTree(jsxString) {
  const [openingTag, ...childStrings] = jsxString.split(/>(.*)</s);

  const tagNameMatches = openingTag.match(/<(\w+)/);
  const type = tagNameMatches[1];

  const children = childStrings.map((child) => {
    if (child.startsWith('<')) {
      return parseJSXTree(child);
    } else {
      return {
        type: 'textNode',
        content: child.trim(),
      };
    }
  });

  return {
    type,
    children,
  };
}

export function parseJsonToTsx(json) {
  let result = '';
  const components = json.json.components;
  components.map((component) => {
    result += createTsxDom(component.dom);
  });

  return result;
}

export const createFunctionsFromJson = (functions) => {
  let result = '';
  //TODO controlear indentaciones¿?
  functions.map((child) => {
    let childResult = 'export const ';
    childResult += `${child.name} = (${child.args.map((arguito) => {
      return `${arguito.name} : ${arguito.type}`;
    })}) => {`;
    childResult += `${child.content} 
  }`;
    result += childResult;
  });
  return result;
};

//Return parser
function createTsxDom(domJson) {
  const { type, children, attributes } = domJson;
  let result = `<${type}`;
  attributes.map((attribute) => {
    result += ` ${attribute.key} = ${attribute.value}`;
  });

  result += '>';

  children.map((child) => {
    if (child.dom != null) {
      result += createTsxDom(child.dom);
    } else if (child.text) {
      result += child.text;
    }
  });

  result += `</${type}>`;

  return result;
}

// import React from 'react';

// const Div = ({ children, className }) => {
//   return <div className={className}>{children}</div>;
// };

// const H1 = ({ children }) => {
//   return <h1>{children}</h1>;
// };

// const P = ({ children }) => {
//   return <p>{children}</p>;
// };
// const json = {...} // el JSON de ejemplo

const createReactElement = (element) => {
  const { tag, attributes, children, text } = element;

  if (text) {
    return text;
  }

  const Component = COMPONENT_MAP[tag];

  if (Component) {
    return (
      <Component {...attributes}>
        {children && children.map(createReactElement)}
      </Component>
    );
  }

  return null;
};

// const COMPONENT_MAP = {
//   div: Div,
//   h1: H1,
//   p: P,
// };

// const App = () => {
//   const reactElements = json.children.map(createReactElement);
//   return <>{reactElements}</>;
// };
// {
//   "tag": "div",
//   "attributes": {
//     "class": "container"
//   },
//   "children": [
//     {
//       "tag": "h1",
//       "text": "Hola mundo"
//     },
//     {
//       "tag": "p",
//       "text": "Este es un ejemplo de cómo convertir un JSON de elementos HTML a componentes de React"
//     }
//   ]
// }
