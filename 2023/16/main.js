const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8').split('\n').reverse() // 0 is botton for `y`


const touched = {} // { 'x,y': {from: direction} }

const map = []

for (let y = 0; y < input.length; y++) {
    map.push([])
    for (let x = 0; x < input[y].length; x++) {

        map[y][x] = input[y][x]
    }
}

// map.length = 5
console.log(map)
// from top left moving right

let initialStart = { x: -1, y: map.length - 1 }
console.log(initialStart)
console.log(map[initialStart.y][initialStart.x])

function checkBounds(x, y) {
    if (x < 0 || y < 0 || x >= map[0].length || y >= map.length) {
        return true
    }
    return false
}
function handleMoveFromDirection(start, direction) {
    let x = start.x
    let y = start.y
    while (true) {
        if (direction == 'up') {
            y--
        }
        else if (direction == 'down') {
            y++
        }
        else if (direction == 'left') {
            x--
        }
        else if (direction == 'right') {
            x++
        }

        if (checkBounds(x, y)) {
            return;
        }
        console.log(`Moving from ${x},${y} in direction ${direction}`)
        // console.log(map[y][x])
        // console.log(touched)

        let cached = touched[`${x},${y}`]
        if (!cached) touched[`${x},${y}`] = {}
        cached = touched[`${x},${y}`]
        if (cached[direction] == true) {
            return;
        }


        touched[`${x},${y}`][direction] = true


        switch (map[y][x]) {
            case '|':

                return;
                if (direction == 'up' || direction == 'down') {
                    if (direction == 'up') {
                        handleMoveFromDirection({ x, y: y - 1 }, "down")
                    }
                    else if (direction == 'down') {
                        handleMoveFromDirection({ x, y: y + 1 }, "up")
                    }
                    return
                }
                handleMoveFromDirection({ x, y: y - 1 }, "down")
                handleMoveFromDirection({ x, y: y + 1 }, "up")
                break;
            case '-':
                if (direction == 'left' || direction == 'right') {
                    if (direction == 'left') {
                        handleMoveFromDirection({ x: x - 1, y }, "right")
                    }
                    else if (direction == 'right') {
                        handleMoveFromDirection({ x: x + 1, y }, "left")
                    }
                    return
                }
                handleMoveFromDirection({ x: x - 1, y }, "right")
                handleMoveFromDirection({ x: x + 1, y }, "left")
                break;
            case '/':
                if (direction == 'up') {
                    handleMoveFromDirection({ x: x - 1, y }, "right")
                }
                else if (direction == 'down') {
                    handleMoveFromDirection({ x: x + 1, y }, "left")
                }
                else if (direction == 'left') {
                    handleMoveFromDirection({ x, y: y - 1 }, "down")
                }
                else if (direction == 'right') {
                    handleMoveFromDirection({ x, y: y + 1 }, "up")
                }
                break;
            case '\\':
                if (direction == 'up') {
                    handleMoveFromDirection({ x: x + 1, y }, "left")
                }
                else if (direction == 'down') {
                    handleMoveFromDirection({ x: x - 1, y }, "right")
                }
                else if (direction == 'left') {
                    handleMoveFromDirection({ x, y: y + 1 }, "up")
                }
                else if (direction == 'right') {
                    handleMoveFromDirection({ x, y: y - 1 }, "down")
                }
                break;
            case '.':
                if (direction == 'up') {
                    handleMoveFromDirection({ x, y: y - 1 }, "down")
                }
                else if (direction == 'down') {
                    handleMoveFromDirection({ x, y: y + 1 }, "up")
                }
                else if (direction == 'left') {
                    handleMoveFromDirection({ x: x - 1, y }, "right")
                }
                else if (direction == 'right') {
                    handleMoveFromDirection({ x: x + 1, y }, "left")
                }
        }
    }
}

function go() {
    const pointsToCheck = [initialStart]
    handleMoveFromDirection(initialStart, 'right')
    // for (; pointsToCheck.length > 0;) {
    //     let point = pointsToCheck.pop()
    //     let points = handleMoveFromDirection(point, 'right')
    //     if (points) {
    //         pointsToCheck.push(...points)
    //     }
    // }
    console.log(touched)
    console.log(Object.keys(touched))
    console.log(Object.keys(touched).length)
}

go()

// 11256 too high...