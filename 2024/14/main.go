package main

// 101 wide
// 103 tall

import (
	_ "embed"
	"fmt"
	"regexp"
	"strconv"
	"strings"
)

//go:embed data.txt
var s string

func mod(a, b int) int {
	return (a%b + b) % b
}

func part2() {
	for x := 1000; x < 10000; x++ {

		site := make([][]string, 103)
		for i := 0; i < 103; i++ {
			site[i] = make([]string, 130)
			for j := 0; j < 103; j++ {
				site[i][j] = " "
			}
		}

		for _, line := range strings.Split(s, "\n") {

			// p=43,88 v=84,88
			priceLoc := regexp.MustCompile(`p=(-?\d+),(-?\d+) v=(-?\d+),(-?\d+)`)
			a := priceLoc.FindStringSubmatch(line)
			// fmt.Printf("%v", a)
			startX, _ := strconv.Atoi(a[1])
			startY, _ := strconv.Atoi(a[2])
			vX, _ := strconv.Atoi(a[3])
			vY, _ := strconv.Atoi(a[4])

			// fmt.Printf("%d %d\n", vX, vY)

			positionX := mod((startX + (vX * x)), 101)
			positionY := mod((startY + (vY * x)), 103)
			site[positionX][positionY] = "*"
		}

		// fmt.Printf("\n\nX=%d\n", x)
		maybeHit := false
		inArow := 0
		for i := 0; i < 103; i++ {
			for j := 0; j < 103; j++ {
				// fmt.Printf("%s", site[i][j])
				if site[i][j] == " " {
					inArow = 0
				} else {
					inArow++
				}
				if inArow > 5 {
					maybeHit = true
				}
			}
			// fmt.Printf("|\n")
		}
		if maybeHit {
			fmt.Printf("\n\nX=%d\n", x)

			for i := 0; i < 103; i++ {
				for j := 0; j < 103; j++ {
					fmt.Printf("%s", site[i][j])
				}
				fmt.Printf("|\n")
			}
		}
	}

}

func main() {
	q1 := 0
	q2 := 0
	q3 := 0
	q4 := 0
	times := 100

	for _, line := range strings.Split(s, "\n") {

		// p=43,88 v=84,88
		priceLoc := regexp.MustCompile(`p=(-?\d+),(-?\d+) v=(-?\d+),(-?\d+)`)
		a := priceLoc.FindStringSubmatch(line)
		fmt.Printf("%v", a)
		startX, _ := strconv.Atoi(a[1])
		startY, _ := strconv.Atoi(a[2])
		vX, _ := strconv.Atoi(a[3])
		vY, _ := strconv.Atoi(a[4])

		fmt.Printf("%d %d\n", vX, vY)

		positionX := mod((startX + (vX * times)), 101)
		positionY := mod((startY + (vY * times)), 103)

		if positionX > 50 && positionY > 51 {
			q4 += 1
		}
		if positionX < 50 && positionY > 51 {
			q3 += 1
		}
		if positionX < 50 && positionY < 51 {
			q2 += 1
		}
		if positionX > 50 && positionY < 51 {
			q1 += 1
		}
	}
	fmt.Printf("Part 1: %d\n", q1*q2*q3*q4) // 93387684 low
	part2()
	// 84565572 lower
	// 59933952 even lower
}
