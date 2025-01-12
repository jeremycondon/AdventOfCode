package main

import (
	_ "embed"
	"fmt"
	"math"
	"strconv"
	"strings"
)

//go:embed data.txt
var s string

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
func powInt(x, y int) int {
	return int(math.Pow(float64(x), float64(y)))
}

func attemptSolve(goal int, params []int) int {
	for i := 0; i < powInt(2, len(params)); i++ {
		acc := params[0]
		for j := 1; j < len(params); j++ {
			multiply := i&powInt(2, j-1) == powInt(2, j-1)
			if multiply {
				acc = acc * params[j]
			} else {
				acc = acc + params[j]
			}
		}
		if acc == goal {
			return goal
			// fmt.Printf("Total %d\n", total)
		}
	}
	return 0
}

func attempt2Solve(goal int, params []int) int {
	for i := 0; i < powInt(2, len(params)); i++ { //because fuc kit
		for k := 0; k < powInt(2, len(params)); k++ { //because fuc kit
			acc := params[0]
			for j := 1; j < len(params); j++ {
				// index := i * 2
				multiply := i&powInt(2, j-1) == powInt(2, j-1)
				add := i&powInt(2, k-1) == powInt(2, k-1)

				if multiply {
					acc = acc * params[j]
				} else if add {
					acc = acc + params[j]
				} else {
					acc, _ = strconv.Atoi(strconv.Itoa(acc) + strconv.Itoa(params[j]))
				}

			}
			if acc == goal {
				return goal
				// fmt.Printf("Total %d\n", total)
			}
		}
	}
	return 0
}

func remove(slice []int, s int) []int {
	return append(slice[:s], slice[s+1:]...)
}

func mergeOne(params []int, i int) []int {
	toInsert, _ := strconv.Atoi(strconv.Itoa(params[i-1]) + strconv.Itoa(params[i]))
	newParams := remove(params, i)
	newParams = append(newParams[:i-1], append([]int{toInsert}, newParams[i:]...)...)
	return newParams
}

//
//

func copyArray(a []int) []int {
	output := make([]int, len(a))
	for i, val := range a {
		output[i] = val
	}
	return output
}
func mergeAndAttempt(goal int, params []int) int {
	val := attemptSolve(goal, params)
	if val > 0 {
		return val
	} else if len(params) == 1 {
		return 0
	} else {
		val := 0
		for i := 1; i < len(params); i++ {
			// words := strings.Split(value, " ")
			newParams := copyArray(params)
			newParams = mergeOne(newParams, i)
			// fmt.Printf("Attempt transform %d: %v\n", i, newParams)
			val = attemptSolve(goal, newParams)
			if val > 0 {
				return val
			}
			val = mergeAndAttempt(goal, newParams)
			if val > 0 {
				return val
			}
		}
	}
	return val
	// return -1
}

func mergeLots(params []int, all map[string][]int) {
	// val := attemptSolve(goal, params)
	if len(params) == 1 {
		all[fmt.Sprint(params)] = params
	} else {
		// val := 0
		for i := 1; i < len(params); i++ {
			// words := strings.Split(value, " ")
			newParams := copyArray(params)
			newParams = mergeOne(newParams, i)
			// // fmt.Printf("Attempt transform %d: %v\n", i, newParams)
			// val = attemptSolve(goal, newParams)
			// if val > 0 {
			// 	return val
			// }
			// val = mergeAndAttempt(goal, newParams)
			// if val > 0 {
			// 	return val
			// }
			all[fmt.Sprint(newParams)] = newParams
			mergeLots(newParams, all)
		}

	}

	// return -1
}

func recurse() {

}

func main() {
	lines := strings.Split(s, "\n")

	total := 0
	total2 := 0
	for i, value := range lines {
		words := strings.Split(value, " ")
		goal, _ := strconv.Atoi(words[0][:len(words[0])-1])
		// fmt.Printf("Words %v %d\n", words, goal)
		params := StringsToInts(words[1:])
		// fmt.Printf("Words %v %d   : %v\n", words, goal, params)
		// solved := false
		partial := attempt2Solve(goal, params)
		total += partial
		fmt.Printf("@ %d - %d\n", i, partial)
		total2 += partial
		if partial == 0 {
			// total2 += attempt2Solve(goal, params)
			// val := mergeAndAttempt(goal, params)
			// if val == -1 {
			// 	panic("-1")
			// }
			// all := make(map[string][]int)
			// mergeLots(params, all)
			// fmt.Printf("ALL:?? %v\n", all)
			// total2 += val
			// subTotal := 0
			// for _, val := range all {
			// 	subSubTotal := attemptSolve(goal, val)
			// 	if len(val) == 1 {
			// 		if val[0] == goal {
			// 			subTotal = goal
			// 		}
			// 	}
			// 	if subSubTotal > 0 {
			// 		subTotal = goal
			// 	}
			// }

			// total2 += subTotal
			// fmt.Printf("Attempt transform: %v\n", params)
			// solved := false
			// for i := 1; i < len(params) && !solved; i++ {
			// 	words := strings.Split(value, " ")
			// 	newParams := mergeOne(StringsToInts(words[1:]), i)
			// 	fmt.Printf("Attempt transform %d: %v\n", i, newParams)
			// 	val := attemptSolve(goal, newParams)
			// 	if val > 0 {
			// 		total2 += val
			// 		// stop now...
			// 		solved = true
			// 	}
			// }
		}
	}
	if total != 42283209483350 {
		panic("You broke it")
	}
	fmt.Printf("Part 1: %d\n", total) // 42283209483350
	fmt.Printf("Part 2: %d\n", total2)
	//42283210452776 low..
	//42288066487669 low...
	//42288066482551 still low
	//42693590027941 to low
	//43295366276164
	//43295366276164
	//43295366276164
	//1005658997416705 fuck u
}
