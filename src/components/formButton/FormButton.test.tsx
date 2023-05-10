import { FormButton } from './FormButton';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

test('renders button component', () => {
  render(<FormButton buttonText="Button test" />);
});

test('applies the specified font size', () => {
  render(<FormButton buttonText="Button test" />);
  const buttonFontSizeTest = screen.getByTestId('button-test');
  expect(buttonFontSizeTest).toHaveStyle('font-size: 12pt;');
});

test('applies the specified button color', () => {
  render(<FormButton buttonText="Button test" />);
  const buttonColorTest = screen.getByTestId('button-test');
  expect(buttonColorTest).toHaveStyle('background-color: ButtonFace;');
});

test('applies the specified button width', () => {
  render(<FormButton buttonText="Button test" />);
  const buttonWidthTest = screen.getByTestId('button-test');
  expect(buttonWidthTest).toHaveStyle('width: 40px;');
});

test('call the onClick function when clicked', () => {
  const onClick = jest.fn();
  render(<FormButton buttonText="Click Me" onClick={onClick} />);
  const buttonElement = screen.getByText(/Click Me/i);
  fireEvent.click(buttonElement);
  expect(onClick).toHaveBeenCalled();
});
