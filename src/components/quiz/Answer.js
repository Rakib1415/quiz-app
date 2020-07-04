import React from 'react';
import questions from '../../questions.json';
import './Answer.scss';

const Answer = () => {
    return (
        <div className="answer">
            <h2>All correct answer given below:</h2>
            <ol className="correct-answer">
                {questions.map(item => {
                    return <li key={item.id}>{item.answer}</li>
                })}
            </ol>
        </div>
    );
};

export default Answer;