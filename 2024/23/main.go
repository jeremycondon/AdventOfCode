package main

import (
	_ "embed"
	"fmt"
	"strings"
)

//go:embed data.txt
var m string

func addConnections(connections *map[string][]string, a, b string) {
	connA, existsA := (*connections)[a]
	if !existsA {
		connA = make([]string, 0)
	}

	connB, existsB := (*connections)[b]
	if !existsB {
		connB = make([]string, 0)
	}

	connA = append(connA, b)
	(*connections)[a] = connA

	connB = append(connB, a)
	(*connections)[b] = connB

}

func main() {
	total := 0

	connections := make(map[string][]string)
	lines := strings.Split(m, "\n")

	for _, line := range lines {
		parts := strings.Split(line, "-")
		addConnections(&connections, parts[0], parts[1])
	}

	fmt.Printf("CONNS %v\n", connections)

	for k, v := range connections {
		if k[0] == 't' && len(v) >= 2 {
			fmt.Printf(" %s,  ->  %v\n", k, v)
			total += 1
		}
	}

	fmt.Printf("Part 1: %d\n", total)
}
