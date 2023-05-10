import './formButton.scss';

// fontSize default values
const MIN_SIZE = 5;
const MAX_SIZE = 45;
const DEFAULT_SIZE = 12;
// buttonWidth default values
const BUTTON_MIN_SIZE = 20;
const BUTTON_MAX_SIZE = 1000;
const BUTTON_DEFAULT_SIZE = 40;

interface FormButtonProps {
  /**
   * Text contained in the button (e.g: Save, Delete, Cancel...)
   */
  buttonText: string;
  /**
   * This prop allows font size changes
   */
  fontSize?: number;
  /**
   * This prop allows you to change the button's color
   */
  buttonColor?: string;
  /**
   * Changes the button's width.
   */
  buttonWidth?: number;

  onClick?: () => void;
}

export const FormButton = (props: FormButtonProps) => {
  const { buttonText, fontSize, buttonColor, buttonWidth, onClick } = props;

  const buttonFontSize = `${Math.max(
    MIN_SIZE,
    Math.min(MAX_SIZE, fontSize || DEFAULT_SIZE)
  )}pt`;

  const buttonWidthLimits = `${Math.max(
    BUTTON_MIN_SIZE,
    Math.min(BUTTON_MAX_SIZE, buttonWidth || BUTTON_DEFAULT_SIZE)
  )}px`;

  return (
    <button
      data-testid="button-test"
      className="formButton"
      onClick={onClick}
      style={{
        fontSize: buttonFontSize,
        backgroundColor: buttonColor,
        width: buttonWidthLimits,
      }}
    >
      {buttonText}
    </button>
  );
};
