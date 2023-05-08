import { Layout, TsxObj } from './TsxToJson';

function parseLayoutChildren(children: Layout[]): string {
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
 * Parsea el JSON del componente a formato SASS.
 * Utiliza el layout de los hijos para generar el grid.
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

  // Ajustado a los valores por defecto del grid de drag-and-drop:
  // (12 columnas y filas de 30px)
  let result = `.${parentClass} {
      display: grid;
      grid-template-columns: repeat(12, 1fr);
      grid-auto-rows: 30px;
      grid-gap: 0px;
    \n`;

  result += parseLayoutChildren(
    component?.dom.children
      .map((child) => 'dom' in child && child.dom.layout)
      .filter((child) => child !== undefined) as Layout[]
  );

  result += '\n}\n';

  return result;
}

export const testJson = {
  imports: [
    //eslint-disable-next-line
    "import React, { useState } from 'react'",
    //eslint-disable-next-line
    "import { Header } from 'src/components/header/Header'",
    //eslint-disable-next-line
    "import { WebNavBar } from 'src/components/webNavBar/WebNavBar'",
    //eslint-disable-next-line
    "import './notFound.scss'",
  ],
  component: {
    path: './src/components/Component',
    name: 'NotFound',
    args: [
      {
        name: '',
        optional: false,
      },
    ],
    returnedContent: {
      dom: {
        type: 'div',
        attributes: [
          {
            key: 'className',
            value: 'notFound',
          },
        ],
        children: [
          {
            dom: {
              type: 'Header',
              layout: {
                uuid: 'sdpfosslsdlsdpldpsdflsdpfldsfp2309430493',
                x: 3,
                y: 1,
                w: 2,
                h: 2,
              },
              attributes: [],
              children: [],
            },
          },
          {
            dom: {
              type: 'div',
              attributes: [],
              layout: {
                uuid: 'sdpfosslsdlsdpldpsdflsdpfldsfp2309430493',
                x: 3,
                y: 1,
                w: 2,
                h: 2,
              },
              children: [
                {
                  dom: {
                    type: 'h1',
                    attributes: [],
                    children: [
                      {
                        text: '404 - Page Not Found',
                      },
                    ],
                  },
                },
                {
                  dom: {
                    type: 'p',
                    attributes: [],
                    children: [
                      {
                        text: 'Sorry, the page does not exist (by the moment)',
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            dom: {
              type: 'WebNavBar',
              attributes: [],
              layout: {
                uuid: 'sdpfosslsdlsdpldpsdflsdpfldsfp2309430493',
                x: 3,
                y: 1,
                w: 2,
                h: 2,
              },
              children: [],
            },
          },
        ],
      },
    },
  },
};
