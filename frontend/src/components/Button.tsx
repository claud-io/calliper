import React from "react";

interface ButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
  children: React.ReactChild;
  disabled: boolean;
}

const Button = ({ onClick, children, disabled }: ButtonProps) => (
  <button
    disabled={disabled}
    onClick={onClick}
    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:hover:bg-indigo-600  disabled:opacity-75"
  >
    {children}
  </button>
);

export default Button;
