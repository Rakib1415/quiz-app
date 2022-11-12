import React from "react";
import classes from "../styles/Answers.module.css";
import Checkbox from "./Checkbox";

const Answers = ({ options = [], handleChange }) => {
  return (
    <div className={classes.answers}>
      {options.map((option, index) => (
        <Checkbox
          className={classes.answer}
          text={option.title}
          key={index}
          value={option.checked}
          onChange={(e) => handleChange(e, index)}
        />
      ))}
    </div>
  );
};

export default Answers;
