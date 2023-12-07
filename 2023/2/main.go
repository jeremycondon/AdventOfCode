package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"strconv"
	"strings"
)

func valForGame(str string) (int, int, int) {
	roll := strings.FieldsFunc(str, func(r rune) bool {
		return r == ','
	})

	r := 0
	g := 0
	b := 0

	for _, v := range roll {
		t := strings.TrimSpace(v)
		val := 0
		color := ""
		fmt.Sscanf(t, "%d %s", &val, &color)
		if color == "red" {
			r = val
		}
		if color == "green" {
			g = val
		}
		if color == "blue" {
			b = val
		}
	}
	return r, g, b
}

func Max(x, y int) int {
	if x > y {
		return x
	}
	return y
}

func main() {
	file, err := os.Open("./input.txt")
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()
	fmt.Println("Hello, World!")

	total := 0
	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		fmt.Println(scanner.Text())

		red := 0
		green := 0
		blue := 0

		str := scanner.Text()
		wordBroken := strings.FieldsFunc(str, func(r rune) bool {
			if r == ':' || r == ';' {
				return true
			}
			return false
		})
		game, _ := strconv.Atoi(wordBroken[0][5:])
		fmt.Printf("%d %q, %s\n", game, wordBroken, wordBroken[0][4:])

		for i := 1; i < len(wordBroken); i++ {
			// split on comma
			r, g, b := valForGame(wordBroken[i])
			fmt.Printf("%d %d %d\n", r, g, b)
			red = Max(red, r)
			green = Max(green, g)
			blue = Max(blue, b)

		}
		total += red * green * blue
	}
	fmt.Printf("Total: %d\n", total)
}
