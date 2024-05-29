const Button = ({ children, variant }) => {
    const variantClasses = {
      primary: "bg-base text-neutral-900 font-semibold active:scale-105 ts",
      outline: "border border-base text-base hover:bg-base hover:text-white",
      danger: "bg-danger text-white hover:bg-red-700",
    };
  
    const buttonClasses = `px-4 py-2 rounded ${
      variantClasses[variant] || variantClasses.primary
    }`;
  
    return (
      <button className={buttonClasses} >
        {children}
      </button>
    );
  };
  
export default Button;