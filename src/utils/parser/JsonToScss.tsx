import { Layout, TsxObj } from './TsxToJson';

/**
 * Parsea el contenido de un .tsx a JSON.
 *
 *
 * @param input - String con todo el código de un archivo tsx y devuelve
 * @returns JSON/objeto de tipo TsxObj
 *
 */
function parseGridLayoutChildren(children: Layout[]): string {
  let result: string = '';

  children.forEach((child) => {
    result += `
        & .${child.uuid}{
            grid-row: ${child.x} / span ${child.w};
            grid-row: ${child.y} / span ${child.h};
        }
    `;
  });
  return result;
}

export function parseJsonToScss(input: TsxObj): string {
  let result: string = '';
  let parentClass: string | undefined;

  const component = input.component?.returnedContent;
  if (typeof component === 'object') {
    parentClass = component.dom.attributes?.find(
      (attr) => attr.key === 'className'
    )?.value;

    if (parentClass) {
      result += `.${parentClass} {`;

      result += parseGridLayoutChildren(
        component?.dom.children.map(
          (child) =>
            (typeof child === 'object' &&
              'dom' in child &&
              child.dom.layout) || { uuid: '', x: 0, y: 0, h: 0, w: 0 }
        )
      );
    }
  }

  return result;
}

export function parseJsonToScss2(input: TsxObj): string {
  const component = input.component?.returnedContent;
  if (typeof component !== 'object') {
    return '';
  }

  const parentClass = component.dom.attributes?.find(
    (attr) => attr.key === 'className'
  )?.value;
  if (!parentClass) {
    return '';
  }

  let result = `.${parentClass} {\n`;

  result += parseGridLayoutChildren(
    component?.dom.children
      .map((child) => 'dom' in child && child.dom.layout)
      .filter((child) => child !== undefined) as Layout[]
  );

  result += '\n}\n';

  return result;
}
