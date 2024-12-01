package main

import (
	_ "embed"
	"fmt"
	"sort"
	"strconv"
	"strings"
)

//go:embed data.txt
var s string

func remove(slice []int, s int) []int {
	return append(slice[:s], slice[s+1:]...)
}

func main() {
	words := strings.Split(s, "\n")

	total := 0
	itemsA := make([]int, 0)
	itemsB := make([]int, 0)

	for _, value := range words {
		sections := strings.Split(value, "   ")
		a, _ := strconv.Atoi(sections[0])
		b, _ := strconv.Atoi(sections[1])
		itemsA = append(itemsA, a)
		itemsB = append(itemsB, b)
	}
	sort.Ints(itemsA)
	sort.Ints(itemsB)

	for i, _ := range itemsA {
		if itemsA[i] > itemsB[i] {
			total += itemsA[i] - itemsB[i]
		} else {
			total += itemsB[i] - itemsA[i]
		}
	}

	fmt.Printf("Part 1 Total is %d\n", total)

	rightMap := make(map[int]int)
	for _, value := range itemsB {
		v, exists := rightMap[value]
		if !exists {
			rightMap[value] = 0
		}
		rightMap[value] = v + 1
	}

	similarityScore := 0
	for _, value := range itemsA {
		similarityScore += value * rightMap[value]
	}
	fmt.Printf("Part 2 total is %d\n", similarityScore)
}
