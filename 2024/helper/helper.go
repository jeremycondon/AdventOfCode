package helper

import "strconv"

func Reverse(s string) string {
	runes := []rune(s)
	for i, j := 0, len(runes)-1; i < j; i, j = i+1, j-1 {
		runes[i], runes[j] = runes[j], runes[i]
	}
	return string(runes)
}

func Remove(slice []int, s int) []int {
	return append(slice[:s], slice[s+1:]...)
}

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
