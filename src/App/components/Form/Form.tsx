import React, { FunctionComponent, ReactNode, FormEvent } from 'react';

type FormProps = {
  /** optional classname */
  className?: string;
  /** optional onSubmit callback */
  onSubmit?: (ev: FormEvent<HTMLFormElement>) => void;
  /** required children for form */
  children: ReactNode | JSX.Element;
};

const Form: FunctionComponent<FormProps> = ({
  className,
  onSubmit,
  children,
}) => {
  return (
    <form className={className} onSubmit={onSubmit}>
      {children}
    </form>
  );
};

export default Form;
