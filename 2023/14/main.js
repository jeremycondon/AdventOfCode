const { dir } = require('console');
const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8').split('\n')

let input2 = [
    "O....#....",
    "O.OO#....#",
    ".....##...",
    "OO.#O....O",
    ".O.....O#.",
    "O.#..O.#.#",
    "..O..#O..O",
    ".......O..",
    "#....###..",
    "#OO..#....",
]

function invert(map) {
    let newMap = []
    for (let i = 0; i < map.length; i++) {
        newMap.push('')
    }
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map.length; j++) {
            newMap[j] += map[i][j]
        }
    }
    return newMap
}

function rollRocks(map, direction = 'forward') {
    let newMap = []


    for (let i = 0; i < map.length; i++) {
        if (direction != 'forward') {
            map[i] = map[i].split('').reverse().join('')
        }
        let parts = map[i].trim().split('#')
        // console.log(parts)
        // console.log("'" + map[i] + "'  " + parts.length + " parts" + " " + parts.join('"    '))
        let newLine = []
        for (let j = 0; j < parts.length; j++) {
            // if (parts[j] === '') newLine += '#';
            let rocks = parts[j].split('').filter(p => p == 'O')
            let spaces = parts[j].split('').filter(p => p == '.')
            newLine.push(rocks.join('') + spaces.join(''))
            // console.log("dadding line " + newLine)
            // newLine.length = 
        }
        newLine = newLine.join('#')
        // console.log(newLine)
        if (direction != 'forward') {
            // map[i] = map[i].split('').reverse().join('')
            newMap.push(newLine.split('').reverse().join(''))
        } else {
            newMap.push(newLine)

        }

    }

    return newMap
}


function calculate(map) {
    let timeStarted = Date.now()


    let total = 0;
    let reversedRolled = map.slice(0).reverse()
    for (let i = 0; i < reversedRolled.length; i++) {
        total += reversedRolled[i].split('').filter(a => a == 'O').length * (i + 1)
    }
    // console.log('took ' + (Date.now() - timeStarted) + 'ms')
    // console.log(total)
    return total
}

function go() {
    let invertedRolled = rollRocks(invert(input))
    let rolled = invert(invertedRolled)
    console.log(rolled.join('\n'))
    calculate(rolled)
}

function print(map) {
    // console.log(map.join('\n'))
    // console.log("=====================================")
}

function go2() {
    let rolled = input
    seenState = {}
    for (let i = 0; i < 1000; i++) {
        let preCycle = JSON.stringify(rolled)
        // north
        rolled = rollRocks(invert(rolled))
        rolled = invert(rolled)

        // console.log("NORTH POST")
        print(rolled)

        // west
        rolled = rollRocks(rolled)
        // console.log("WEST")
        print(rolled)



        // south
        // console.log("SOUTH PRE")
        print(invert(rolled))
        rolled = rollRocks(invert(rolled), 'backwards')
        rolled = invert(rolled) // rotate back
        // console.log("SOUTH")
        print(rolled)

        // east
        rolled = rollRocks(rolled, 'backwards')
        // console.log("EAST POST")
        print(rolled)



        if (preCycle == JSON.stringify(rolled)) {
            console.log("CYCLE UNCHANGED" + i + " times")
            break;
        }
        if (seenState[JSON.stringify(rolled)]) {
            // console.log("CYCLE UNCHANGED SEEN IT" + i + " times")
            // console.log(seenState[rolled])
            // console.log(Object.keys(seenState).length)
            seenState[JSON.stringify(rolled)].i.push(i)
            // break;
        } else {
            seenState[JSON.stringify(rolled)] = { weight: calculate(rolled), i: [i] }
        }
        if (i % 100 == 0) {
            console.log("CYCLE CHANGED " + i + " times")
            console.log(calculate(rolled))

        }
        if (i % 1000 == 0) {
            console.log("CYCLE CHANGED " + i + " times")
            console.log(calculate(rolled))
            console.log(rolled.join('\n'))

        }


        // console.log(rolled.join('\n'))
    }
    // console.log(seenState)

    Object.keys(seenState).forEach((key) => {
        // console.log(seenState[key].weight.join(', ') + "  :  " + seenState[key].i.join(', '))
        let mod1m = seenState[key].i.map(a => a % 1000000000)
        // console.log("KEY WIEIGHT: " + seenState[key].weight)
        // console.log(mod1m)
        for (let i = 0; i < seenState[key].i.length - 1; i++) {
            if ((1000000000 + 100) % 84  seenState[key].i[i] == 0) {
        console.log("ITS THIS ONE" + seenState[key].i[i], seenState[key].weight)
    }
}

        // first hit is @ 100, period is 84... so...
        // 1000000000 % 84 == 16
    })


console.log(calculate(rolled))

}
// 1,000,000,000
// console.log(go())
// correct: 113525

console.log(go2())
// 101292!! Just right!!  159, or (((1000000000 - 100) % 84) + 100) - 1
//              101310 high
// p2, too high 101398