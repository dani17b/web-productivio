import { Layout, TsxObj } from './TsxToJson';

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

/**
 * Parsea el JSON del componente a formato SASS. Utiliza el layout de los hijos para generar el grid.
 *
 *
 * @param input - JSON (de tipo TsxObj) del componente a parsear
 * @returns string con los estilos del componente en formato SASS.
 *
 */
export function parseJsonToScss(input: TsxObj): string {
  const component = input.component?.returnedContent;
  if (typeof component !== 'object') {
    throw new Error('El elemento padre necesita ser un TagObj');
  }

  const parentClass = component.dom.attributes?.find(
    (attr) => attr.key === 'className'
  )?.value;

  if (!parentClass) {
    throw new Error(
      'El elemento padre necesita un className para ser identificado'
    );
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
