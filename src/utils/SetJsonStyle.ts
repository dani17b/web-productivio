import { useSelector } from 'react-redux';

export const SetJsonStyle = (json: JSON) => {
  //TODO cambiarlo cuando haya el redux.
  //const jsonRedux = useSelector((state:any) => state.parse);
  jsonRedux.component.returnedContent.dom.attributes.push({
    key: 'style',
    value: JSON.stringify(json),
  });
  return jsonRedux;
};
export const jsonRedux = {
  imports: [
    "import React, { useState } from 'react'",
    "import { Header } from 'src/components/header/Header'",
    "import { WebNavBar } from 'src/components/webNavBar/WebNavBar'",
    "import './notFound.scss'",
  ],
  component: {
    name: 'NotFound',
    args: [],
    returnedContent: {
      dom: {
        type: 'div',
        attributes: [{ key: 'className', value: "'notFound'" }],
        children: [
          { dom: { type: 'Header', attributes: [], children: [] } },
          {
            dom: {
              type: 'div',
              attributes: [],
              children: [
                {
                  dom: {
                    type: 'h1',
                    attributes: [],
                    children: [{ text: '404 - Page Not Found' }],
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
              children: [],
            },
          },
        ],
      },
    },
  },
};
