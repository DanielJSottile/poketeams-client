import React from 'react';

type Props = {
  /** class for input container */
  containerClass?: string;
  /** class for the label */
  buttonClass?: string;
  /** string of input id */
  id?: string;
  /** boolean for whether the input is disabled */
  disabled?: boolean;
  /** function used for onChange for the input */
  onClickCallback?: () => void;
  /** string of input type */
  type?: 'button' | 'submit' | 'reset' | undefined;
  /** label text for button */
  buttonLabel?: React.ReactNode;
};

const Button: React.FC<Props> = ({
  containerClass = '',
  id = '',
  buttonClass = '',
  onClickCallback = () => null,
  disabled = false,
  buttonLabel = '',
  type = undefined,
}) => {
  return (
    <div className={containerClass}>
      <button
        id={id}
        className={buttonClass}
        disabled={disabled}
        onClick={onClickCallback}
        type={type}
      >
        {buttonLabel}
      </button>
    </div>
  );
};

export default Button;
