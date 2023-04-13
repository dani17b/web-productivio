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
