// Esta versión de eslint tiene un bug para typescript: dice que DomElementType no se utiliza.
/* eslint-disable*/
//TYPES
export type TsxObj = {
  imports: string[];
  component: FunctionObj;
  functions?: FunctionObj[];
  //TODO más cosas
};
type DomElement = {
  innerString: string;
  type: DomElementType;
};

enum DomElementType {
  Opening,
  Closing,
  SelfClosed,
  PlainText,
}

type TextObj = {
  text: string;
};

export type TagObj = {
  dom: {
    type: string;
    attributes?: KeyValue[];
    layout?: Layout;
    children: (TagObj | TextObj)[];
  };
};

export type Layout = {
  uuid: string;
  x: number;
  y: number;
  h: number;
  w: number;
};

type KeyValue = {
  key: string;
  value: string;
};

type Arg = {
  name: string;
  type: string;
  optional: boolean;
};

type FunctionObj = {
  name: string;
  args: Arg[];
  content?: string;
  returnedContent?: string | TagObj;
};

//FUNCTIONS
function stringToStringArray(code: string): string[] {
  const arr: string[] = [];
  let tempStr = '';
  for (let i = 0; i < code.length; i++) {
    if (code[i] === '<') {
      if (tempStr.trim() !== '') {
        arr.push(tempStr.trim());
        tempStr = '';
      }
      tempStr += code[i];
    } else if (code[i] === '>' && tempStr.includes('<')) {
      tempStr += code[i];
      arr.push(tempStr);
      tempStr = '';
    } else {
      tempStr += code[i];
    }
  }
  if (tempStr.trim() !== '') {
    arr.push(tempStr.trim());
  }

  return arr;
}

function stringArrayToElementArray(strings: string[]): DomElement[] {
  const result: DomElement[] = [];

  strings.forEach((s) => {
    let type: DomElementType | null = null;
    if (s.includes('/>')) {
      type = DomElementType.SelfClosed;
    } else if (s.includes('</')) {
      type = DomElementType.Closing;
    } else if (s.includes('<') && s.includes('>')) {
      type = DomElementType.Opening;
    } else {
      type = DomElementType.PlainText;
    }

    result.push({
      innerString: s,
      type: type,
    });
  });

  return result;
}

function getTagName(tag: string): string {
  let innerString = tag.replace('<', '').replace('>', '').replace('/', '');
  return innerString.split(' ')[0];
}

function getTagAttributes(tag: string): KeyValue[] {
  let innerString = tag.replace('<', '').replace('>', '').replace('/', '');
  const keyValues = innerString.replaceAll('"', '').split(' ').slice(1);
  return keyValues
    .map((attr) => {
      const [key, value] = attr.split('=');
      return { key, value };
    })
    .filter((arg: KeyValue) => {
      return arg.key.replace(' ', '') !== '';
    });
}

function elementArrayToNestedJson(elementArray: DomElement[]): {
  tag: TagObj;
  index: number;
} {
  const tagInnerText = elementArray[0].innerString;
  const result: { tag: TagObj; index: number } = {
    tag: {
      dom: {
        type: getTagName(tagInnerText),
        attributes: getTagAttributes(tagInnerText) || undefined,
        children: [],
      },
    },
    index: 1,
  };

  for (let i = 1; i < elementArray.length; i++) {
    const element = elementArray[i];
    switch (element.type) {
      case DomElementType.PlainText:
        result.tag.dom.children.push({ text: element.innerString });
        break;
      case DomElementType.SelfClosed:
        result.tag.dom.children.push({
          dom: {
            type: getTagName(element.innerString),
            attributes: getTagAttributes(element.innerString) || undefined,
            children: [],
          },
        });
        break;
      case DomElementType.Opening:
        const nested = elementArrayToNestedJson(elementArray.slice(i));
        result.tag.dom.children.push(nested.tag);
        i += nested.index;
        break;
      case DomElementType.Closing:
        result.index = i;
        return result;
    }
    result.index = i;
  }

  return result;
}

function parseImports(input: string): string[] {
  const imports: string[] = [];

  let importIndex = input.indexOf('import');
  while (importIndex !== -1) {
    const semicolonIndex = input.indexOf(';');
    imports.push(input.substring(importIndex, semicolonIndex));
    input = input.slice(semicolonIndex + 1);
    importIndex = input.indexOf('import');
  }

  return imports;
}

function parseFunction(functionText: string): FunctionObj {
  const firstLine = functionText.substring(0, functionText.indexOf('='));
  let result: FunctionObj = {
    name: '',
    args: [],
  };
  const name =
    firstLine.indexOf('export') !== -1
      ? firstLine.split(' ')[2]
      : firstLine.split(' ')[1];
  result.name = name;
  let args: Arg[] = [];
  let argsRaw = functionText
    .substring(functionText.indexOf('(') + 1, functionText.indexOf(')'))
    .split(',');
  argsRaw.forEach((arg) => {
    let [name, type] = arg.split(':');
    if (name.replace(' ', '') !== '') {
      name.includes('?')
        ? args.push({ name: name.replace('?', ''), type: type, optional: true })
        : args.push({ name: name, type: type, optional: false });
    }
  });
  result.args = args;

  let content =
    functionText
      .match(/return\s+([\s\S]+?);/)?.[1]
      .replace(/[\r\n]+\s*/g, '') || '';
  content = content[0] === '(' ? content.slice(1, -1) : content;

  result.returnedContent =
    content[0] === '<' ? parseReturnedTag(content) : content;

  return result;
}

function parseReturnedTag(input: string): TagObj {
  return elementArrayToNestedJson(
    stringArrayToElementArray(stringToStringArray(input))
  ).tag;
}

const trimFunctions = (input: any) => {
  let openingCount = 0;
  for (let i = input.indexOf('{'); i < input.length; i++) {
    let char = input[i];
    if (char === '{') {
      openingCount++;
    } else if (char === '}') {
      openingCount--;
    }
    if (openingCount === 0) return input.substring(0, i);
  }
};

/**
 * Parsea el contenido de un .tsx a JSON.
 *
 *
 * @param input - String con todo el código de un archivo tsx y devuelve
 * @returns JSON/objeto de tipo TsxObj
 *
 */
export function parseTsxToJson(input: string): TsxObj {
  return {
    imports: parseImports(input),
    component: parseFunction(
      trimFunctions(input.slice(input.indexOf('export const')))
    ),
  };
}
