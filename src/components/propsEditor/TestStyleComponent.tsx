export interface TestStyleComponentProps {
  text: string;
  style: React.CSSProperties[];
}

export const TestComponent: React.FC<TestStyleComponentProps> = ({
  text,
  style,
}) => {
  return <div style={Object.assign({}, ...style)}>{text}</div>;
};
