// Esta versión de eslint tiene un bug para typescript: dice que DomElementType no se utiliza.
/* eslint-disable */

//TYPES
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

type TagObj = {
  dom: {
    type: string;
    attributes?: KeyValue[];
    children: (TagObj | TextObj)[];
  };
};

type KeyValue = {
  key: string;
  value: string;
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
  const keyValues = innerString.split(' ').slice(1);
  return keyValues.map((attr) => {
    const [key, value] = attr.split('=');
    return { key, value };
  });
}

function elementArrayToNestedJson(elementArray: DomElement[]): TagObj {
  const tagInnerText = elementArray[0].innerString;
  const result: TagObj = {
    dom: {
      type: getTagName(tagInnerText),
      attributes: getTagAttributes(tagInnerText) || undefined,
      children: [],
    },
  };

  for (let i = 1; i < elementArray.length; i++) {
    const element = elementArray[i];
    switch (element.type) {
      case DomElementType.PlainText:
        result.dom.children.push({ text: element.innerString });
        break;
      case DomElementType.SelfClosed:
        result.dom.children.push({
          dom: {
            type: getTagName(element.innerString),
            attributes: getTagAttributes(element.innerString) || undefined,
            children: [],
          },
        });
        break;
      case DomElementType.Opening:
        const nested = elementArrayToNestedJson(elementArray.slice(i));
        result.dom.children.push(nested);
        i += nested.dom.children.length + 1;
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
