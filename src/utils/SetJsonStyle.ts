import { useSelector } from 'react-redux';

export const SetJsonStyle = (json: JSON) => {
  //TODO cambiarlo cuando haya el redux.
  //const jsonRedux = useSelector((state:any) => state.parse);
  jsonRedux.components[0].dom.attributes.push({
    key: 'style',
    value: JSON.stringify(json),
  });
  return jsonRedux;
};
export const jsonRedux = {
  imports: [],
  consts: [
    {
      name: 'MAX_HEIGHT',
      type: 'number',
      value: 400,
    },
  ],
  functions: [
    {
      name: 'parseJson',
      returnType: ['undefined', 'string'],
      args: [
        {
          name: 'json',
          type: 'string',
        },
      ],
      content: 'console.log(json);',
    },
  ],
  components: [
    {
      name: 'Prueba',
      consts: [
        {
          name: 'MAX_HEIGHT',
          type: 'number',
          value: 400,
        },
      ],
      props: [
        {
          name: 'color',
          type: 'string',
          optional: true,
        },
      ],
      functions: [
        {
          name: 'parseJson',
          returnType: ['undefined', 'string'],
          args: [
            {
              name: 'json',
              type: 'string',
            },
          ],
          content: 'console.log(json);',
        },
      ],
      dom: {
        type: 'div',
        attributes: [{}],
        children: [
          {
            dom: {
              type: 'div',
              attributes: [
                {
                  key: 'className',
                  value: 'prueba',
                },
              ],
              children: [
                {
                  text: 'Hola mundo!',
                },
              ],
            },
          },
          {
            text: 'que quereis que ponga¿?¿',
          },
        ],
      },
    },
  ],
};
