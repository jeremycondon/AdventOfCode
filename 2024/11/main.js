const puzzle = "77 515 6779622 6 91370 959685 0 9861".split(" ")

function blink(array) {
    let newArray = []
    array.forEach(element => {
        let numElement = parseInt(element)
        let strElement = numElement.toString()
        
        if (numElement == 0) {
            newArray.push(1)
        }
        else if (strElement.length %2 == 0) {
            newArray.push(strElement.substring(0, strElement.length/2))
            newArray.push(strElement.toString().substring(strElement.length/2, strElement.length))
        }
        else {
            newArray.push(numElement * 2024)
        }
    });
    return newArray
}

function blink2(obj) {
    let newObj = {}
    Object.keys(obj).forEach(key=> {
        let count = obj[key]
        let numElement = parseInt(key)
        let strElement = numElement.toString()
        
        if (numElement == 0) {
            if (!newObj[1]) newObj[1] = 0
            newObj[1] += count
            
        }
        else if (strElement.length %2 == 0) {
            let a = parseInt((strElement.substring(0, strElement.length/2)))
            let b = parseInt((strElement.toString().substring(strElement.length/2, strElement.length)))
            if (!newObj[a]) newObj[a] = 0
            if (!newObj[b]) newObj[b] = 0
            newObj[a] += count
            newObj[b] += count
        }
        else {
            if (!newObj[numElement * 2024]) newObj[numElement * 2024] = 0

            newObj[numElement * 2024] += count
        }

    });
    return newObj
}

function part1() {
    array = puzzle
    let blinks = 0
    for (let i = 0; i < 25; i++) {
        blinks++
        array = blink(array)
    }
    console.log(`PART 1 after ${blinks} blinks = ${array.length}`)
}

function part2() {
    array = {
        77: 1,
        515: 1,
        6779622: 1,
        6: 1,
        91370: 1,
        959685: 1,
        0: 1,
        9861:1 
    }
    let blinks = 0
    for (let i = 0; i < 75; i++) {
        blinks++
        array = blink2(array)
    }
    let total = 0
    Object.entries(array).forEach(([value, count]) => {
        total += count
    })
    console.log(`Part 2 total ${blinks} blinks = ${total}`)
}

function main() {
    part1() // 187738
    part2() // 223767210249237
}

main() 