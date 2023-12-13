const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8').split('\n').reverse() // y = 0 is bottom

let total = 0;
let startingPoint;

let outerLoopPoints = [];
let outsidePoints = {};

class Cell {
    constructor(type, x, y) {
        this.type = type
        this.x = x
        this.y = y
    }

    nextTile(source) {
        let retVal;
        switch (this.type) {
            case '|':
            case "S":
                //             coming from, positionInNext Cell, next cell
                retVal = source == "down" ? ["down", map[this.x][this.y + 1]] : ["up", map[this.x][this.y - 1]]; break;
            case '-':
                retVal = source == "left" ? ["left", map[this.x + 1][this.y]] : ["right", map[this.x - 1][this.y]]; break;
            case 'L':
                retVal = source == "up" ? ["left", map[this.x + 1][this.y]] : ["down", map[this.x][this.y + 1]]; break;
            case 'J':
                retVal = source == "up" ? ["right", map[this.x - 1][this.y]] : ["down", map[this.x][this.y + 1]]; break;
            case '7':
                retVal = source == "down" ? ["right", map[this.x - 1][this.y]] : ["up", map[this.x][this.y - 1]]; break;
            case 'F':
                retVal = source == "down" ? ["left", map[this.x + 1][this.y]] : ["up", map[this.x][this.y - 1]]; break;

        }
        return retVal
    }
    setOuterLoop() {
        if (this._isOuterLoop) return;
        this._isOuterLoop = true;
        outerLoopPoints.push(this)
    }
    isOuterLoop() {
        return this._isOuterLoop
    }
    isEqual(otherCell) {
        return this.x == otherCell.x && this.y == otherCell.y
    }
    toString() {
        return `${this.x} ${this.y}`
    }
}

function renderMap(m) {
    for (let i = 0; i < m.length; i++) {
        let line = ''
        let y = m.length - i - 1;
        for (let j = 0; j < m[i].length; j++) {
            let x = j
            if (m[x][y].isOuterLoop() && m[x][y].type == ' ') {
                type = '?'
            }
            line += m[x][y].type;
        }
        console.log(line);
    }
}

let map = buildMap()
function buildMap() {
    const map = []
    for (line in input) {
        map[Number(line)] = input[line].split('').map((a, i) => {
            let cell = new Cell(a, i, Number(line))
            if (a === 'S') {
                cell.type = "|"
                startingPoint = cell;
            }
            return cell
        })
    }
    return map.map((_, colIndex) => map.map(row => row[colIndex]));
    ;
}



let [nextPointStartLoc, nextPoint] = startingPoint.nextTile('up')
startingPoint.setOuterLoop()
nextPoint.setOuterLoop()

let moves = 0;

while (!startingPoint.isEqual(nextPoint)) {
    moves += 1
    let b = nextPoint.nextTile(nextPointStartLoc)
    nextPointStartLoc = b[0]
    nextPoint = b[1]
    nextPoint.setOuterLoop()
}
console.log("Part 1: " + Math.ceil(moves / 2))

// start at the borders (top, left, bottom, right) and 
// generationally iterate until no points remain


