import React, { Component, Fragment } from 'react';
import { Helmet } from 'react-helmet';
import classnames from 'classnames';

import questions from '../../questions.json';
import isEmpty from '../../utils/is-empty';

class Play extends Component {
    constructor (props) {
        super(props);
        this.state = {
            questions,
            currentQuestion: {},
            nextQuestion: {},
            previousQuestion: {},
            answer: '',
            numberOfQuestions: 0,
            numberOfAnsweredQuestions: 0,
            currentQuestionIndex: 0,
            score: 0,
            correctAnswers: 0,
            wrongAnswers: 0,
            nextButtonDisabled: false,
            previousButtonDisabled: true,
            previousRandomNumbers: [],
            time: {},
            disabledOptions: false, //Enable or disable Answer Options
            optionA: false, //Radio button all initially not checked, so set to false initially
            optionB: false,
            optionC: false,
            optionD: false,
            userAnswer: []
        };
        this.interval = null;
    }

    componentDidMount () {
        const { questions, currentQuestion, nextQuestion, previousQuestion } = this.state;
        this.displayQuestions(questions, currentQuestion, nextQuestion, previousQuestion);
        this.startTimer();
        
    }

    componentWillUnmount () {
        clearInterval(this.interval);
        
    }

    displayQuestions = (questions = this.state.questions, currentQuestion, nextQuestion, previousQuestion) => {
        let { currentQuestionIndex } = this.state;   
        if (!isEmpty(this.state.questions)) {
            questions = this.state.questions;
            currentQuestion = questions[currentQuestionIndex];
            nextQuestion = questions[currentQuestionIndex + 1];
            previousQuestion = questions[currentQuestionIndex - 1];
            const answer = currentQuestion.answer;
            this.setState({
                currentQuestion,
                nextQuestion,
                previousQuestion,
                numberOfQuestions: questions.length,
                answer,
                previousRandomNumbers: []
            }, () => {
                this.showOptions();
                this.handleDisableButton();
            });
        }     
    };

    handleOptionClick = (event) => {

        if (event.target.value.toLowerCase() === this.state.answer.toLowerCase()) {
            this.correctTimeout = setTimeout(() => {
            }, 500);
            this.correctAnswer();
        } else {
            this.wrongTimeout = setTimeout(() => {
    
            }, 500);
            this.wrongAnswer();
        }
        if(event.target.id === "optionA") { 
            this.setState({
                optionA: event.target.checked,
                optionB: !event.target.checked,
                optionC: !event.target.checked,
                optionD: !event.target.checked,
                userAnswer: {
                    option: event.target.value,
                    id: this.state.currentQuestion.id
                    
                }
            })    
        }
        else if(event.target.id ==="optionB") {
            this.setState({
                optionB: event.target.checked,
                optionA: !event.target.checked,
                optionC: !event.target.checked,
                optionD: !event.target.checked,
                userAnswer: {
                    option: event.target.value,
                    id: this.state.currentQuestion.id
                    
                }
            })
        }
        else if(event.target.id ==="optionC") {
            this.setState({
                optionC: event.target.checked,
                optionB: !event.target.checked,
                optionA: !event.target.checked,
                optionD: !event.target.checked,
                userAnswer: {
                    option: event.target.value,
                    id: this.state.currentQuestion.id
                }
            })
        }
        else if(event.target.id ==="optionD") {
            this.setState({
                optionD: event.target.checked,
                optionB: !event.target.checked,
                optionC: !event.target.checked,
                optionA: !event.target.checked,
                userAnswer: {
                    option: event.target.value,
                    id: this.state.currentQuestion.id
                    
                }
            })
        }
        
    }
   

    handleNextButtonClick = () => {
        if (this.state.nextQuestion !== undefined) {
            this.setState(prevState => ({
                disabledOptions: false, //Enable or disable Answer Options
                optionA: false, //Radio button all initially not checked, so set to false initially
                optionB: false,
                optionC: false,
                optionD: false,
                currentQuestionIndex: prevState.currentQuestionIndex + 1
            }), () => {
                this.displayQuestions(this.state.state, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion);
            });
        }
    };

    // handlePreviousButtonClick = () => {
    //     const questionItem = [this.state.previousQuestion];
    //     console.log(questionItem);
    //     console.log(this.state.userAnswer);
    //     if (this.state.previousQuestion !== undefined) {
    //         this.setState(prevState => ({
    //             currentQuestionIndex: prevState.currentQuestionIndex - 1
    //         }), () => {
    //             this.displayQuestions(this.state.state, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion);
    //         });
    //     }
    //     questionItem.map(question => {
    //         if (question.optionA === this.state.userAnswer.option && question.id === this.state.userAnswer.id) {
    //             return this.setState({
    //                 optionA: !this.state.optionA,
    //                 optionB: false,
    //                 optionC: false,
    //                 optionD: false
                    
                    
    //             })
    //         }
    //         else if (question.optionB === this.state.userAnswer.option && question.id === this.state.userAnswer.id) {
    //             return this.setState({
    //                 optionB: !this.state.optionB,
    //                 optionA: false,
    //                 optionC: false,
    //                 optionD: false
                    
    //             })
    //         }
    //         else if (question.optionC === this.state.userAnswer.option && question.id === this.state.userAnswer.id) {
    //             return this.setState({
    //                 optionC: !this.state.optionC,
    //                 optionB: false,
    //                 optionA: false,
    //                 optionD: false
    //             })
    //         }
    //         else if (question.optionD === this.state.userAnswer.option && question.id === this.state.userAnswer.id) {
    //             return this.setState({
    //                 optionD: !this.state.optionD,
    //                 optionB: false,
    //                 optionC: false,
    //                 optionA: false
    //             })
    //         }
    //     })
    // };

