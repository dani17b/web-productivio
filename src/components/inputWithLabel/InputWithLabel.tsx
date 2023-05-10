import './inputWithLabel.scss';

export interface InputWithLabelProps {
  label: string;
  height: number;
  width: number;
  name: string;
  textColor?: string;
  borderColor?: string;
  fontSize?: number;
  placeHolder?: string;
  onChange?: any;
}

export const InputWithLabel = (props: InputWithLabelProps) => {
  const {
    label,
    height,
    width,
    name,
    textColor,
    borderColor,
    fontSize,
    placeHolder,
    onChange,
  } = props;

  const labelStyle = {
    color: textColor,
    fontSize: fontSize,
  };

  const textAreaStyle = {
    borderColor,
    height,
    width,
  };
  return (
    <>
      <div className="input__container">
        <label htmlFor={name} style={labelStyle}>
          {label}
        </label>
        <textarea
          className="input__textarea"
          id={name}
          name={name}
          style={textAreaStyle}
          placeholder={placeHolder}
          onChange={(e) => {
            if (onChange) {
              onChange(e.target.value);
            }
          }}
        ></textarea>
      </div>
    </>
  );
};
