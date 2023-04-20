// Esta versión de eslint tiene un bug para typescript: dice que DomElementType no se utiliza.
/* eslint-disable */

//TYPES
type DomElement = {
  name: string;
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

type TagObj = {
  type: string;
  children: (TagObj | TextObj)[];
};

type Arg = {
  name: string;
  type: string;
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
      name: getTagName(s),
      type: type,
    });
  });

  return result;
}

function getTagName(tag: string): string {
  let name = tag.replace('<', '').replace('>', '').replace('/', '');
  return name;
}

function elementArrayToNestedJson(elementArray: DomElement[]): TagObj {
  const result: TagObj = { type: elementArray[0].name, children: [] };

  for (let i = 1; i < elementArray.length; i++) {
    const element = elementArray[i];
    switch (element.type) {
      case DomElementType.PlainText:
        result.children.push({ text: element.name });
        break;
      case DomElementType.SelfClosed:
        result.children.push({ type: element.name, children: [] });
        break;
      case DomElementType.Opening:
        const nested = elementArrayToNestedJson(elementArray.slice(i));
        result.children.push(nested);
        i += nested.children.length + 1;
        break;
      case DomElementType.Closing:
        return result;
    }
  }

  return result;
}

export function parseFunction(functionText: string) {
  const firstLine = functionText.substring(0, functionText.indexOf('='));
  let result = [];
  const name =
    firstLine.indexOf('export') != -1
      ? firstLine.split(' ')[2]
      : firstLine.split(' ')[1];
  result.push(name);
  let args: Arg[] = [];
  result.push(args);
  let argsRaw = functionText
    .substring(functionText.indexOf('(') + 1, functionText.indexOf(')'))
    .split(',');
  argsRaw.forEach((arg) => {
    let [name, type] = arg.split(':');
    args.push({ name, type });
  });
  //const name = functionText.slice(functionText.indexOf('const') + 6,  functionText.indexOf('='));
  return { result };
}

export function parse(input: string): TagObj {
  return elementArrayToNestedJson(
    stringArrayToElementArray(stringToStringArray(input))
  );
}
