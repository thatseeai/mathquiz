import './ProgressBar.css';

function ProgressBar({ current, total, score }) {
  const percentage = (current / total) * 100;

  return (
    <div className="progress-container">
      <div className="progress-info">
        <div className="progress-text">
          <span className="current-problem">{current}</span>
          <span className="separator">/</span>
          <span className="total-problems">{total}</span>
        </div>
        <div className="score-display">
          점수: <span className="score-number">{score}</span>
        </div>
      </div>
      <div className="progress-bar-outer">
        <div
          className="progress-bar-inner"
          style={{ width: `${percentage}%` }}
        >
          <div className="progress-bar-glow"></div>
        </div>
      </div>
    </div>
  );
}

export default ProgressBar;
