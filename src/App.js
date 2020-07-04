import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Play from './components/quiz/Play';
import QuizSummary from './components/quiz/QuizSummary';
import Answer from './components/quiz/Answer';

function App() {
  return (
    
    <Router>
      <Route path="/" exact component={Play} />
      <Route path="/quizSummary" exact component={QuizSummary} />
      <Route path="/correctAnswer" exact component={Answer} />
    </Router>
  );
}

export default App;