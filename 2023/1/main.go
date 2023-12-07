package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"strconv"
)

func main() {
	file, err := os.Open("./input.txt")
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()
	total := 0
	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		fmt.Println(scanner.Text())

		str := scanner.Text()

		first := firstNum(scanner.Text())
		last := lastNum(str)

		sum := first + last
		val, _ := strconv.Atoi(sum)
		total += val
	}
	fmt.Printf("Total: %d\n", total)

}

func stringNumValue(str string, i int) string {
	if i+3 <= len(str) {
		if str[i:i+3] == "one" {
			return "1"
		}
		if str[i:i+3] == "two" {
			return "2"
		}
		if str[i:i+3] == "six" {
			return "6"
		}
	}
	if i+4 <= len(str) {
		if str[i:i+4] == "four" {
			return "4"
		}
		if str[i:i+4] == "five" {
			return "5"
		}
		if str[i:i+4] == "nine" {
			return "9"
		}
		if str[i:i+4] == "zero" {
			return "0"
		}
	}
	if i+5 <= len(str) {
		if str[i:i+5] == "three" {
			return "3"
		}

		if str[i:i+5] == "seven" {
			return "7"
		}
		if str[i:i+5] == "eight" {
			return "8"
		}
	}

	return ""
}

func firstNum(str string) string {
	for i, v := range str {
		fmt.Printf("%v, %v\n", i, v)
		if v == '0' || v == '1' || v == '2' || v == '3' || v == '4' || v == '5' ||
			v == '6' || v == '7' || v == '8' || v == '9' {
			return string(v)
		}
		strVal := stringNumValue(str, i)
		if strVal != "" {
			return strVal
		}
	}
	return "0"
}

func lastNum(str string) string {
	for i := len(str) - 1; i >= 0; i-- {
		if str[i] == '0' || str[i] == '1' || str[i] == '2' || str[i] == '3' || str[i] == '4' || str[i] == '5' ||
			str[i] == '6' || str[i] == '7' || str[i] == '8' || str[i] == '9' {
			return string(str[i])
		}
		strVal := stringNumValue(str, i)
		if strVal != "" {
			return strVal
		}
	}
	return "0"
}
