export function parseJsonToTsx(json) {
  let result = '';
  result += createImportsFromJson(json.imports);
  result += `\n ${createComponentsFromJson([json.component])}`;

  return result;
}

const createImportsFromJson = (imports) => {
  let result = '';
  imports.map((imp) => {
    result += `${imp}; \n`;
  });

  return result;
};

const createComponentsFromJson = (functions) => {
  let result = '';
  //TODO controlear indentaciones¿?
  functions.map((child) => {
    let childResult = 'export const ';
    childResult += `${child.name} = (${child.args.map((arguito) => {
      return `${arguito.name} : ${arguito.type}`;
    })}) => {`;
    //childResult += `${child.content}
    childResult += `return (${createTsxDom(child.returnedContent)});`;
    childResult += '}';

    result += childResult;
  });
  return result;
};

//Return parser
function createTsxDom(domJson) {
  const { type, children, attributes } = domJson.dom;
  let result = `<${type}`;
  attributes.map((attribute) => {
    result += ` ${attribute.key} = ${attribute.value}`;
  });

  result += '>';

  children.map((child) => {
    if (child.dom != null) {
      result += createTsxDom(child);
    } else if (child.text) {
      result += child.text;
    }
  });

  result += `</${type}>`;

  return result;
}