function buildBigMap(map) {
    const newMap = [];
    map[startingPoint.x][startingPoint.y].type = '|'
    for (let x = 0; x < map[0].length; x++) {
        newMap[x * 2] = []
        newMap[x * 2 + 1] = []
        for (let y = 0; y < map.length; y++) {
            let cell = map[x][y]
            if (!cell.isOuterLoop() && cell.type != ' ') {
                cell.type = '.';
                cell._isOuterLoop = false;
            }
            cell.x = cell.x * 2
            cell.y = cell.y * 2

            newMap[x * 2][y * 2] = cell

            // x and x + 1
            let nextXVal = ' '
            if (x < map[0].length - 1) {
                let nextCell = map[x + 1][y];
                if (cell.type == 'L' && (nextCell.type == '-' || nextCell.type == 'J' || nextCell.type == '7')) {
                    nextXVal = '-'
                }
                if (cell.type == 'F' && (nextCell.type == '-' || nextCell.type == 'J' || nextCell.type == '7')) {
                    nextXVal = '-'
                }
                if (cell.type == '-' && (nextCell.type == '-' || nextCell.type == 'J' || nextCell.type == '7')) {
                    nextXVal = '-'
                }
            }
            // in between X and X+1
            newMap[x * 2 + 1][y * 2] = new Cell(nextXVal, x * 2 + 1, y * 2)
            if (nextXVal == '-') newMap[x * 2 + 1][y * 2].setOuterLoop()

            // in between Y and Y + 1
            nextYVal = ' '
            if (y < map.length - 1) {
                let nextCell = map[x][y + 1];
                if ((cell.type == '|' || cell.type == "S") && (nextCell.type == 'F' || nextCell.type == '7' || nextCell.type == '|')) {
                    nextYVal = '|'
                }
                if (cell.type == 'L' && (nextCell.type == 'F' || nextCell.type == '7' || nextCell.type == '|')) {
                    nextYVal = '|'
                }
                if (cell.type == 'J' && (nextCell.type == 'F' || nextCell.type == '7' || nextCell.type == '|')) {
                    nextYVal = '|'
                }
            }
            newMap[x * 2][y * 2 + 1] = new Cell(nextYVal, x * 2, y * 2 + 1)
            if (nextYVal == '|') newMap[x * 2][y * 2 + 1].setOuterLoop()

            // ... nothing...
            newMap[x * 2 + 1][y * 2 + 1] = new Cell(' ', x * 2 + 1, y * 2 + 1)
        }
    }


    return newMap
}

const newMap = buildBigMap(map);

map = newMap

let pointsToCheck = []
let length = map[0].length
let width = map.length

for (let i = 0; i < map.length; i++) {
    pointsToCheck.push(map[0][i])
    pointsToCheck.push(map[i][0])
    pointsToCheck.push(map[0][length - 1])
    pointsToCheck.push(map[width - 1][0])
}

function checkNeighbors(point) {
    let left = `${point.x - 1} ${point.y}`
    let right = `${point.x + 1} ${point.y}`
    let down = `${point.x} ${point.y - 1}`
    let up = `${point.x} ${point.y + 1}`

    let lu = `${point.x - 1} ${point.y - 1}`
    let ru = `${point.x + 1} ${point.y + 1}`
    let ld = `${point.x - 1} ${point.y - 1}`
    let rd = `${point.x + 1} ${point.y + 1}`

    if (point.x > 0 && !outsidePoints[left]) {
        pointsToCheck.push(map[point.x - 1][point.y])
    }
    if (point.x < length - 1 && !outsidePoints[right]) {
        pointsToCheck.push(map[point.x + 1][point.y])
    }
    if (point.y > 0 && !outsidePoints[down]) {
        pointsToCheck.push(map[point.x][point.y - 1])
    }
    if (point.y < length - 1 && !outsidePoints[up]) {
        pointsToCheck.push(map[point.x][point.y + 1])
    }

    if (point.x > 0 && !outsidePoints[lu] && point.y > 0) {
        pointsToCheck.push(map[point.x - 1][point.y - 1])
    }
    if (point.x < length - 1 && !outsidePoints[ru] && point.y < length - 1) {
        pointsToCheck.push(map[point.x + 1][point.y + 1])
    }
    if (point.y > 0 && !outsidePoints[ld] && point.x > 0) {
        pointsToCheck.push(map[point.x - 1][point.y - 1])
    }
    if (point.y < length - 1 && !outsidePoints[rd] && point.x < length - 1) {
        pointsToCheck.push(map[point.x + 1][point.y + 1])
    }
}

let i = 0;
while (pointsToCheck.length > 0) {
    i++

    let point = pointsToCheck.pop()
    outsidePoints[point.toString()] = true

    if (point.isOuterLoop() || (point.type != ' ' && point.type != '.')) {
        continue
    }
    if (point.type != ' ' && point.type != '.' && point.type != 'x' && point.isOuterLoop() == false) {
        point.type = '?'
        return
    }
    outsidePoints[point.toString()] = true
    checkNeighbors(point)
    point.type = ' '
}

// renderMap(map)

let dotCount = 0;
for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
        if (map[i][j].type == '.') dotCount++
    }
}
console.log("PART 2: " + dotCount)

return