    handleButtonClick = (e) => {
        switch (e.target.id) {
            case 'next-button':
                this.handleNextButtonClick();
                break;

            // case 'previous-button':
            //     this.handlePreviousButtonClick();
            //     break;
            case 'quit-button':
                this.endGame();
                 break;

            default:
                break;
        }
        // this.endGame();
        
    };

 

    correctAnswer = () => {
        this.setState(prevState => ({
            score: prevState.score + 1,
            correctAnswers: prevState.correctAnswers + 1,
            numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions + 1
        }), () => {            
            if (this.state.nextQuestion === undefined) {
                // this.endGame();
            } else {
                this.displayQuestions(this.state.questions, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion);
            }
        });
    }

    wrongAnswer = () => {
        this.setState(prevState => ({
            wrongAnswers: prevState.wrongAnswers + 1,
            numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions + 1
        }), () => {
            if (this.state.nextQuestion === undefined) {
                // this.endGame();
            } else {
                this.displayQuestions(this.state.questions, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion);
            }
        });
    }

    showOptions = () => {
        const options = Array.from(document.querySelectorAll('.option'));

        options.forEach(option => {
            option.style.visibility = 'visible';
        });
    }

    startTimer = () => {
        const countDownTime = Date.now() + 900000;
        this.interval = setInterval(() => {
            const now = new Date();
            const distance = countDownTime - now;

            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            if (distance < 0) {
                clearInterval(this.interval);
                this.setState({
                    time: {
                        minutes: 0,
                        seconds: 0
                    }
                }, () => {
                    this.endGame();
                });
            } else {
                this.setState({
                    time: {
                        minutes,
                        seconds,
                        distance
                    }
                });
            }
        }, 1000);
    }

    handleDisableButton = () => {
        if (this.state.previousQuestion === undefined || this.state.currentQuestionIndex === 0) {
            this.setState({
                previousButtonDisabled: true
            });
        } else {
            this.setState({
                previousButtonDisabled: false
            });
        }

        if (this.state.nextQuestion === undefined || this.state.currentQuestionIndex + 1 === this.state.numberOfQuestions) {
            this.setState({
                nextButtonDisabled: true
            });
        } else {
            this.setState({
                nextButtonDisabled: false
            });
        }
    }

    endGame = () => {
        alert('Quiz has eneded!');
        const { state } = this;
        const playerStats = {
            score: state.score,
            numberOfQuestions: state.numberOfQuestions,
            numberOfAnsweredQuestions: state.correctAnswers + state.wrongAnswers,
            correctAnswers: state.correctAnswers,
            wrongAnswers: state.wrongAnswers
        };
            this.props.history.push('/quizSummary', playerStats);
        
    }

    render () {
        const { 
            currentQuestion, 
            currentQuestionIndex, 
            numberOfQuestions,
            time
        } = this.state;
        // console.log(userAnswer);
        return (
            <Fragment>
                <Helmet><title>Quiz Page</title></Helmet>
                <div className="questions">
                    <div className="timer-container">
                        <p>
                            <span className="left" style={{ float: 'left' }}>{currentQuestionIndex + 1} of {numberOfQuestions}</span>
                            <h2 className={classnames('valid', {
                                'warning': time.distance <= 120000,
                                'invalid': time.distance < 30000
                            })}>
                                {time.minutes}:{time.seconds}
                            <span  className="mdi mdi-clock-outline mdi-50px"></span></h2>
                        </p>
                    </div>

        <fieldset className="options-container">
            <h5><span>{currentQuestion.id}.{" "}</span>{currentQuestion.question}</h5>
            <input type="checkbox" id="optionA" value={currentQuestion.optionA} name="group1" onChange={this.handleOptionClick} checked={this.state.optionA}/>
            <label htmlFor="optionA">{currentQuestion.optionA}</label>
            <input type="checkbox" id="optionB" value={currentQuestion.optionB} name="group1" onChange={this.handleOptionClick} checked={this.state.optionB}/>
            <label htmlFor="optionB">{currentQuestion.optionB}</label>
            <input type="checkbox" id="optionC" value={currentQuestion.optionC} name="group1" onChange={this.handleOptionClick} checked={this.state.optionC}/>
            <label htmlFor="optionC">{currentQuestion.optionC}</label>
            <input type="checkbox" id="optionD" value={currentQuestion.optionD} name="group1" onChange={this.handleOptionClick} checked={this.state.optionD}/>
            <label htmlFor="optionD">{currentQuestion.optionD}</label>
        </fieldset>
                    
                    {/* {questions.map(item => <Question key={item.id} item={item}  handleOptionClick={ this.handleOptionClick} state={this.state}></Question>)} */}

                    <div className="button-container">
                        {/* <button 
                            className={classnames('', {'disable': this.state.previousButtonDisabled})}
                            id="previous-button" 
                            onClick={this.handleButtonClick}>
                            previous
                        </button> */}
                        <button 
                            className={classnames('', {'disable': this.state.nextButtonDisabled})}
                            id="next-button" 
                            onClick={this.handleButtonClick}>
                            Next
                            </button>
                            <button id="quit-button" onClick={this.handleButtonClick}>Submit</button>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default Play;