import React, {
  FunctionComponent,
  MouseEvent,
  ReactNode,
  CSSProperties,
} from 'react';

type ButtonProps = {
  /** class for the button */
  buttonClass?: string;
  /** styles for the button */
  buttonStyles?: CSSProperties;
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
  buttonStyles,
  onClickCallback = () => null,
  disabled,
  type,
  children,
}) => {
  return (
    <button
      id={id}
      style={buttonStyles}
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
