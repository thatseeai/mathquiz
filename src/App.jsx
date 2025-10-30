import { useState } from 'react';
import Settings from './components/Settings';
import Quiz from './components/Quiz';
import Result from './components/Result';
import './App.css';

function App() {
  const [screen, setScreen] = useState('settings'); // 'settings', 'quiz', 'result'
  const [quizSettings, setQuizSettings] = useState(null);
  const [quizResult, setQuizResult] = useState(null);

  const handleStart = (settings) => {
    setQuizSettings(settings);
    setScreen('quiz');
  };

  const handleComplete = (result) => {
    setQuizResult(result);
    setScreen('result');
  };

  const handleRestart = () => {
    setQuizSettings(null);
    setQuizResult(null);
    setScreen('settings');
  };

  return (
    <div className="app">
      {screen === 'settings' && <Settings onStart={handleStart} />}
      {screen === 'quiz' && <Quiz settings={quizSettings} onComplete={handleComplete} />}
      {screen === 'result' && <Result result={quizResult} onRestart={handleRestart} />}
    </div>
  );
}

export default App;
