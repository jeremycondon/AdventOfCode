// read all the lines from input.txt

const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8').split('\n');

let total = 0;
let scores = [];
let copies = [];
for (i = 0; i < 210; i++) {
    copies[i] = 1;
}
for (line in input) {
    const [wins, card] = input[line].substring(9).split('|');
    const winArr = wins.trim().split(/\s+/);
    const cardArr = card.trim().split(/\s+/);

    hit = 0;

    for (let j = 0; j < cardArr.length; j++) {
        for (let i = 0; i < winArr.length; i++) {
            if (winArr[i] === cardArr[j]) {
                console.log("Hit " + winArr[i] + " with " + cardArr[j] + " " + hit)
                hit++;
            }
        }
    }
    if (hit > 0) {
        total += 1 << (hit - 1);
        scores.push(1 << (hit - 1));
    } else {
        scores.push(0);
    }

    for (let i = 0; i < hit; i++) {
        lineToIncrease = Number(line) + Number(i) + Number(1);
        if (copies[lineToIncrease] == undefined) {
            copies[lineToIncrease] = 0;
        }
        copies[lineToIncrease] += copies[Number(line)];
    }
}

total = 0;
for (let i = 0; i < scores.length; i++) {
    // total += scores[i]
    // if (copies[i] > 0) {
    total += copies[i];
    // }
}

console.log(total)
console.log(scores)
console.log(copies)
