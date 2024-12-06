package main

import (
	_ "embed"
	"fmt"
	"slices"
	"strconv"
	"strings"
)

//go:embed orders.txt
var ordersRaw string

//go:embed pages.txt
var pagesRaw string

var ltTable [][]int = make([][]int, 100)
var gtTable [][]int = make([][]int, 100)

func StringsToInts(strings []string) []int {
	slice := make([]int, 0)
	for _, v := range strings {
		intValue, err := strconv.Atoi(v)
		if err == nil {
			slice = append(slice, intValue)
		}
	}
	return slice
}

func buildOrderTables() {
	orderLines := strings.Split(ordersRaw, "\n")
	for i := 0; i < len(orderLines); i++ {
		parts := StringsToInts(strings.Split(orderLines[i], "|"))
		ltTable[parts[0]] = append(ltTable[parts[0]], parts[1])
		gtTable[parts[1]] = append(gtTable[parts[1]], parts[0])

	}
}

func remove(slice []int, s int) []int {
	return append(slice[:s], slice[s+1:]...)
}

func sortFn(a, b int) int {
	for i := 0; i < len(ltTable[a]); i++ {
		if ltTable[a][i] == b {
			return -1
		}
		if gtTable[a][i] == b {
			return 1
		}
		if ltTable[b][i] == a {
			return 1
		}
		if gtTable[b][i] == a {
			return -1
		}
	}
	return 0
}

func checkMatch(pageStr string) int {
	pages := StringsToInts(strings.Split(pageStr, ","))
	pagesBefore := StringsToInts(strings.Split(pageStr, ","))
	middle := pages[int(len(pages)/2)]

	for i := 0; i < len(pages); i++ {
		if len(ltTable[pages[i]]) == 0 && len(gtTable[pages[i]]) == 0 {
			pages = remove(pages, i)
			pagesBefore = remove(pagesBefore, i)
		}
	}
	slices.SortFunc(pages, sortFn)
	for i := 0; i < len(pages); i++ {
		if pages[i] != pagesBefore[i] {
			return 0
		}
	}
	return middle
}

func main() {
	buildOrderTables()
	pages := strings.Split(pagesRaw, "\n")
	total := 0
	total2 := 0
	for _, page := range pages {
		mid := checkMatch(page)
		total += mid
		if mid == 0 {
			set := StringsToInts(strings.Split(page, ","))
			slices.SortFunc(set, sortFn)
			middle := set[int(len(set)/2)]
			total2 += middle
		}
	}
	fmt.Printf("Part 1: %d\n", total)  // first time!!  5955
	fmt.Printf("Part 2: %d\n", total2) // first time!!  4030
}

// BEFORE: [47 65 43 94 74 38 62] -> AFTER: [47 94 62 65 38 74 43]
