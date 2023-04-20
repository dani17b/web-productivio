import React, { useState } from 'react';
import { TestComponentProps } from './TestComponent';

interface StyleEditorProps {
  initialStyles: { [key: string]: string };
  onStylesChange: (styles: TestComponentProps['style']) => void;
}

export const StyleEditor: React.FC<StyleEditorProps> = ({
  initialStyles,
  onStylesChange,
}) => {
  const [styles, setStyles] = useState(initialStyles);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setStyles((prevStyles) => {
      const newStyles = { ...prevStyles, [name]: value };
      onStylesChange([newStyles]);
      return newStyles;
    });
  };

  const handleJsonInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInputValue(event.target.value);
  };

  const handleAcceptClick = () => {
    try {
      const newStyles = JSON.parse(inputValue);
      setStyles(newStyles);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSaveClick = () => {
    console.log(JSON.stringify(styles));
  };

  return (
    <>
      <div>
        <label htmlFor="json-input">JSON input:</label>
        <input
          type="text"
          id="json-input"
          value={inputValue}
          onChange={handleJsonInputChange}
        />
        <button type="button" onClick={handleAcceptClick}>
          Accept
        </button>
      </div>
      <form>
        {Object.entries(styles).map(([key, value]) => (
          <div key={key}>
            <label htmlFor={key}>{key}:</label>
            <input
              type={
                key === 'color' || key === 'backgroundColor' ? 'color' : 'text'
              }
              id={key}
              name={key}
              value={value}
              onChange={handleInputChange}
            />
          </div>
        ))}
      </form>
      <button onClick={handleSaveClick}>Guardar</button>
    </>
  );
};
