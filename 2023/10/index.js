const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8').split('\n').reverse() // y = 0 is bottom

let total = 0;
let startingPoint;

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
        this.isOuterLoop = true;
    }
    isEqual(otherCell) {
        return this.x == otherCell.x && this.y == otherCell.y
    }
}

const map = buildMap()

function buildMap() {
    const map = []
    for (line in input) {
        map[Number(line)] = input[line].split('').map((a, i) => {
            let cell = new Cell(a, i, Number(line))
            if (a === 'S') {
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
let moves = 0;

while (!startingPoint.isEqual(nextPoint)) {
    moves += 1
    let b = nextPoint.nextTile(nextPointStartLoc)
    nextPointStartLoc = b[0]
    nextPoint = b[1]
    nextPoint.setOuterLoop()
}
console.log("Part 1: " + Math.ceil(moves / 2))

