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
  onClickCallback?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  /** string of input type */
  type?: 'button' | 'submit' | 'reset' | undefined;
  /** button children */
  children?: React.ReactNode | JSX.Element;
};

const Button: React.FC<Props> = ({
  containerClass = '',
  id = '',
  buttonClass = '',
  onClickCallback = () => null,
  disabled = false,
  type,
  children,
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
        {children}
      </button>
    </div>
  );
};

export default Button;
