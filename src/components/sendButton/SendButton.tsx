import React from 'react';
import { BsSendFill } from 'react-icons/bs';
import './sendButton.scss';

interface ButtonProps {
  /**
   * Function to be called when the button is clicked
   */
  onClick: () => void;
}

export const SendButton = ({ onClick }: ButtonProps) => {
  return (
    <button className="button" onClick={onClick}>
      <BsSendFill />
    </button>
  );
};