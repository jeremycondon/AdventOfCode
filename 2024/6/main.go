package main

import (
	_ "embed"
	"fmt"
	"strconv"
	"strings"
)

//go:embed data.txt
var s string

func buildLabMap() [][]string {
	LabMap := make([][]string, 130)
	lines := strings.Split(s, "\n")
	for y, value := range lines {
		for x := 0; x < 130; x++ {
			LabMap[y] = append(LabMap[y], string(value[x]))
		}
	}
	return LabMap
}

func findGuard(LabMap [][]string) (int, int) {
	for x := 0; x < len(LabMap); x++ {
		for y := 0; y < len(LabMap); y++ {
			if LabMap[x][y] == "^" {
				return x, y
			}
		}
	}
	return 0, 0
}
func printMap(LabMap [][]string) {
	for _, line := range LabMap {
		fmt.Println(strings.Join(line, ""))
	}
}

func countLocations(LabMap [][]string) int {
	total := 0
	for _, line := range LabMap {
		for _, rune := range line {
			if rune != "." && rune != "#" && rune != "^" {
				total += 1
			}
		}
	}
	return total
}

func walkMap(LabMap [][]string, recurse bool) int {
	total := 0
	total2 := 0
	visited := make(map[string]int)
	blocked := make(map[string]int)
	newBLockerMap := buildLabMap()
	wall := len(LabMap)

	currentDirection := "n"
	y, x := findGuard(LabMap)
	stepCounter := 0
	pathKey := ""
	for true {
		if recurse && stepCounter != 0 {
			LabMap2 := buildLabMap()
			LabMap2[y][x] = "#"
			isLoop := walkMap(LabMap2, false)
			if isLoop == -1 {
				blocked[strconv.Itoa(x)+","+strconv.Itoa(y)] = 1
				newBLockerMap[y][x] = "X"

			} else {
				// newBLockerMap[y][x] = "N"
			}
			fmt.Printf("Step: %d\n", stepCounter)
		}

		if (x == 0 && currentDirection == "w") ||
			(y == 0 && currentDirection == "n") ||
			(x == wall-1 && currentDirection == "e") ||
			(y == wall-1 && currentDirection == "s") {
			fmt.Printf("Step count: %d, total: %d\n", stepCounter, total)

			if countLocations(newBLockerMap) > 1000 {
				printMap(newBLockerMap)
			}
			fmt.Printf("Part 2 total: %d\n", total2)
			fmt.Printf("part 2 total: %d\n", len(blocked))
			fmt.Printf("WELL? %d\n", countLocations(newBLockerMap))
			// fmt.Printf("out %v\n", blocked)
			// fmt.Printf("MAP BLOCKERS ")
			// printMap(newBLockerMap)
			// 1693 to low
			// 1717 - 1 = 1716 wrong... :(
			// 1717 also wrong
			// 1715 is wrong (eliminate line of site)
			// 1839 to high
			// 1682 WRONG AGAIN
			// 1724 mmm...bad... // strings might be getting extra data...
			return countLocations(LabMap)
		}

		// move
		switch currentDirection {
		case "n":
			if LabMap[y-1][x] == "#" {
				currentDirection = "e"
				x = x + 1
			} else {
				y = y - 1
			}
		case "e":
			if LabMap[y][x+1] == "#" {
				currentDirection = "s"
				y = y + 1
			} else {
				x = x + 1
			}
		case "s":
			if LabMap[y+1][x] == "#" {
				currentDirection = "w"
				x = x - 1
			} else {
				y = y + 1
			}
		case "w":
			if LabMap[y][x-1] == "#" {
				currentDirection = "n"
				y = y - 1
			} else {
				x = x - 1
			}
		}
		// have I been here?
		pathKey = currentDirection + string(x) + "," + string(y)
		v, ok := visited[pathKey]
		if ok && !recurse && v > 3 {
			return -1
		}
		// mark it
		if visVal, ok := visited[pathKey]; ok {
			visited[pathKey] = visVal + 1
		} else {
			visited[pathKey] = 1
		}

		stepCounter++
	}
	return total
}

func main() {
	LabMap := buildLabMap()
	part1Total := walkMap(LabMap, true)
	fmt.Printf("Part 1: %d\n", part1Total) // 4374
}
