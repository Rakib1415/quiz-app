import React from 'react';
import { BrowserRouter as Router, Route, Switch,} from 'react-router-dom';
import Play from './components/quiz/Play';
import QuizSummary from './components/quiz/QuizSummary';
import Answer from './components/quiz/Answer';
// import Countdown from './components/quiz/Countdown';

function App() {

  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Play} />
        <Route path="/quizSummary" exact component={QuizSummary} />
        <Route path="/correctAnswer" exact component={Answer} />
        {/* <Route path ="/" exact component={Countdown}/> */}
     </Switch>
    </Router>
    
  );
}

export default App;