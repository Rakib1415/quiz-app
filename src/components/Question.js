import React from 'react';
import '../styles/components/question.scss'
const Question = (props) => {
    const item = props.item;
    return (
        <fieldset className="options-container">
            <h5><span>{item.id}.{" "}</span>{item.question}</h5>
            <input type="checkbox" id="optionA" value={item.optionA} name="group1" onChange={props.handleOptionClick} checked={props.state.optionA}/>
            <label htmlFor="optionA">{item.optionA}</label>
            <input type="checkbox" id="optionB" name="optionB" value={item.optionB}/>
            <label htmlFor="optionB">{item.optionB}</label>
            <input type="checkbox" id="optionC" name="optionC" value={item.optionC} />
            <label htmlFor="optionC">{item.optionC}</label>
            <input type="checkbox" id="optionD" name="optionD" value={item.optionD} />
            <label htmlFor="optionD">{item.optionD}</label>
        </fieldset>
    );
};

export default Question;