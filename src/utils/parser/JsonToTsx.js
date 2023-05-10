/**This is the main function and parse all the json to return the genereted code
 * @param json json
 * @returns String/string  with all the component`s code
 */
export function parseJsonToTsx(json) {
  let result = '//@ts-ignore \n';
  result += createImportsFromJson(json.imports);
  result += `\n${createComponentsFromJson([json.component])};`;

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
    result += ` ${attribute.key} = "${attribute.value}"`;
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
