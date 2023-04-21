import * as React from 'react';

export interface TestComponentProps {
  text: string;
  style: React.CSSProperties[];
}

export const TestComponent: React.FC<TestComponentProps> = ({
  text,
  style,
}) => {
  return <div style={Object.assign({}, ...style)}>{text}</div>;
};
