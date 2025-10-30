import { useState, useEffect } from 'react';
import ProgressBar from './ProgressBar';
import { generateProblem } from '../utils/mathGenerator';
import './Quiz.css';

function Quiz({ settings, onComplete }) {
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const [currentProblem, setCurrentProblem] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [startTime] = useState(Date.now());
  const [problemStartTime, setProblemStartTime] = useState(Date.now());

  useEffect(() => {
    generateNewProblem();
  }, []);

  const generateNewProblem = () => {
    const problem = generateProblem(
      settings.operators,
      settings.minNum,
      settings.maxNum
    );
    setCurrentProblem(problem);
    setUserAnswer('');
    setFeedback(null);
    setProblemStartTime(Date.now());
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (userAnswer === '') return;

    const isCorrect = parseInt(userAnswer) === currentProblem.answer;

    if (isCorrect) {
      setScore(score + 1);
      setFeedback('correct');
    } else {
      setFeedback('wrong');
    }

    // 피드백 표시 후 다음 문제로 이동
    setTimeout(() => {
      if (currentProblemIndex + 1 >= settings.problemCount) {
        // 퀴즈 종료
        const totalTime = Math.floor((Date.now() - startTime) / 1000);
        onComplete({
          score: isCorrect ? score + 1 : score,
          totalProblems: settings.problemCount,
          timeTaken: totalTime
        });
      } else {
        // 다음 문제
        setCurrentProblemIndex(currentProblemIndex + 1);
        generateNewProblem();
      }
    }, 1000);
  };

  const handleNumberClick = (num) => {
    if (feedback) return; // 피드백 표시 중에는 입력 불가
    setUserAnswer(userAnswer + num);
  };

  const handleBackspace = () => {
    if (feedback) return;
    setUserAnswer(userAnswer.slice(0, -1));
  };

  const handleClear = () => {
    if (feedback) return;
    setUserAnswer('');
  };

  if (!currentProblem) {
    return <div className="loading">문제 생성 중...</div>;
  }

  return (
    <div className="quiz-container">
      <ProgressBar
        current={currentProblemIndex + 1}
        total={settings.problemCount}
        score={score}
      />

      <div className={`quiz-card ${feedback ? `feedback-${feedback}` : ''}`}>
        <div className="problem-display">
          <h2 className="problem-text">{currentProblem.question}</h2>
          <div className="equals">=</div>
          <div className="answer-display">
            {userAnswer || <span className="placeholder">?</span>}
          </div>
        </div>

        {feedback && (
          <div className={`feedback-message ${feedback}`}>
            {feedback === 'correct' ? (
              <>
                <span className="feedback-emoji">🎉</span>
                <span className="feedback-text">정답입니다!</span>
              </>
            ) : (
              <>
                <span className="feedback-emoji">😅</span>
                <span className="feedback-text">
                  틀렸어요! 정답은 {currentProblem.answer}
                </span>
              </>
            )}
          </div>
        )}

        <form onSubmit={handleSubmit} className="answer-form">
          <div className="number-pad">
            <div className="number-grid">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                <button
                  key={num}
                  type="button"
                  className="number-btn"
                  onClick={() => handleNumberClick(num)}
                  disabled={feedback !== null}
                >
                  {num}
                </button>
              ))}
              <button
                type="button"
                className="number-btn clear-btn"
                onClick={handleClear}
                disabled={feedback !== null}
              >
                C
              </button>
              <button
                type="button"
                className="number-btn"
                onClick={() => handleNumberClick(0)}
                disabled={feedback !== null}
              >
                0
              </button>
              <button
                type="button"
                className="number-btn backspace-btn"
                onClick={handleBackspace}
                disabled={feedback !== null}
              >
                ⌫
              </button>
            </div>
            <button
              type="submit"
              className="submit-btn"
              disabled={!userAnswer || feedback !== null}
            >
              확인
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Quiz;
