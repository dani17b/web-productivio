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
        i += (nested.children.length + 1);
        break;
      case DomElementType.Closing:
        return result;
    }
  }

  return result;
}


export function parse(input: string): TagObj {
  return elementArrayToNestedJson(
    stringArrayToElementArray(stringToStringArray(input))
  );
}
