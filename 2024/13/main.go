package main

import (
	_ "embed"
	"fmt"
	"math"
	"regexp"
	"strconv"
	"strings"
)

//go:embed data.txt
var s string

type pair struct {
	a int
	b int
}

func calculateValues(a, b, total int) []pair {
	// for true {
	// a cost 3x
	// fmt.Printf("B attempt for %d , %d = %d\n", a, b, total)

	bAttempt := int(total / b) // floored
	// if bAttempt > 100 {
	// 	bAttempt = 100
	// }

	hits := make([]pair, 0)
	for ; bAttempt >= 0; bAttempt-- {
		if (total-(bAttempt*b))%a == 0 {
			// fmt.Printf("HIT AT B %d\n", bAttempt)
			aAttempt := int((total - (bAttempt * b)) / a)
			// if aAttempt <= 100 {
			hits = append(hits, pair{aAttempt, bAttempt})
			// }
		}
	}

	// fmt.Printf("B attempt for %d / %d = %d\n", total, b, bAttempt)
	// }
	return hits
}

// Button A: X+15, Y+61
// Button B: X+66, Y+12
// Prize: X=1100, Y=4824
func makeGraph() {
	// nodes := make()
	lines := strings.Split(s, "\n")
	buttonLoc := regexp.MustCompile(`Button [AB]: X\+(\d+), Y\+(\d+)`)
	priceLoc := regexp.MustCompile(`Prize: X=(\d+), Y=(\d+)`)
	total := 0
	for i := 0; i < len(lines); i += 4 {
		a := buttonLoc.FindStringSubmatch(lines[i])
		b := buttonLoc.FindStringSubmatch(lines[i+1])
		c := priceLoc.FindStringSubmatch(lines[i+2])

		aX, _ := strconv.Atoi(a[1])
		bX, _ := strconv.Atoi(b[1])
		totalX, _ := strconv.Atoi(c[1])
		aY, _ := strconv.Atoi(a[2])
		bY, _ := strconv.Atoi(b[2])
		totalY, _ := strconv.Atoi(c[2])
		// fmt.Printf("Checking %d, %d, %d %v\n", aX, bX, totalX, a)

		s1 := calculateValues(aX, bX, totalX)
		s2 := calculateValues(aY, bY, totalY)

		for _, x := range s1 {
			for _, y := range s2 {
				if x.a == y.a && x.b == y.b {
					// fmt.Printf("SOLUTION %v %v\n", x, y)
					// fmt.Printf("WINNER!!\n")
					total += (x.a * 3) + y.b
				}
			}
		}

	}
	fmt.Printf("Part 1: %d\n", total)
}

func makeGraph2() {
	// nodes := make()
	lines := strings.Split(s, "\n")
	buttonLoc := regexp.MustCompile(`Button [AB]: X\+(\d+), Y\+(\d+)`)
	priceLoc := regexp.MustCompile(`Prize: X=(\d+), Y=(\d+)`)
	total := 0
	for i := 0; i < len(lines); i += 4 {
		a := buttonLoc.FindStringSubmatch(lines[i])
		b := buttonLoc.FindStringSubmatch(lines[i+1])
		c := priceLoc.FindStringSubmatch(lines[i+2])

		caX, _ := strconv.Atoi(a[1])
		caY, _ := strconv.Atoi(b[1])
		ctotalX, _ := strconv.Atoi(c[1])
		ctotalX += 10000000000000

		cbX, _ := strconv.Atoi(a[2])
		cbY, _ := strconv.Atoi(b[2])
		ctotalY, _ := strconv.Atoi(c[2])
		ctotalY += 10000000000000

		// yes I transposed these, seems like the easiest place
		aX := float64(caX)
		aY := float64(caY)
		totalA := float64(ctotalX)
		bX := float64(cbX)
		bY := float64(cbY)
		totalB := float64(ctotalY)

		fmt.Printf("Checking %f, %f, %f %v\n", aX, bX, totalA, a)

		// Button A: X+94, Y+34
		// Button B: X+22, Y+67
		// -(aX / aY) / (totalX/aY) 8400 5400
		// WORKS.. mostly...
		// sTotal := (totalA / aY) - (totalB / bY)
		// nA := sTotal / ((aX / aY) - (bX / bY))
		// fmt.Printf("COMP %f, %f, %f, %f\n", aX, aY, bX, bY)
		// nB := (totalA - (aX * nA)) / aY
		// fmt.Printf("NAA NBB %f, %f (%v, %v) %f \n", nA, nB, aX, aY, sTotal)

		// // make everyone ints
		// test1 := int(math.Round(nA))*int(math.Round(aX)) + int(math.Round(nB))*int(math.Round(aY))
		// test2 := int(math.Round(nA))*int((math.Round(bX))) + int(math.Round(nB))*int(math.Round(bY))

		sTotal := (totalA / aY) - (totalB / bY)
		nA := math.Round(sTotal / ((aX / aY) - (bX / bY)))
		fmt.Printf("COMP %f, %f, %f, %f\n", aX, aY, bX, bY)
		nB := math.Round((totalA - (aX * nA)) / aY)
		fmt.Printf("NAA NBB %f, %f (%v, %v) %f \n", nA, nB, aX, aY, sTotal)

		// make everyone ints
		test1 := int(nA)*caX + int(nB)*caY
		test2 := int(nA)*cbX + int(nB)*cbY

		// if nA*aX+nB*aY == totalA &&
		// 	nA*bX+nB*bY == totalB {
		if test1 == ctotalX && test2 == ctotalY { //||
			// (int(nA*aX+nB*aY) == ctotalX && int(nA*bX+nB*bY) == ctotalY) {
			// fmt.Printf("match\n\n")
			total += (int(nA) * 3) + int(nB)

		} else {
			fmt.Printf(">>> %d, %d, %d\n>>> %d, %d, %d\n\n", int(nA), int(aX), ctotalX, int(nB), int(bX), int(bY))
			fmt.Printf("I HATE YOU %d, %d, %d, %d \n", test1, test2, ctotalX, ctotalY)
			fmt.Printf("%v== %v  and %v == %v  \n", nA*aX+nB*aY, totalA, nA*bX+nB*bY, totalB)
			fmt.Printf("fail   %f, %f, %f, %f, %f, %f\n\n", nA, aX, nB*bX, totalA, nA*aY+nB*bY, totalB)
		}
		// if nA == float64(int64(nA)) && nB == math.Trunc((nB)) {
		// 	total += int(nA)*3 + int(nB)
		// } else {
		// 	fmt.Printf("no eq %f, %f, %f, %f\n", nA, float64(int64(nA)), nB, math.Trunc((nB)))
		// }
	}
	fmt.Printf("Part 2: %d\n", total)
}

func main() {

	makeGraph2()
	// makeGraph()
}

// 3 tokens for A
// 1 token for B

//			  X*A + X*B = C
// solution = 15a + 66b = 1100 (where a is min or 3x less...)
// AND
//
// could look at MAX B > B*99 that has a remainder that is A*something
// For each of those, do any Y values work...
