package main

import (
	"fmt"
	"math"
	"strconv"
	"strings"
)

// Combo operands 0 through 3 represent literal values 0 through 3.
// Combo operand 4 represents the value of register A.
// Combo operand 5 represents the value of register B.
// Combo operand 6 represents the value of register C.
// Combo operand 7 is reserved and will not appear in valid programs.
func powInt(x, y int) int {
	return int(math.Pow(float64(x), float64(y)))
}
func valForOperand(operand, a, b, c int) int {
	if operand <= 3 {
		return operand
	} else if operand == 4 {
		return a
	} else if operand == 5 {
		return b
	} else if operand == 6 {
		return c
	}
	panic("VAL FOR OP FAIL")
}

func run(regA int) string {
	// regA := 33024962
	regB := 0
	regC := 0

	program := []int{2, 1, 7, 1, 0, 4, 5, 3}
	operands := []int{4, 3, 5, 5, 3, 2, 5, 0}
	output := ""
	// instPtr := 0
	// debug := true
	for instPtr := 0; instPtr < len(program); {
		switch program[instPtr] {
		case 0: // The adv instruction (opcode 0) performs division. The numerator is the value in the A register.
			// The denominator is found by raising 2 to the power of the instruction's combo operand. (So, an operand
			// of 2 would divide A by 4 (2^2); an operand of 5 would divide A by 2^B.) The result of the division operation
			// is truncated to an integer and then written to the A register.
			val := valForOperand(operands[instPtr], regA, regB, regC)
			// d(debug, )
			regA = regA / powInt(2, val)
			instPtr++
		case 1: // The bxl instruction (opcode 1) calculates the bitwise XOR of register B and the instruction's literal
			// operand, then stores the result in register B.
			regB = operands[instPtr] ^ regB
			instPtr++
		case 2: // The bst instruction (opcode 2) calculates the value of its combo operand modulo 8 (thereby keeping only
			//  its lowest 3 bits), then writes that value to the B register.
			regB = valForOperand(operands[instPtr], regA, regB, regC) % 8
			instPtr++
		case 3: // The jnz instruction (opcode 3) does nothing if the A register is 0. However, if the A register is not zero,
			// it jumps by setting the instruction pointer to the value of its literal operand; if this instruction jumps,
			// the instruction pointer is not increased by 2 after this instruction.
			if regA == 0 {
				instPtr++
			} else {
				instPtr = operands[instPtr]
			}
		case 4: // The bxc instruction (opcode 4) calculates the bitwise XOR of register B and register C, then stores the result
			// in register B. (For legacy reasons, this instruction reads an operand but ignores it.)
			regB = regB ^ regC
			instPtr++
		case 5: // The out instruction (opcode 5) calculates the value of its combo operand modulo 8, then outputs that value.
			// (If a program outputs multiple values, they are separated by commas.)
			// fmt.Printf("%d,", valForOperand(operands[instPtr], regA, regB, regC)%8)
			output += strconv.Itoa(valForOperand(operands[instPtr], regA, regB, regC) % 8)
			output += ","
			instPtr++
		case 6: // The bdv instruction (opcode 6) works exactly like the adv instruction except that the
			// result is stored in the B register. (The numerator is still read from the A register.)
			val := valForOperand(operands[instPtr], regA, regB, regC)
			regB = regA / powInt(2, val)

			instPtr++
		case 7: // The cdv instruction (opcode 7) works exactly like the adv instruction except that the
			// result is stored in the C register. (The numerator is still read from the A register.)
			val := valForOperand(operands[instPtr], regA, regB, regC)
			regC = regA / powInt(2, val)
			// regC = regA / operands[instPtr]
			instPtr++

		}
	}
	// fmt.Printf("\n")
	return output
}

func main() {
	part1 := run(33024962) // 5,1,3,4,3,7,2,1,7,
	fmt.Printf("PART 1: %s\n", part1)
	// 			 1,3,3,0,0,0,0,0,0,0,0,0,0,0
	//	    	 4,5,4,5,2,3,4,6,0,5,7,1,6,1,1,
	// 	         2,5,7,4,2,1,3,1,6,6,4,6,6,3,2,7,
	// original := "2,4,1,3,7,5,1,5,0,3,4,2,5,5,3,0,"
	original := "2,5,5,"
	//   3 5 4 1 0 5 3 1 8 9 9 4 3 3
	// original := "5,1,3,4,3,7,2,1,7,"

	//35100531899433
	// for i := 56315531899433; i < 1000000000000000; i -= 100000 {

	// 3145 -> 5,5,3,0,
	// 25165 -> 2,5,5,3,0
	// 589 -> 2,5,5
	for i := 0; i < 100; i++ {
		val := run(i)
		if strings.HasPrefix(val, original) {
			fmt.Printf("PART 2: %d\n", i)
			// break
		}
		// if i%999999 == 0 {
		// 	fmt.Printf("@%d = %s\n", i, val)
		// }
	}
}

//@35100077760000 = 661556104637721,
