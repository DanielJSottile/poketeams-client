import React, { FunctionComponent, ChangeEvent, ReactNode } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

interface Option {
  value: string;
  label: ReactNode;
}

type SelectProps = {
  /** class for select container */
  containerClass?: string;
  /** id for the form the select lives in */
  htmlFor?: string;
  /** determines if there is a label for the select */
  labelClass?: string;
  /** label string*/
  label?: string;
  /** optional icon to be appended to the label */
  labelIcon?: JSX.Element;
  /** determines if the select has an error or not */
  selectHasError: boolean;
  /** determines if the error is triggered or not */
  isError?: boolean;
  /** function used to validate the select and provide feedback errors*/
  validationCallback?: () => ReactNode;
  /** style for the select */
  selectClass?: string;
  /** value of the select */
  value?: string | number;
  /** function used for onChange for the select */
  onChangeCallback?: (e: ChangeEvent<HTMLSelectElement>) => void;
  /** string of select name for form*/
  name?: string;
  /** string of select id */
  id?: string;
  /** options for select */
  options: Option[];
  /** boolean for whether the select is required */
  required?: boolean;
  /** boolean for whether the select is disabled */
  disabled?: boolean;
};

const Select: FunctionComponent<SelectProps> = ({
  containerClass = '',
  htmlFor = '',
  labelClass = '',
  label = '',
  labelIcon,
  selectHasError = false,
  isError = false,
  validationCallback = () => null,
  selectClass = '',
  value = '',
  options,
  onChangeCallback = () => null,
  name = '',
  id = '',
  required = false,
  disabled = false,
}) => {
  return (
    <div className={containerClass}>
      {!!label && (
        <label className={labelClass} htmlFor={htmlFor}>
          {label}
          {labelIcon}
        </label>
      )}
      <select
        className={selectClass}
        name={name}
        id={id}
        value={value}
        onChange={onChangeCallback}
        onBlur={onChangeCallback}
        required={required}
        disabled={disabled}
      >
        {options.map((option) => (
          <option value={option.value}>{option.label}</option>
        ))}
      </select>
      {isError && selectHasError && !!validationCallback() && (
        <p className="error-validate">
          <FontAwesomeIcon icon={faExclamationTriangle} />{' '}
          {validationCallback()}
        </p>
      )}
    </div>
  );
};

export default Select;
