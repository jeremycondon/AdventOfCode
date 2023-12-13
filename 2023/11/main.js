const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8').split('\n')

let map = []

function invert(m) {
    return m.map((_, colIndex) => m.map(row => row[colIndex]));
}

function addRows(m) {
    let newArray = []
    for (let i = 0; i < m.length; i++) {
        if (!m[i].includes("#")) {
            newArray.push(m[i].map(a => 'd'))
        } else {
            newArray.push(m[i])
        }
    }
    return newArray
}

function readInput() {
    for (let i = 0; i < input.length; i++) {
        map.push(input[i].split(''))
    }
}

readInput();

map = addRows(map);
map = invert(map)
map = addRows(map);
map = invert(map)

function sumArray(ary, multiple = 2) {
    let doubles = ary.filter(a => a == 'd').length;
    return (doubles * multiple) + (ary.length - doubles)

}

function calculateDistance(point1, point2) {
    return Math.abs(point1.x - point2.x) + Math.abs(point1.y - point2.y)
}

function calc(multiple = 2) {

    let points = []
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[0].length; j++) {
            if (map[i][j] === '#') {
                let y = sumArray(map[i].slice(0, j), multiple)
                let x = sumArray(invert(map)[j].slice(0, i), multiple)
                let point = { x, y }
                points.push(point)
            }
        }
    }

    total = 0;
    let hit = {}
    for (let i = 0; i < points.length; i++) {
        for (let j = 0; j < points.length; j++) {
            if (hit[`${i} ${j}`]) {
                continue
            }
            total += calculateDistance(points[i], points[j])
            hit[`${i} ${j}`] = true
            hit[`${j} ${i}`] = true
        }
    }
    return total;
}
console.log("Part 1: " + calc(2))
console.log("Part 2: " + calc(1000000))
