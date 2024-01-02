const fs = require('fs');
const finput = fs.readFileSync('input.txt', 'utf8').split('\n')

function hash(s) {
    let h = 0;
    for (let i = 0; i < s.length; i++) {
        h += s.charCodeAt(i)
        h *= 17
        h %= 256
    }
    return h
}

function go(strings) {
    let total = strings.reduce((a, b) => a + hash(b), 0)
    return total
}

function part2(strings) {
    let buckets = {}
    for (let i = 0; i < strings.length; i++) {
        let [h, inst] = strings[i].split(/[=,-]/)
        let hashVal = hash(h)
        if (!inst) {
            if (buckets[hashVal]) {
                buckets[hashVal] = buckets[hashVal].filter((a) => a.key != h)
            }
        }
        else {
            if (!buckets[hashVal]) {
                buckets[hashVal] = []
            }
            let found = false;
            buckets[hashVal] = buckets[hashVal].map((a) => {
                if (a.key != h) return a
                else {
                    found = true;
                    return { key: h, value: inst }
                }
            })
            if (!found) {
                buckets[hashVal].push({ key: h, value: inst })
            }
        }
    }
    let keys = Object.keys(buckets)
    let total = 0;
    for (let i = 0; i < keys.length; i++) {
        for (let j = 0; j < buckets[keys[i]].length; j++) {
            let bucketNum = Number(keys[i]) + 1
            let inst = buckets[keys[i]][j].value
            let slot = j + 1
            total += bucketNum * inst * slot
        }
    }
    return total
}

console.log("Part 1: " + go(finput[0].split(',')))
console.log("Part 2: " + part2(finput[0].split(',')))
