// Time:        53     83     72     88
// Distance:   333   1635   1289   1532

const { setUncaughtExceptionCaptureCallback } = require("process");

const times = [53, 83, 72, 88];
const dists = [333, 1635, 1289, 1532];


function calcMinSpeed(time, dist) {
    return Math.ceil(dist / time);
}

function calcMaxSpeed(time, dist) {
    return dist / (time - 1);
}

function calculateLn10() {
    return Math.log(10);
}

total = 1;
for (let i = 0; i < times.length; i++) {
    minSpeed = calcMinSpeed(times[i], dists[i])
    let successes = 0
    let lapTime = times[i]
    for (let j = minSpeed; j < times[i]; j++) {
        let chargeTime = j
        let remainingTime = lapTime - chargeTime
        if (j * remainingTime > dists[i]) {
            successes++
        }
    }
    total *= successes
}
console.log(total)

newTotal = 1;
for (let i = 0; i < times.length; i++) {
    let minSpeed = Math.ceil((times[i] - Math.sqrt(times[i] * times[i] - 4 * dists[i])) / 2)
    let maxSpeed = Math.ceil((times[i] + Math.sqrt(times[i] * times[i] - 4 * dists[i])) / 2)
    newTotal *= maxSpeed - minSpeed
}
console.log(newTotal)