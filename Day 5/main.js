import fs from "fs";

const print = (floor) => {
  for (let i = 0; i < floor.length; i++) {
    const row = [];
    for (let j = 0; j < floor[i].length; j++) {
      const element = floor[i][j];
      row.push(element);
    }
    console.log(row.join(" "));
    console.log("\n");
  }
};

const generateMap = (width, height) => {
  const floor = [];

  for (let i = 0; i <= height; i++) {
    floor.push([]);
    for (let j = 0; j <= width; j++) {
      floor[i].push(".");
    }
  }

  return floor;
};

const countOverlappedPoints = (floor) => {
  let overlapped = 0;

  for (let i = 0; i < floor.length; i++) {
    for (let j = 0; j < floor[i].length; j++) {
      const exist = parseInt(floor[i][j]);
      if (exist && exist > 1) {
        overlapped++;
      }
    }
  }

  return overlapped;
};

const fillPoints = (floor, points) => {
  points.forEach(({ x, y }) => {
    let nextCount = "1";
    if (floor[y][x] !== ".") {
      nextCount = parseInt(floor[y][x]) + 1;
    }

    floor[y][x] = nextCount.toString();
  });
};

const getPoints = ({ start, end }) => {
  const points = [];

  if (start.x === end.x) {
    // vertical line
    const vertDiff = Math.abs(start.y - end.y);
    const min = Math.min(start.y, end.y);
    const { x } = start;

    for (let i = min; i <= min + vertDiff; i++) {
      points.push({ x, y: i });
    }
  } else if (start.y === end.y) {
    // horizontal line
    const horizontalDiff = Math.abs(start.x - end.x);
    const min = Math.min(start.x, end.x);
    const { y } = start;

    for (let i = min; i <= min + horizontalDiff; i++) {
      points.push({ x: i, y });
    }
  } else if (Math.abs(start.x - end.x) === Math.abs(start.y - end.y)) {
    // just switch start and end point if the diagonal goes from right to left
    if (start.x > end.x) {
      const tempStart = start;
      start = end;
      end = tempStart;
    }

    // now we should have left to right and either decreasing or increasing diagonal
    const increasing = start.y < end.y ? 1 : -1;
    const difference = Math.abs(start.x - end.x);

    for (let i = 0; i <= difference; i++) {
      const y = start.y + increasing * i;
      points.push({ x: start.x + i, y });
    }
  }

  return points;
};

const input = fs.readFileSync("input").toString();
const lines = input.split("\r\n").map((row) => {
  const [start, end] = row.split(" -> ");
  const [x1, y1] = start.split(",");
  const [x2, y2] = end.split(",");

  return {
    start: {
      x: +x1,
      y: +y1,
    },
    end: {
      x: +x2,
      y: +y2,
    },
  };
});

let width = 0;
let height = 0;

lines.forEach(({ start, end }) => {
  if (start.x > width || end.x > width) {
    width = Math.max(start.x, end.x);
  }

  if (start.y > height || end.y > height) {
    height = Math.max(start.y, end.y);
  }
});

const floor = generateMap(width, height);

lines.forEach((line) => {
  const points = getPoints(line);
  fillPoints(floor, points);
});

const overlapped = countOverlappedPoints(floor);

console.log({ overlapped });
