import React, { ChangeEvent } from 'react';

interface Attribute {
  key: string;
  value: string;
  type: string;
}

interface AttributesFormProps {
  attributes: Attribute[];
  onAttributeChange: (index: number, value: string) => void;
}

export function AttributesForm({
  attributes,
  onAttributeChange,
}: AttributesFormProps) {
  const handleInputChange = (
    index: number,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    onAttributeChange(index, event.target.value);
  };

  return (
    <form>
      {attributes.map((attribute, index) => (
        <div key={attribute.key}>
          <label htmlFor={attribute.key}>{attribute.key}</label>
          <input
            id={attribute.key}
            type={attribute.type}
            value={attribute.value}
            onChange={(event) => handleInputChange(index, event)}
          />
        </div>
      ))}
    </form>
  );
}
