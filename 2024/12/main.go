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

type plot struct {
	point coord
}

func (p *plot) area() {

}
func (p *plot) permiter() {

}

func valueAt(point coord, site [][]string) string {
	if point.y >= 0 && point.x >= 0 && point.x < len(site) && point.y < len(site) {
		return site[point.y][point.x]
	} else {
		return "."
	}
}

func neighborCount(point coord, site [][]string) int {
	curValue := valueAt(point, site)
	x := point.x
	y := point.y
	total := 0
	if valueAt(coord{x - 1, y}, site) == curValue {
		total += 1
	}
	if valueAt(coord{x + 1, y}, site) == curValue {
		total += 1
	}
	if valueAt(coord{x, y - 1}, site) == curValue {
		total += 1
	}
	if valueAt(coord{x, y + 1}, site) == curValue {
		total += 1
	}
	return total

}

func buildMap() [][]string {
	lines := strings.Split(s, "\n")
	LabMap := make([][]string, len(lines))

	for y, value := range lines {
		for x := 0; x < len(lines); x++ {
			val, _ := strconv.Atoi(string(value[x]))
			LabMap[y] = append(LabMap[y], val)
		}
	}
	fmt.Printf("0, 3 = %d\n", valueAt(coord{0, 3}, LabMap))
	fmt.Printf("3, 0 = %d\n", valueAt(coord{3, 0}, LabMap))

	return LabMap
}

func walkMap(point coord, site [][]int, visited map[coord]int) {

	curValue := valueAt(point, site)
	x := point.x
	y := point.y
	if curValue == 9 {
		val, ok := visited[point]
		if !ok {
			visited[point] = 1
		} else {
			visited[point] = val + 1
		}
		return
	} else {
		if valueAt(coord{x - 1, y}, site) == curValue+1 {
			walkMap(coord{x - 1, y}, site, visited)
		}
		if valueAt(coord{x + 1, y}, site) == curValue+1 {
			walkMap(coord{x + 1, y}, site, visited)
		}
		if valueAt(coord{x, y - 1}, site) == curValue+1 {
			walkMap(coord{x, y - 1}, site, visited)
		}
		if valueAt(coord{x, y + 1}, site) == curValue+1 {
			walkMap(coord{x, y + 1}, site, visited)
		}
	}

}

func main() {
	visited := make(map[coord]int)
	site := buildMap()
	total := 0
	total2 := 0
	for i := range len(site) {
		for j := range len(site) {
			if valueAt(coord{i, j}, site) == 0 {
				walkMap(coord{i, j}, site, visited)
				for _, val := range visited {
					total2 += val
				}
				total += len(visited)
				visited = make(map[coord]int) // comment for part 2
			}
		}
	}

	fmt.Printf("Part 1: %d\n", total)  // 557
	fmt.Printf("Part 2: %d\n", total2) // 1062
}

// walk x.y

// if x.y is .
// 	flood fill and track each element in a struct
// 	walk the struct and replace each with a . and determine the count of elements (the area) and the permiter (..., with shapes not just hxw)

// can I know inside edges?
