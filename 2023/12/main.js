const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8').split('\n')

function matches(testString, counts) {
    let seenCounts = testString
        .split(/\.+/)
        .map((a) => a.length)
        .filter((a) => a != 0)

    if (counts.length != seenCounts.length) {
        return false
    }
    for (let i = 0; i < counts.length; i++) {
        if (counts[i] != seenCounts[i]) {
            return false
        }
    }
    return true;
}


function go(times = 1) {
    let total = 0;
    for (let i = 0; i < input.length; i++) {
        let [testString, counts] = input[i].split(' ')

        if (times > 1) {
            testString = [testString, testString, testString, testString, testString].join('?')
            counts = [counts, counts, counts, counts, counts].join(',')
        }
        counts = counts.split(',').map((a) => parseInt(a))

        let qCount = testString.split('').filter((a) => a === '?').length

        for (let i = 0; i < (1 << qCount); i++) {
            let sample = '';
            let seenQs = 0;
            for (let j = 0; j < testString.length; j++) {
                if (testString[j] === '?') {
                    const mask = 1 << seenQs;
                    if ((i & mask) != 0) {
                        sample += '#'
                    }
                    else {
                        sample += '.'
                    }
                    seenQs++
                }
                else {
                    sample += testString[j]
                }
            }
            if (matches(sample, counts)) {
                total += 1
            }
        }

    }
    console.log("Part 1: " + total)
}
go(1);