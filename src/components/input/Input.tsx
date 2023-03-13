// @ts-nocheck
import './input.scss';

/* export enum InputType {
  TEXT = 'text',
  PASSWORD = 'password',
} */

export interface InputProps {
  type: any;
  onChange: (value: any) => void;
}

export const Input = (props: InputProps) => {
  const { type, onChange } = props;

  return (
    <input
      className="input"
      type={type}
      onChange={(e) => {
        if (onChange) {
          onChange(e.target.value);
        }
      }}
    />
  );
};
