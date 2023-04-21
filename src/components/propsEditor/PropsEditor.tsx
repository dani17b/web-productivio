import React, { useState } from 'react';
import { TestComponentProps } from './TestComponent';

interface PropsEditorProps {
  initialText: string;
  onTextChange: (text: TestComponentProps['text']) => void;
}

export const PropsEditor: React.FC<PropsEditorProps> = ({
  initialText,
  onTextChange,
}) => {
  const [text, setText] = useState('Hello World!');

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newText = event.target.value;
    setText(newText);
    onTextChange(newText);
  };

  return (
    <>
      <div>
        <label htmlFor="text-input">Text:</label>
        <input
          type="text"
          id="text-input"
          value={text}
          onChange={handleTextChange}
        />
      </div>
    </>
  );
};
