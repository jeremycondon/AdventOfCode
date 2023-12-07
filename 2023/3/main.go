package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"strconv"
)

// type with x and y as int
type point struct {
	row int
	col int
}

type MapSeek struct {
	lines      []string
	hasSeen    map[point]bool
	MAX_WIDTH  int
	MAX_HEIGHT int
}

func isSymbol(val rune) bool {
	switch val {
	case '.', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9':
		return false
	}
	return true
}

func isDigit(val byte) bool {
	value := string(val)
	return value >= "0" && value <= "9"
}

func (m *MapSeek) numValueAt(p point) int {
	// look back and forward checking for
	fmt.Printf("num value at %v %s\n", p, string(m.lines[p.row][p.col]))
	value := m.lines[p.row][p.col]

	curLine := m.lines[p.row]
	startIndex := p.col
	endIndex := p.col
	if isDigit(value) {
		m.hasSeen[p] = true
		// startIndex
		for startIndex > 0 && isDigit(curLine[startIndex-1]) {
			startIndex -= 1
			m.hasSeen[point{p.row, startIndex}] = true
		}
		for endIndex < m.MAX_WIDTH && isDigit(curLine[endIndex+1]) {
			endIndex += 1
			m.hasSeen[point{p.row, endIndex}] = true
		}

		numValue := string(curLine[startIndex : endIndex+1])
		ret, _ := strconv.Atoi(numValue)
		return ret
	}
	return 0
}

func (m *MapSeek) sumOfSurrounding(p point) int {
	total := 0
	// check top
	if p.row > 0 {
		if p.col > 0 {
			toCheck := point{p.row - 1, p.col - 1}
			if _, found := m.hasSeen[toCheck]; !found {
				total += m.numValueAt(toCheck)
			}
			toCheck = point{p.row - 1, p.col}
			if _, found := m.hasSeen[toCheck]; !found {
				total += m.numValueAt(toCheck)
			}
		}
		if p.col < m.MAX_WIDTH {
			toCheck := point{p.row - 1, p.col + 1}
			if _, found := m.hasSeen[toCheck]; !found {
				total += m.numValueAt(toCheck)
			}
		}
	}
	if p.col > 0 {
		toCheck := point{p.row, p.col - 1}
		if _, found := m.hasSeen[toCheck]; !found {
			total += m.numValueAt(toCheck)
		}
		toCheck = point{p.row, p.col}
		if _, found := m.hasSeen[toCheck]; !found {
			total += m.numValueAt(toCheck)
		}
	}
	if p.col < m.MAX_WIDTH {
		toCheck := point{p.row, p.col + 1}
		if _, found := m.hasSeen[toCheck]; !found {
			total += m.numValueAt(toCheck)
		}
	}

	// check below
	if p.row < m.MAX_HEIGHT {
		if p.col > 0 {
			toCheck := point{p.row + 1, p.col - 1}
			if _, found := m.hasSeen[toCheck]; !found {
				total += m.numValueAt(toCheck)
			}
			toCheck = point{p.row + 1, p.col}
			if _, found := m.hasSeen[toCheck]; !found {
				total += m.numValueAt(toCheck)
			}
		}
		if p.col < m.MAX_WIDTH {
			toCheck := point{p.row + 1, p.col + 1}
			if _, found := m.hasSeen[toCheck]; !found {
				total += m.numValueAt(toCheck)
			}
		}
	}

	return total
}

func (m *MapSeek) multiplyOfSurrounding(p point) int {
	total := 1
	hits := 0

	// check top
	if p.row > 0 {
		if p.col > 0 {
			toCheck := point{p.row - 1, p.col - 1}
			if _, found := m.hasSeen[toCheck]; !found {
				v := m.numValueAt(toCheck)
				if v > 0 {
					total = total * m.numValueAt(toCheck)
					hits += 1
				}
			}
			toCheck = point{p.row - 1, p.col}
			if _, found := m.hasSeen[toCheck]; !found {
				v := m.numValueAt(toCheck)
				if v > 0 {
					total *= m.numValueAt(toCheck)
					hits += 1
				}
			}
		}
		if p.col < m.MAX_WIDTH {
			toCheck := point{p.row - 1, p.col + 1}
			if _, found := m.hasSeen[toCheck]; !found {
				v := m.numValueAt(toCheck)
				if v > 0 {
					total *= m.numValueAt(toCheck)
					hits += 1
				}
			}
		}
	}
	if p.col > 0 {
		toCheck := point{p.row, p.col - 1}
		if _, found := m.hasSeen[toCheck]; !found {
			v := m.numValueAt(toCheck)
			if v > 0 {
				total *= m.numValueAt(toCheck)
				hits += 1
			}
		}
		toCheck = point{p.row, p.col}
		if _, found := m.hasSeen[toCheck]; !found {
			v := m.numValueAt(toCheck)
			if v > 0 {
				total = total * m.numValueAt(toCheck)
				hits += 1
			}
		}
	}
	if p.col < m.MAX_WIDTH {
		toCheck := point{p.row, p.col + 1}
		if _, found := m.hasSeen[toCheck]; !found {
			v := m.numValueAt(toCheck)
			if v > 0 {
				total *= m.numValueAt(toCheck)
				hits += 1
			}
		}
	}

	// check below
	if p.row < m.MAX_HEIGHT {
		if p.col > 0 {
			toCheck := point{p.row + 1, p.col - 1}
			if _, found := m.hasSeen[toCheck]; !found {
				v := m.numValueAt(toCheck)
				if v > 0 {
					total = total * m.numValueAt(toCheck)
					hits += 1
				}

			}
			toCheck = point{p.row + 1, p.col}
			if _, found := m.hasSeen[toCheck]; !found {
				v := m.numValueAt(toCheck)
				if v > 0 {
					total *= m.numValueAt(toCheck)
					hits += 1
				}
			}
		}
		if p.col < m.MAX_WIDTH {
			toCheck := point{p.row + 1, p.col + 1}
			if _, found := m.hasSeen[toCheck]; !found {
				v := m.numValueAt(toCheck)
				if v > 0 {
					total *= m.numValueAt(toCheck)
					hits += 1
				}
			}
		}
	}
	fmt.Printf("total: %d, %v\n", total, p)
	if hits == 2 {
		return total
	}
	return 0
}

func main() {
	hasSeen := map[point]bool{} // maybe not helpful...  could run each of the map lookups then combine overlapping groups...

	file, err := os.Open("./input.txt")
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()

	lines := []string{}
	sumSymbols := []point{}
	mulSymbols := []point{}
	scanner := bufio.NewScanner(file)
	i := 0
	for scanner.Scan() {
		lines = append(lines, scanner.Text())
		for j, v := range scanner.Text() {
			if isSymbol(v) {
				if v == '*' {
					mulSymbols = append(mulSymbols, point{i, j})
				} else {
					sumSymbols = append(sumSymbols, point{i, j})
				}
			}
		}
		i++
	}

	mapSeek := MapSeek{
		lines:      lines,
		hasSeen:    hasSeen,
		MAX_WIDTH:  139,
		MAX_HEIGHT: 140,
	}

	total := 0
	// for _, p := range sumSymbols {
	// 	total += mapSeek.sumOfSurrounding(p)
	// }
	for _, p := range mulSymbols {
		total += mapSeek.multiplyOfSurrounding(p)
	}
	fmt.Printf("TOTAL: %d\n", total)
}
