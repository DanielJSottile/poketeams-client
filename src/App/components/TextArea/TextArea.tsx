import React, {
  ChangeEvent,
  ForwardRefExoticComponent,
  RefAttributes,
  forwardRef,
  ReactNode,
} from 'react';
import ValidationError from '../ValidationError';

type Props = {
  /** class for text area container */
  containerClass?: string;
  /** id for the form the text area lives in */
  htmlFor?: string;
  /** determines if there is a label for the text area */
  labelClass?: string;
  /** label string*/
  label?: string;
  /** optional icon to be appended to the label */
  labelIcon?: JSX.Element;
  /** determines if the text area has an error or not */
  textAreaHasError: boolean;
  /** determines if the error is triggered or not */
  isError?: boolean;
  /** function used to validate the text area and provide feedback errors*/
  validationCallback?: () => ReactNode;
  /** style for the text area */
  textAreaClass?: string;
  /** value of the text area */
  value?: string | number;
  /** placeholder string */
  placeholder?: string;
  /** function used for onChange for the text area */
  onChangeCallback?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  /** string of text area name for form*/
  name?: string;
  /** string of text area id */
  id?: string;
  /** determines whether the text area is readonly or not */
  readOnly?: boolean;
  /** autocomplete string */
  autoComplete?: string;
  /** boolean for whether the text area is required */
  required?: boolean;
  /** boolean for whether the text area is disabled */
  disabled?: boolean;
  /** position of validation error (parent must be position: relative) */
  errorPosition?: string;
};

const TextArea: ForwardRefExoticComponent<
  Props & RefAttributes<HTMLTextAreaElement>
> = forwardRef<HTMLTextAreaElement, Props>(
  (
    {
      containerClass = '',
      htmlFor = '',
      labelClass = '',
      label = '',
      labelIcon,
      textAreaHasError = false,
      isError = false,
      validationCallback = () => null,
      textAreaClass = '',
      value = '',
      placeholder = '',
      onChangeCallback = () => null,
      name = '',
      id = '',
      readOnly = false,
      autoComplete = '',
      required = false,
      disabled = false,
      errorPosition = '',
    },
    ref
  ): JSX.Element => {
    return (
      <div className={containerClass}>
        {!!label && (
          <label className={labelClass} htmlFor={htmlFor}>
            {label}
            {labelIcon}
          </label>
        )}
        <textarea
          ref={ref}
          className={textAreaClass}
          placeholder={placeholder}
          value={value}
          onChange={onChangeCallback}
          name={name}
          id={id}
          readOnly={readOnly}
          autoComplete={autoComplete}
          required={required}
          disabled={disabled}
        />
        <ValidationError
          errorBoolean={isError && textAreaHasError}
          validationCallback={validationCallback}
          errorPosition={errorPosition}
        />
      </div>
    );
  }
);

export default TextArea;
