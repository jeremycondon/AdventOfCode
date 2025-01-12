package main

import (
	_ "embed"
	"fmt"
	"strings"
)

//go:embed data.txt
var m string

type point struct {
	x int
	y int
}

//	type pathPoint struct {
//		p point
//		distance int
//	}
func valueAt(point point, labMap [][]string, dX, dY int) string {
	if point.y >= 0 && point.x >= 0 && point.x < len(labMap) && point.y < len(labMap) {
		return labMap[point.y+dY][point.x+dX]
	} else {
		return ""
	}
}

func setValue(point point, labMap [][]string, newVal string) {
	labMap[point.y][point.x] = newVal
}
func parseMap() map[point]int {
	lines := strings.Split(m, "\n")
	LabMap := make([][]string, len(lines))
	path := make(map[point]int, 0)
	start := point{0, 0}
	end := point{0, 0}
	for y, value := range lines {
		for x := 0; x < len(lines); x++ {
			val := string(value[x])
			LabMap[y] = append(LabMap[y], val)
			if val == "S" {
				start = point{x, y}
			}
			if val == "E" {
				end = point{x, y}
			}
		}
	}

	iterator := end
	lastDirection := ""
	steps := 0
	keepGoing := true
	for keepGoing {
		if valueAt(iterator, LabMap, 0, 0) == "S" {
			keepGoing = false
			break
		}
		fmt.Printf("At %v\n", iterator)
		steps++
		if lastDirection != "W" && (valueAt(iterator, LabMap, -1, 0) == "." || valueAt(iterator, LabMap, -1, 0) == "S") {
			iterator.x = iterator.x - 1
			path[iterator] = steps
			setValue(iterator, LabMap, "X")
			lastDirection = "E"
		} else if lastDirection != "N" && (valueAt(iterator, LabMap, 0, -1) == "." || valueAt(iterator, LabMap, 0, -1) == "S") {
			iterator.y = iterator.y - 1
			path[iterator] = steps
			setValue(iterator, LabMap, "X")

			lastDirection = "S"
		} else if lastDirection != "E" && (valueAt(iterator, LabMap, 1, 0) == "." || valueAt(iterator, LabMap, 1, 0) == "S") {
			iterator.x = iterator.x + 1
			path[iterator] = steps
			setValue(iterator, LabMap, "X")

			lastDirection = "W"
		} else if lastDirection != "S" && (valueAt(iterator, LabMap, 0, 1) == "." || valueAt(iterator, LabMap, 0, 1) == "S") {
			iterator.y = iterator.y + 1
			path[iterator] = steps
			setValue(iterator, LabMap, "X")

			lastDirection = "N"
		} else {
			fmt.Printf("VALUE AT %v %s\n", iterator, valueAt(iterator, LabMap, 0, 0))
			// panic("WTF")
			break
		}

	}

	fmt.Printf("Start %v End %v\n", start, end)
	return path
}

func diffPoint(p point, x, y int) point {
	return point{p.x + x, p.y + y}
}

func checkPointDiffs(points map[point]int) int {
	total := 0
	for point, val := range points {

		for i := -2; i <= 2; i++ {
			// for j := -2; j <= 2; j++ {
			// if j == i && (j == -2 || j == 2) {

			// } else
			if value, exists := points[diffPoint(point, i, 0)]; exists && value != 0 && val != 0 && value-val > 100 {
				total += 1
			}
			if value, exists := points[diffPoint(point, 0, i)]; exists && value != 0 && val != 0 && value-val > 100 {
				total += 1
			}
			// }
		}
	}
	return total
}

func main() {
	// total := 0
	path := parseMap()
	total := checkPointDiffs(path)
	fmt.Printf("Path %v\n", path)
	fmt.Printf("Part 1: %d\n", total) // 6636 to high... 5370 high...  1454 it is... so cant do -> ^
}
