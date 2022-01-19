import fs from "fs";

const input = fs.readFileSync("input").toString();
const data = input.split("\r\n");

const draws = data[0].split(",").map((numStr) => +numStr);
const matrices = [];
let matrix = [];

for (let i = 1; i < data.length; i++) {
  const row = data[i];

  if (!row) {
    if (matrix.length) {
      matrices.push(matrix);
      matrix = [];
    }
    continue;
  }

  matrix.push(
    row
      .split(" ")
      .filter((numStr) => numStr.length)
      .map((numStr) => +numStr)
  );
}

const markMatrix = (matrix, draw) => {
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] === draw) {
        matrix[i][j] = "-";
      }
    }
  }
};

const checkWinningMatrix = (matrix) => {
  for (let i = 0; i < matrix.length; i++) {
    if (matrix[i].every((value) => value === "-")) {
      return true;
    }
  }

  for (let i = 0; i < matrix.length; i++) {
    const row = [];
    for (let j = 0; j < matrix[i].length; j++) {
      row.push(matrix[j][i]);
    }
    if (row.every((value) => value === "-")) {
      return true;
    }
  }

  return false;
};

const sumMatrix = (matrix) => {
  let sum = 0;

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] !== "-") {
        sum += matrix[i][j];
      }
    }
  }

  return sum;
};

let winning;
let currentDraw;
let filtered = matrices;

for (let d = 0; d < draws.length; d++) {
  const win = [];
  for (let i = 0; i < filtered.length; i++) {
    const current = filtered[i];
    currentDraw = draws[d];
    markMatrix(current, currentDraw);
    const isWinning = checkWinningMatrix(current);

    if (isWinning) {
      winning = current;
      win.push(current);
    }
  }

  filtered = filtered.filter((matrix) => !win.includes(matrix));

  if (filtered.length === 0) {
    break;
  }
}

const sum = sumMatrix(winning);
console.log(sum * currentDraw);
