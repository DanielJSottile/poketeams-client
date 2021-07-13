import React, { FunctionComponent, MouseEvent, ReactNode } from 'react';

type ButtonProps = {
  /** class for the label */
  buttonClass?: string;
  /** string of input id */
  id?: string;
  /** boolean for whether the input is disabled */
  disabled?: boolean;
  /** function used for onChange for the input */
  onClickCallback?: (e: MouseEvent<HTMLButtonElement>) => void;
  /** string of input type */
  type?: 'button' | 'submit' | 'reset' | undefined;
  /** button children */
  children?: ReactNode | JSX.Element;
};

const Button: FunctionComponent<ButtonProps> = ({
  id = '',
  buttonClass = '',
  onClickCallback = () => null,
  disabled = false,
  type,
  children,
}) => {
  return (
    <button
      id={id}
      className={buttonClass}
      disabled={disabled}
      onClick={onClickCallback}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
