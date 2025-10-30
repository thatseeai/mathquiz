import { useState } from 'react';
import './Settings.css';

function Settings({ onStart }) {
  const [selectedOperators, setSelectedOperators] = useState(['+']);
  const [minNum, setMinNum] = useState(1);
  const [maxNum, setMaxNum] = useState(10);
  const [problemCount, setProblemCount] = useState(10);

  const operators = [
    { value: '+', label: '덧셈 (+)', emoji: '➕' },
    { value: '-', label: '뺄셈 (-)', emoji: '➖' },
    { value: '*', label: '곱셈 (×)', emoji: '✖️' },
    { value: '/', label: '나눗셈 (÷)', emoji: '➗' }
  ];

  const handleOperatorToggle = (op) => {
    if (selectedOperators.includes(op)) {
      // 최소 1개는 선택되어야 함
      if (selectedOperators.length > 1) {
        setSelectedOperators(selectedOperators.filter(o => o !== op));
      }
    } else {
      setSelectedOperators([...selectedOperators, op]);
    }
  };

  const handleStart = () => {
    if (selectedOperators.length === 0) {
      alert('최소 하나의 연산을 선택해주세요!');
      return;
    }
    if (minNum >= maxNum) {
      alert('최대값은 최소값보다 커야 합니다!');
      return;
    }
    if (minNum < 0 || maxNum > 1000) {
      alert('숫자 범위는 0~1000 사이여야 합니다!');
      return;
    }

    onStart({
      operators: selectedOperators,
      minNum: parseInt(minNum),
      maxNum: parseInt(maxNum),
      problemCount: parseInt(problemCount)
    });
  };

  return (
    <div className="settings-container">
      <h1 className="settings-title">수학 퀴즈</h1>

      <div className="settings-section">
        <h2 className="settings-subtitle">연산 선택</h2>
        <div className="operator-grid">
          {operators.map(op => (
            <button
              key={op.value}
              className={`operator-btn ${selectedOperators.includes(op.value) ? 'selected' : ''}`}
              onClick={() => handleOperatorToggle(op.value)}
            >
              <span className="operator-emoji">{op.emoji}</span>
              <span className="operator-label">{op.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="settings-section">
        <h2 className="settings-subtitle">숫자 범위</h2>
        <div className="range-inputs">
          <div className="input-group">
            <label>최소값</label>
            <input
              type="number"
              value={minNum}
              onChange={(e) => setMinNum(e.target.value)}
              min="0"
              max="999"
              className="number-input"
            />
          </div>
          <span className="range-separator">~</span>
          <div className="input-group">
            <label>최대값</label>
            <input
              type="number"
              value={maxNum}
              onChange={(e) => setMaxNum(e.target.value)}
              min="1"
              max="1000"
              className="number-input"
            />
          </div>
        </div>
      </div>

      <div className="settings-section">
        <h2 className="settings-subtitle">문제 수</h2>
        <div className="problem-count-buttons">
          {[5, 10, 20, 30].map(count => (
            <button
              key={count}
              className={`count-btn ${problemCount === count ? 'selected' : ''}`}
              onClick={() => setProblemCount(count)}
            >
              {count}문제
            </button>
          ))}
        </div>
      </div>

      <button className="start-btn" onClick={handleStart}>
        시작하기 🚀
      </button>
    </div>
  );
}

export default Settings;
