import { MouseEvent } from "react";

interface Props {
  color: string;
  right: string;
  buttonTitle: string;
  onClick: (e: MouseEvent<HTMLButtonElement>) => any;
  name: any;
  // element: any;
}

export default function ButtonComponent(props: Props): JSX.Element | null {
  // You can set default values for any optional props when you destructure them.
  const { color, right, buttonTitle, onClick, name } = props;

  return (
    <button
      // Pass the `onClick` handler.
      onClick={onClick}
      // Create a custom style based on the `color` prop.
      style={{
        backgroundColor: color,
        borderColor: color,
        marginRight: right,
        padding: "10px",
        borderRadius: "3px",
        boxShadow: "none",
        border: "none",
      }}
      // Disable the button if not valid.
      name={name}
    >
      {buttonTitle}
      {/* {name} */}
      {/* {element} */}
    </button>
  );
}
