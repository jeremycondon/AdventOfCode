package main

import (
	_ "embed"
	"fmt"
	"strconv"
)

//go:embed data.txt
var s string

func StringsToInts(s string) []int {
	slice := make([]int, 0)
	for _, v := range s {
		intValue, err := strconv.Atoi(string(v))
		if err == nil {
			slice = append(slice, intValue)
		}
	}
	return slice
}

func takeFromBack(mapping []int) (int, []int) {
	lastIndex := len(mapping) - 1

	if lastIndex%2 == 1 {
		// blanks at the end
		mapping = mapping[:lastIndex]
		lastIndex--
	}

	for mapping[lastIndex] == 0 {
		mapping = mapping[:lastIndex-1]
		lastIndex -= 2

	}

	// decrement last val
	mapping[lastIndex] = mapping[lastIndex] - 1

	if mapping[lastIndex] == 0 {
		mapping = mapping[:lastIndex-1]
	}

	return lastIndex / 2, mapping
}

func part1() int {
	total := 0
	index := 0
	mapping := StringsToInts(s)
	for i := 0; i < len(mapping); i++ {
		val := mapping[i]
		if i%2 == 0 {
			for count := 0; count < val; count++ {
				total += (i / 2) * index
				index++
			}
		} else {
			var back int
			for count := 0; count < val; count++ {
				back, mapping = takeFromBack(mapping)
				total += (back) * index
				index++
			}
		}
	}
	return total
}

func findHoleAndPatch(emptySpaces []position, size int, maxLocation int) int {

	for i, position := range emptySpaces {
		if position.offset > maxLocation {
			return maxLocation
		}
		if position.size >= size {
			position.size -= size
			retVal := position.offset
			position.offset += size
			emptySpaces[i] = position
			return retVal
		}
	}
	panic("MMM")
}

type position struct {
	offset int
	size   int
}
type dataBlock struct {
	offset int
	value  int
	size   int
}

func part2() int {
	total := 0
	index := 0
	mapping := StringsToInts(s)
	emptySpaces := make([]position, 0)
	dataBlocks := make([]dataBlock, 0)
	for i := 0; i < len(mapping); i++ {
		val := mapping[i]
		if i%2 == 0 {
			dataBlocks = append(dataBlocks, dataBlock{offset: index, value: i / 2, size: val})
			index += val
			// }
		} else {
			emptySpaces = append(emptySpaces, position{offset: index, size: val})
			index += val
		}
	}

	iter := 0
	for i := len(dataBlocks) - 1; i >= 0; i-- {
		iter++
		insertLoc := findHoleAndPatch(emptySpaces, dataBlocks[i].size, dataBlocks[i].offset)
		for i2 := range dataBlocks[i].size {
			total += (insertLoc + i2) * dataBlocks[i].value
		}
	}
	return total
}
func main() {
	fmt.Printf("Part 1: %d\n", part1()) // 6360094256423
	fmt.Printf("Part 2: %d\n", part2()) // 6379677752410
}
