import React from "react";
import classes from "../styles/Button.module.css";

const Button = ({ className, children, ...rest }) => {
  return (
    <button className={`${className} ${classes.button}`} {...rest}>
      {children}
    </button>
  );
};

export default Button;
