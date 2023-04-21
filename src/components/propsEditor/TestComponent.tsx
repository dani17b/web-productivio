import * as React from 'react';

export interface TestComponentProps {
  text: string;
  style: React.CSSProperties[];
}

export const MyComponent: React.FC<TestComponentProps> = ({
  text,

  style,
}) => {
  return <div style={Object.assign({}, ...style)}>{text}</div>;
};
