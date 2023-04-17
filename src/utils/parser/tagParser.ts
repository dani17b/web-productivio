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
  let result: TagObj = { type: '', children: [] };
  let children: (TagObj | TextObj)[] = [];

  for (let i = 1; i < elementArray.length; i++) {
    const element = elementArray[i];
    if (element.type === DomElementType.PlainText) {
      const text: TextObj = { text: element.name };
      children.push(text);
    } else if (element.type === DomElementType.SelfClosed) {
      const dom: TagObj = { type: element.name, children: [] };
      children.push(dom);
    } else if (element.type === DomElementType.Opening) {
      const nested: TagObj = elementArrayToNestedJson(elementArray.slice(i));
      if (nested != null) {
        children.push(nested);
        i += nested.children.length + 1;
      }
    } else if (element.type === DomElementType.Closing) {
      break;
    }
  }

  result.type = elementArray[0].name;
  result.children = children;
  return result;
}

export function parse(input: string): TagObj {
  return elementArrayToNestedJson(
    stringArrayToElementArray(stringToStringArray(input))
  );
}
