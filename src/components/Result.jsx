import './Result.css';

function Result({ result, onRestart }) {
  const percentage = Math.round((result.score / result.totalProblems) * 100);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    if (mins > 0) {
      return `${mins}분 ${secs}초`;
    }
    return `${secs}초`;
  };

  const getGrade = (percentage) => {
    if (percentage >= 90) return { text: '최고예요!', emoji: '🏆', color: '#f39c12' };
    if (percentage >= 80) return { text: '잘했어요!', emoji: '🎉', color: '#3498db' };
    if (percentage >= 70) return { text: '좋아요!', emoji: '👍', color: '#2ecc71' };
    if (percentage >= 60) return { text: '괜찮아요!', emoji: '😊', color: '#95a5a6' };
    return { text: '다시 도전!', emoji: '💪', color: '#e74c3c' };
  };

  const grade = getGrade(percentage);

  return (
    <div className="result-container">
      <div className="result-card">
        <h1 className="result-title">퀴즈 완료!</h1>

        <div className="grade-section" style={{ borderColor: grade.color }}>
          <div className="grade-emoji">{grade.emoji}</div>
          <div className="grade-text" style={{ color: grade.color }}>
            {grade.text}
          </div>
        </div>

        <div className="stats-section">
          <div className="stat-item">
            <div className="stat-label">정답 문제</div>
            <div className="stat-value">
              <span className="stat-score">{result.score}</span>
              <span className="stat-separator">/</span>
              <span className="stat-total">{result.totalProblems}</span>
            </div>
          </div>

          <div className="stat-item">
            <div className="stat-label">정답률</div>
            <div className="stat-value percentage">
              {percentage}%
            </div>
          </div>

          <div className="stat-item">
            <div className="stat-label">소요 시간</div>
            <div className="stat-value time">
              {formatTime(result.timeTaken)}
            </div>
          </div>
        </div>

        <div className="result-chart">
          <div className="chart-bar">
            <div
              className="chart-fill correct"
              style={{ width: `${percentage}%` }}
            ></div>
            <div
              className="chart-fill wrong"
              style={{ width: `${100 - percentage}%` }}
            ></div>
          </div>
          <div className="chart-labels">
            <div className="chart-label">
              <span className="label-dot correct"></span>
              정답 {result.score}
            </div>
            <div className="chart-label">
              <span className="label-dot wrong"></span>
              오답 {result.totalProblems - result.score}
            </div>
          </div>
        </div>

        <button className="restart-btn" onClick={onRestart}>
          다시 시작하기 🔄
        </button>
      </div>
    </div>
  );
}

export default Result;
