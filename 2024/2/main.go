package main

import (
	_ "embed"
	"fmt"
	"strconv"
	"strings"
)

//go:embed data.txt
var s string

func toInt(strings []string) []int {
	slice := make([]int, 0)
	for _, v := range strings {
		intValue, err := strconv.Atoi(v)
		if err == nil {
			slice = append(slice, intValue)
		}
	}
	return slice
}

func checkDecreasing(values []int, skipIndex int) int {
	lastVal := values[0]
	startAt := 1
	if skipIndex == 0 {
		lastVal = values[1]
		startAt = 2
	}

	for i := startAt; i < len(values); i++ {
		if i == skipIndex {
			continue
		}
		if lastVal > values[i] && values[i] > lastVal-4 {
			lastVal = values[i]
			continue
		} else {
			return 0
		}
	}
	return 1
}

func checkIncreasing(values []int, skipIndex int) int {
	lastVal := values[0]
	startAt := 1
	if skipIndex == 0 {
		lastVal = values[1]
		startAt = 2
	}
	for i := startAt; i < len(values); i++ {
		if skipIndex == i {
			continue
		}
		if lastVal < values[i] && values[i] < lastVal+4 {
			lastVal = values[i]
			continue
		} else {
			return 0
		}
	}
	return 1
}

func main() {
	words := strings.Split(s, "\n")
	total := 0
	total2 := 0
	maxLen := 0
	for _, value := range words {
		parts := strings.Split(value, " ")
		values := toInt(parts)
		if len(values) > maxLen {
			maxLen = len(values)
		}
		if checkDecreasing(values, 100) == 1 {
			total += 1
			total2 += 1
		} else if checkIncreasing(values, 100) == 1 {
			total += 1
			total2 += 1
		} else {
			for i := 0; i < len(values); i++ {
				if checkDecreasing(values, i) == 1 || checkIncreasing(values, i) == 1 {
					total2 += 1
					break
				}
			}
		}
	}
	fmt.Printf("Part 1 Total is %d\n", total)
	fmt.Printf("Part 2 Total is %d\n", total2)
}
