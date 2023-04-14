import * as React from 'react';
import PropsEditor from './PropsEditor';

export interface MyComponentProps {
  width: number;
  height: number;
  text: string;
  color: string;
  backgroundColor: string;
  fontSize: number;
  textAlign: 'left' | 'center' | 'right';
  flexDirection: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  justifyContent:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around';
  alignItems: 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';
  fontWeight: 'normal' | 'bold';
  style: React.CSSProperties;
}

export const MyComponent: React.FC<MyComponentProps> = ({
  width,
  height,
  text,
  backgroundColor,
  color,
  fontSize,
  textAlign,
  flexDirection,
  justifyContent,
  style,
}) => {
  return (
    <div
      style={{
        width,
        height,
        backgroundColor,
        color,
        fontSize,
        textAlign,
        flexDirection,
        justifyContent,
        ...style,
      }}
    >
      {text}
    </div>
  );
};
