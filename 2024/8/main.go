package main

import (
	_ "embed"
	"fmt"
	"strconv"
	"strings"
)

//go:embed data.txt
var s string

type coord struct {
	x int
	y int
}

func buildLabMap() map[string][]coord {
	LabMap := make(map[string][]coord)

	lines := strings.Split(s, "\n")

	for y, value := range lines {
		for x := 0; x < len(value); x++ {
			if value[x] != '.' {
				key := string(value[x])
				_, ok := LabMap[key]
				if !ok {
					LabMap[key] = make([]coord, 0)
				}
				LabMap[key] = append(LabMap[key], coord{x, y})

			}
		}
	}
	return LabMap
}

func inBounds(c coord) bool {
	if c.x >= 0 && c.y >= 0 && c.x < 50 && c.y < 50 {
		return true
	}
	return false
}

func samePoint(a coord, b coord) bool {
	return a.x == b.x && a.y == b.y
}

func applyDistances(resultMap map[string]int, coords []coord) {
	if len(coords) == 1 {
		return
	}
	for i := 1; i < len(coords); i++ {
		b := coords[0]
		a := coords[i]
		dX := a.x - b.x
		dY := a.y - b.y

		newPoint1 := coord{b.x + dX, b.y + dY}
		newPoint2 := coord{b.x - dX, b.y - dY}
		newPoint3 := coord{a.x + dX, a.y + dY}
		newPoint4 := coord{a.x - dX, a.y - dY}

		if inBounds(newPoint1) && !samePoint(newPoint1, a) && !samePoint(newPoint1, b) {
			resultMap[strconv.Itoa(newPoint1.x)+","+strconv.Itoa(newPoint1.y)] = 1
		}
		if inBounds(newPoint2) && !samePoint(newPoint2, a) && !samePoint(newPoint2, b) {
			resultMap[strconv.Itoa(newPoint2.x)+","+strconv.Itoa(newPoint2.y)] = 1
		}
		if inBounds(newPoint3) && !samePoint(newPoint3, a) && !samePoint(newPoint3, b) {
			resultMap[strconv.Itoa(newPoint3.x)+","+strconv.Itoa(newPoint3.y)] = 1
		}
		if inBounds(newPoint4) && !samePoint(newPoint4, a) && !samePoint(newPoint4, b) {
			resultMap[strconv.Itoa(newPoint4.x)+","+strconv.Itoa(newPoint4.y)] = 1
		}
	}
	applyDistances(resultMap, coords[1:])

}
func applyDistances2(resultMap map[string]int, coords []coord) {
	if len(coords) == 1 {
		return
	}

	for i := 1; i < len(coords); i++ {
		b := coords[0]
		a := coords[i]
		dX := a.x - b.x
		dY := a.y - b.y

		newPoint1 := coord{b.x + dX, b.y + dY}
		newPoint2 := coord{b.x - dX, b.y - dY}
		newPoint3 := coord{a.x + dX, a.y + dY}
		newPoint4 := coord{a.x - dX, a.y - dY}

		for inBounds(newPoint1) {
			resultMap[strconv.Itoa(newPoint1.x)+","+strconv.Itoa(newPoint1.y)] = 1
			newPoint1.x += dX
			newPoint1.y += dY
		}
		for inBounds(newPoint2) {
			resultMap[strconv.Itoa(newPoint2.x)+","+strconv.Itoa(newPoint2.y)] = 1
			newPoint2.x -= dX
			newPoint2.y -= dY
		}
		for inBounds(newPoint3) {
			resultMap[strconv.Itoa(newPoint3.x)+","+strconv.Itoa(newPoint3.y)] = 1
			newPoint3.x += dX
			newPoint3.y += dY
		}
		for inBounds(newPoint4) {
			resultMap[strconv.Itoa(newPoint4.x)+","+strconv.Itoa(newPoint4.y)] = 1
			newPoint4.x -= dX
			newPoint4.y -= dY
		}
	}
	applyDistances2(resultMap, coords[1:])
}

func main() {
	// lines := strings.Split(s, "\n")
	antennaMap := buildLabMap()
	anodeMap := make(map[string]int, 0)

	fmt.Printf("Antennas %v\n", antennaMap)
	for antenna, coords := range antennaMap {
		// for all the coords between each other...

		fmt.Printf("discant becatwe %s %v\n", antenna, coords)
		// add to a new map of course... if in range of the map (no -, no +50)
		// applyDistances(anodeMap, coords)
		applyDistances2(anodeMap, coords)
	}
	fmt.Printf("LLEN: %d\n", len(strings.Split(s, "\n")))
	fmt.Printf("ANODE MAP %v\n", anodeMap)
	fmt.Printf("Part 1 ans: %d\n", len(anodeMap)) // 188 to low 456 to high // 364 correct

}
