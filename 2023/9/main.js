const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8').split('\n');
let total = 0;

function recurseArray(ary) {
    const diffs = []
    for (i = 1; i < ary.length; i++) {
        diffs.push(ary[i] - ary[i - 1])
    }
    if (diffs.filter(a => a != 0).length === 0) {
        return ary[ary.length - 1]
    }
    return ary[ary.length - 1] + recurseArray(diffs, ary[ary.length - 1]);
}

for (line in input) {
    const ary = input[line].split(' ').map(a => Number(a))
    total += recurseArray(ary)
}
console.log("Part 1: " + total)

total = 0
for (line in input) {
    const ary = input[line].split(' ').map(a => Number(a)).reverse()
    total += recurseArray(ary)
}
console.log("Part 2: " + total)
