import { useState } from 'react';
import { AttributesForm } from './EditNoRedux';

interface Attribute {
  key: string;
  value: string;
  type: string;
}

export function EditJson() {
  const [attributes, setAttributes] = useState<Attribute[]>([
    { key: 'color', value: 'blue', type: 'string' },
    // ...
  ]);

  const handleAttributeChange = (index: number, value: string) => {
    setAttributes((attributes) =>
      attributes.map((attribute, i) => {
        if (i === index) {
          return { ...attribute, value };
        }
        return attribute;
      })
    );
  };

  return (
    <div>
      <AttributesForm
        attributes={attributes}
        onAttributeChange={handleAttributeChange}
      />
    </div>
  );
}
//dom: { type: name, path, layout: { uuid: uuid(), x: 0, y: 0, h: 0, w: 0, }, attributes: [{key: color, value: blue, type: string}], children: [], },
