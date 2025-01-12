package main

import (
	_ "embed"
	"fmt"
	"strings"
)

//go:embed map.txt
var m string

//go:embed directions.txt
var d string

type coord struct {
	x int
	y int
}

func valueAt(point coord, labMap [][]string, dX, dY int) string {
	if point.y >= 0 && point.x >= 0 && point.x < len(labMap) && point.y < len(labMap) {
		if dX != 0 || dY != 0 {

			fmt.Printf("Moving %v, %d, %d %d %d\n", point, dX, dY, point.x+dX, point.y+dY)
		}
		return labMap[point.y+dY][point.x+dX]
	} else {
		return ""
	}
}
func buildMap() [][]string {
	lines := strings.Split(m, "\n")
	LabMap := make([][]string, len(lines))

	for y, value := range lines {
		for x := 0; x < len(lines); x++ {
			val := string(value[x])
			LabMap[y] = append(LabMap[y], val)
		}
	}
	// fmt.Printf("0, 3 = %d\n", valueAt(coord{0, 3}, LabMap))
	// fmt.Printf("3, 0 = %d\n", valueAt(coord{3, 0}, LabMap))

	return LabMap
}

func printMap(labMap [][]string) {
	for y, value := range labMap {
		for x := 0; x < len(value); x++ {
			fmt.Printf("%s", valueAt(coord{x, y}, labMap, 0, 0))
		}
		fmt.Println()
	}
}

func setValue(point coord, labMap [][]string, dX, dY int, newVal string) {
	labMap[point.y+dY][point.x+dX] = newVal
}

func scoreMap(mp [][]string) int {
	total := 0
	for y, value := range mp {
		for x := 0; x < len(value); x++ {
			if valueAt(coord{x, y}, mp, 0, 0) == "O" {
				// 100 times its distance from the top edge of the map plus its distance from the left edge of the map
				total += (y * 100) + x
			}
		}
	}
	return total
}

func part1() {
	// total := 0

	mp := buildMap()
	location := coord{24, 24}
	fmt.Printf("STARTING AT %s\n", valueAt(location, mp, 0, 0))
	setValue(location, mp, 0, 0, ".")
	keepGoing := true
	printMap(mp)

	for i := 0; i < len(d) && keepGoing; i++ {
		direction := string(d[i])
		// fmt.Printf("At %v, Need to go %s\n", location, direction)
		// printMap(mp)

		switch direction {
		case "v":
			if valueAt(location, mp, 0, 1) == "." {
				location.y += 1
			} else if valueAt(location, mp, 0, 1) == "O" {
			local:
				for j := 1; j < len(mp); j++ {
					v := valueAt(location, mp, 0, j)
					if v == "#" {
						break local
					}
					if v == "." {
						// fmt.Printf("BEFORE")
						// fmt.Printf(" COORD %v\n", location)
						// printMap(mp)
						setValue(location, mp, 0, j, "O")
						location.y += 1
						setValue(location, mp, 0, 0, ".")
						// fmt.Printf("AFTER")
						// printMap(mp)
						// panic("done")
						break local
					}
				}
			}
		case "<":
			if valueAt(location, mp, -1, 0) == "." {
				location.x -= 1
			} else if valueAt(location, mp, -1, 0) == "O" {

			local2:
				for j := -1; ; j-- {
					v := valueAt(location, mp, j, 0)
					if v == "#" {
						break local2
					}
					if v == "." {
						// fmt.Printf("BEFORE")
						// fmt.Printf(" COORD %v\n", location)
						// printMap(mp)
						setValue(location, mp, j, 0, "O")
						location.x -= 1
						setValue(location, mp, 0, 0, ".")
						// fmt.Printf("AFTER")
						// printMap(mp)
						// panic("done")
						break local2
					}
				}
			}
		case ">":
			if valueAt(location, mp, 1, 0) == "." {
				location.x += 1
			} else if valueAt(location, mp, 1, 0) == "O" {
			local3:
				for j := 1; j < len(mp); j++ {
					v := valueAt(location, mp, j, 0)
					if v == "#" {
						break local3
					}
					if v == "." {
						// fmt.Printf("BEFORE")
						// fmt.Printf(" COORD %v\n", location)
						// printMap(mp)
						setValue(location, mp, j, 0, "O")
						location.x += 1
						setValue(location, mp, 0, 0, ".")
						// fmt.Printf("AFTER")
						// printMap(mp)
						// panic("done")
						break local3
					}
				}
			}
		case "^":
			if valueAt(location, mp, 0, -1) == "." {
				location.y -= 1
			} else if valueAt(location, mp, 0, -1) == "O" {
			local4:
				for j := -1; ; j-- {
					v := valueAt(location, mp, 0, j)
					if v == "#" {
						break local4
					}
					if v == "." {
						// fmt.Printf("BEFORE")
						// fmt.Printf(" COORD %v\n", location)
						// printMap(mp)
						setValue(location, mp, 0, j, "O")
						location.y -= 1
						setValue(location, mp, 0, 0, ".")
						// fmt.Printf("AFTER")
						// printMap(mp)
						// panic("done")
						break local4
					}
				}
			}
		}
		// fmt.Printf("@ %d\n", i)
	}
	fmt.Printf("============================\n")
	printMap(mp)

	fmt.Printf("Part 1: %d\n", scoreMap(mp))
}

func main() {
	part1()
}
