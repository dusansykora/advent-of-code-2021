import fs from "fs";

const input = fs.readFileSync("input").toString();

const commands = input.split("\r\n").map((command) => {
  const [direction, value] = command.split(" ");

  return {
    direction,
    value: +value,
  };
});

let position = 0;
let depth = 0;
let aim = 0;

commands.forEach((command) => {
  switch (command.direction) {
    case "forward":
      position += command.value;
      depth += aim * command.value;
      break;
    case "down":
      aim += command.value;
      break;
    case "up":
      aim -= command.value;
      break;
  }
});

console.log(position * depth);
