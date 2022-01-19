import fs from "fs";

const collectBinaryCounts = (binaryList) => {
  const counts = [];
  for (let i = 0; i < binaryList[0].length; i++) {
    counts.push({
      1: 0,
      0: 0,
    });
  }

  for (let i = 0; i < binaryList.length; i++) {
    for (let j = 0; j < binaryList[i].length; j++) {
      const digit = binaryList[i][j];
      counts[j][digit] += 1;
    }
  }
  return counts;
};

const input = fs.readFileSync("input").toString();

const binaries = input.split("\r\n");
const counts = collectBinaryCounts(binaries);

let gammaRateBinary = "";
let epsilonRateBinary = "";

counts.forEach((count) => {
  gammaRateBinary += count["0"] > count["1"] ? "0" : "1";
  epsilonRateBinary += count["0"] > count["1"] ? "1" : "0";
});

const gammaRate = parseInt(gammaRateBinary, 2);
const epsilonRate = parseInt(epsilonRateBinary, 2);

console.log("Consumption Rate: ", gammaRate * epsilonRate);

let filtered = binaries;

for (let i = 0; i < counts.length; i++) {
  const c = collectBinaryCounts(filtered);
  const matchDigit = c[i]["0"] > c[i]["1"] ? "0" : "1";
  filtered = filtered.filter((binary) => binary[i] === matchDigit);

  if (filtered.length === 1) {
    break;
  }
}

const oxygenGeneratorRating = parseInt(filtered[0], 2);

filtered = binaries;
for (let i = 0; i < counts.length; i++) {
  const c = collectBinaryCounts(filtered);
  const matchDigit = c[i]["0"] <= c[i]["1"] ? "0" : "1";
  filtered = filtered.filter((binary) => binary[i] === matchDigit);

  if (filtered.length === 1) {
    break;
  }
}

const co2ScrubberRating = parseInt(filtered[0], 2);

console.log("Life Support: ", oxygenGeneratorRating * co2ScrubberRating);
