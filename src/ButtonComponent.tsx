import React from "react";

type Props = {
  color: string;
  buttonTitle: string;
  // onClick can be React.MouseEventHandler<HTMLButtonElement> if you want to access the `e` argument.
  // But here, we just define a function which takes no arguments and doesn't return anything.
  onClick: () => void;
  open?: boolean;
  isValid?: boolean;
};

export default function ButtonComponent(props: Props): JSX.Element | null {
  // You can set default values for any optional props when you destructure them.
  const { color, buttonTitle, onClick, open = true, isValid = true } = props;

  // Don't show any button unless `open` is `true`.
  // It is ok for React component to return `null` -- but not `undefined`!
  if (!open) {
    return null;
  }
  // Create an HTML `button` element.
  return (
    <button
      // Pass the `onClick` handler.
      onClick={onClick}
      // Create a custom style based on the `color` prop.
      style={{ backgroundColor: color, borderColor: color }}
      // Disable the button if not valid.
      disabled={!isValid}
    >
      {buttonTitle}
    </button>
  );
}
