import fs from "fs";

const input = fs.readFileSync("input").toString();

const depths = input.split("\r\n").map((depthStr) => +depthStr);

const windows = [];

for (let i = 0; i < depths.length; i++) {
  if (depths[i + 1] === undefined || depths[i + 2] === undefined) {
    break;
  }

  windows.push(depths[i] + depths[i + 1] + depths[i + 2]);
}

let increased = 0;

for (let i = 1; i < windows.length; i++) {
  const current = windows[i];
  const previous = windows[i - 1];

  if (current > previous) {
    increased++;
  }
}

console.log(increased);
