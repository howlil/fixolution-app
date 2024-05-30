import React from 'react';

export default function Button({ children, variant , custom = '', onClick }) {
  const variantClasses = {
    primary: "bg-base text-neutral-300 font-semibold active:scale-105 ts",
    outline: "border border-base text-base hover:bg-base hover:text-white",
    danger: "bg-danger text-white hover:bg-red-700",
  };

  const buttonClasses = `rounded-full ${variantClasses[variant] || variantClasses.primary}`;

  return (
    <button onClick={onClick} className={`${buttonClasses} ${custom}`}>
      {children}
    </button>
  );
};
