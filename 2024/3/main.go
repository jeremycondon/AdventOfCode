package main

import (
	_ "embed"
	"fmt"
	"strconv"
	"strings"
	"unicode"
)

//go:embed data.txt
var s string

func languageV1() int {
	nextChar := 'm'
	accumulator := ""
	valA := 0
	total := 0

	for _, v := range s {
		switch nextChar {
		case 'm':
			if v == 'm' {
				nextChar = 'u'
			} else {
				nextChar = 'm'
			}
		case 'u':
			if v == 'u' {
				nextChar = 'l'
			} else {
				nextChar = 'm'
			}
		case 'l':
			if v == 'l' {
				nextChar = '('
			} else {
				nextChar = 'm'
			}
		case '(':
			if v == '(' {
				nextChar = 'D'
				accumulator = ""
			} else {
				nextChar = 'm'
			}
		case 'D':
			if v == ',' && len(accumulator) > 0 {
				valA, _ = strconv.Atoi(accumulator)
				accumulator = ""
				nextChar = 'E'
			} else if unicode.IsDigit(v) {
				accumulator += string(v)
			} else {
				nextChar = 'm'
			}
		case 'E':
			if v == ')' && len(accumulator) > 0 {
				valB, _ := strconv.Atoi(accumulator)
				accumulator = ""
				nextChar = 'm'
				total += valA * valB
			} else if unicode.IsDigit(v) {
				accumulator += string(v)
			} else {
				nextChar = 'm'
			}
		default:
			nextChar = 'm'
		}
	}
	return total
}

func language(version int) int {
	accumulator := ""
	register := 0
	total := 0
	include := true
	currentInstruction := ""

	for _, v := range s {
		if currentInstruction == "mul(" {
			// start accumulator logic
			if v == ',' && len(accumulator) > 0 {
				register, _ = strconv.Atoi(accumulator)
				accumulator = ""
			} else if unicode.IsDigit(v) {
				accumulator += string(v)
			} else if v == ')' && len(accumulator) > 0 && register > 0 {
				register2, _ := strconv.Atoi(accumulator)
				if include || version == 1 {
					total += register * register2
				}
				currentInstruction = string(v)
				register = 0
				accumulator = ""

			} else {
				currentInstruction = string(v)
				register = 0
				accumulator = ""
			}
		} else {
			// keep building out instruction until we get something
			currentInstruction += string(v)
			if currentInstruction == "do()" {
				include = true
			} else if currentInstruction == "don't()" {
				include = false
			} else if !strings.HasPrefix("do(", currentInstruction) &&
				!strings.HasPrefix("don't(", currentInstruction) &&
				!strings.HasPrefix("mul(", currentInstruction) {
				currentInstruction = string(v)
				register = 0
				accumulator = ""
			}
		}
	}
	return total
}

func main() {
	// 173785482
	fmt.Printf("Part 1: %d\n", languageV1())
	fmt.Printf("Part 1: %d\n", language(1))
	// 83158140
	fmt.Printf("Part 2: %d\n", language(2))
}
