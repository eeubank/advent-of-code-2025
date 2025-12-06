async function solution(input) {
  const worksheet = readWorksheet(input);
  const answers = calculateAnswers(worksheet);
  const answer = answers.reduce((acc, a) => acc + a, 0);

  const correctWorksheet = readWorksheetCorrectly(input);
  const correctAnswers = calculateAnswersCorrectly(correctWorksheet);
  const correctAnswer = correctAnswers.reduce((acc, a) => acc + a, 0);

  console.log(`Answer ${answer}`);
  console.log(`Correct answer ${correctAnswer}`);
}

function readLine(line) {
  const matches = [];
  const isOperators = ["+", "*"].includes(line[0]);
  const r = isOperators ? /(\+|\*)/g : /(\d+)/g;
  let m;
  while ((m = r.exec(line)) != null) {
    matches.push(isOperators ? m[0] : +m[0]);
  }
  return matches;
}

function readWorksheet(input) {
  let worksheet;

  for (const line of input) {
    const numOrOps = readLine(line);

    if (!worksheet) {
      worksheet = Array.from(Array(numOrOps.length), () => []);
    }

    for (let i = 0; i < numOrOps.length; i++) {
      worksheet[i].push(numOrOps[i]);
    }
  }

  return worksheet;
}

function calculateAnswers(worksheet) {
  const answers = [];

  for (const problem of worksheet) {
    const answer = problem.reduce((numbers, numOrOp) => {
      switch (numOrOp) {
        case "+":
          return numbers.reduce((answer, num) => answer + num, 0);
        case "*":
          return numbers.reduce((answer, num) => answer * num, 1);
        default:
          numbers.push(numOrOp);
          return numbers;
      }
    }, []);

    answers.push(answer);
  }

  return answers;
}

function readWorksheetCorrectly(input) {
  const lineLen = input[0].length;
  const split = input.map((line) => line.split(""));
  const worksheet = new Array(input[0].length).fill("");

  for (let i = lineLen - 1; i >= 0; i--) {
    for (let j = 0; j < input.length; j++) {
      const char = split[j][i];
      if (char !== " ") {
        worksheet[lineLen - i - 1] += char;
      }
    }
  }

  return worksheet;
}

function calculateAnswersCorrectly(worksheet) {
  const answers = [];
  let currOp;

  for (let i = worksheet.length - 1; i >= 0; i--) {
    if (worksheet[i] === "") {
      continue;
    }

    const lastChar = worksheet[i].at(-1);
    if (["+", "*"].includes(lastChar)) {
      currOp = lastChar;
      answers.unshift(currOp === "*" ? 1 : 0);
    }

    switch (currOp) {
      case "+":
        answers[0] += parseInt(worksheet[i]);
        break;
      case "*":
        answers[0] *= parseInt(worksheet[i]);
        break;
    }
  }

  return answers;
}

module.exports = solution;
