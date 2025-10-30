/**
 * 수학 문제 생성 유틸리티
 */

/**
 * 지정된 범위 내에서 랜덤 정수 생성
 */
export function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * 선택된 연산자 중 하나를 랜덤으로 반환
 */
export function getRandomOperator(operators) {
  return operators[Math.floor(Math.random() * operators.length)];
}

/**
 * 수학 문제 생성
 * @param {Array} operators - 선택된 연산자 배열 ['+', '-', '*', '/']
 * @param {number} minNum - 최소 숫자
 * @param {number} maxNum - 최대 숫자
 * @returns {Object} - { question, answer, num1, num2, operator }
 */
export function generateProblem(operators, minNum, maxNum) {
  const operator = getRandomOperator(operators);
  let num1, num2, answer, question;

  switch (operator) {
    case '+':
      num1 = getRandomNumber(minNum, maxNum);
      num2 = getRandomNumber(minNum, maxNum);
      answer = num1 + num2;
      question = `${num1} + ${num2}`;
      break;

    case '-':
      // 항상 양수 결과가 나오도록 num1이 num2보다 크게
      num1 = getRandomNumber(minNum, maxNum);
      num2 = getRandomNumber(minNum, num1);
      answer = num1 - num2;
      question = `${num1} - ${num2}`;
      break;

    case '*':
      num1 = getRandomNumber(minNum, maxNum);
      num2 = getRandomNumber(minNum, maxNum);
      answer = num1 * num2;
      question = `${num1} × ${num2}`;
      break;

    case '/':
      // 나누어떨어지는 문제만 생성
      num2 = getRandomNumber(Math.max(1, minNum), maxNum); // 0으로 나누기 방지
      const multiplier = getRandomNumber(minNum, maxNum);
      num1 = num2 * multiplier;
      answer = multiplier;
      question = `${num1} ÷ ${num2}`;
      break;

    default:
      throw new Error('Invalid operator');
  }

  return {
    question,
    answer,
    num1,
    num2,
    operator
  };
}

/**
 * 여러 문제 생성
 */
export function generateProblems(count, operators, minNum, maxNum) {
  const problems = [];
  for (let i = 0; i < count; i++) {
    problems.push(generateProblem(operators, minNum, maxNum));
  }
  return problems;
}
