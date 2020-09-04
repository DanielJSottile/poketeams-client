import React from "react";

// delete or comment out unused ones!

export function Hyph() {
  return <span className="Hyph">{" - "}</span>;
}

export function Button({
  className,
  ...props
}: {
  className?: any;
  children?: any;
  type: "button" | "submit" | "reset";
}) {
  return <button className={["Button", className].join(" ")} {...props} />;
}

export function Textarea({ className, ...props }: { className?: any }) {
  return <textarea className={["Textarea", className].join(" ")} {...props} />;
}

// we have to add all the types usable for this custom element
export function Input({
  className,
  ...props
}: {
  className?: any;
  children?: any;
  name?: string;
  type?: string;
  required?: boolean;
  id?: string;
}) {
  return <input className={["Input", className].join(" ")} {...props} />;
}

export function Required({ className, ...props }: { className?: any }) {
  return (
    <span className={["Required", className].join(" ")} {...props}>
      &#42;
    </span>
  );
}

export function Section({
  className,
  list,
  ...props
}: {
  className?: any;
  list?: any;
}) {
  const classes = ["Section", list && "Section--list", className]
    .filter(Boolean)
    .join(" ");
  return <section className={classes} {...props} />;
}
