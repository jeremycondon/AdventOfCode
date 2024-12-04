package main

import (
	_ "embed"
	"fmt"
	"regexp"
	"strings"
)

//go:embed data.txt
var s string

func findWord(line string) int {
	re := regexp.MustCompile(`XMAS`)
	re2 := regexp.MustCompile(`SAMX`)
	return len(re.FindAllStringIndex(line, -1)) + len(re2.FindAllStringIndex(line, -1))
}

func verticalSlice(lines []string, n int) string {
	output := ""
	for i := 0; i < len(lines); i++ {
		output += string(lines[i][n])
	}
	return output
}

func part1() int {
	lines := strings.Split(s, "\n")
	total := 0
	for i := 0; i < len(lines); i++ {
		total += findWord(lines[i])
		total += findWord(verticalSlice(lines, i))
	}

	// yeah... I hate this too...
	// had a "diagonalString" func but that had some issue
	diag1 := make([]string, 140)
	diag2 := make([]string, 140)
	prepend := ""
	postpend := "                                                                                                                                            "
	for i := 0; i < 140; i++ {
		diag1[i] = prepend + lines[i] + postpend
		diag2[i] = postpend + lines[i] + prepend
		prepend += " "
		postpend = postpend[1:]
	}

	for i := 0; i < len(diag1[0]); i++ {
		total += findWord(verticalSlice(diag1, i))
		total += findWord(verticalSlice(diag2, i))
	}
	return total
}

func part2() int {
	lines := strings.Split(s, "\n")
	total := 0
	for i := 0; i < len(lines)-2; i++ {
		for j := 0; j < len(lines)-2; j++ {
			if lines[i+1][j+1] == 'A' {
				// A in the middle
				f1 := lines[i][j]
				f2 := lines[i+2][j]
				f3 := lines[i+2][j+2]
				f4 := lines[i][j+2]
				leftRight := string(f1) + string(f2) + string(f3) + string(f4)
				if leftRight == "MMSS" || leftRight == "SSMM" {
					total += 1
				}
				topBottom := string(f1) + string(f4) + string(f2) + string(f3)
				if topBottom == "SSMM" || topBottom == "MMSS" {
					total += 1
				}
			}
		}
	}
	return total
}

func main() {
	fmt.Printf("Total part 1: %d\n", part1())
	fmt.Printf("Total part 2: %d\n", part2())
}
