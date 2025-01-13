/*
Implement the myAtoi(string s) function, which converts a string to a 32-bit signed integer.

The algorithm for myAtoi(string s) is as follows:

Whitespace: Ignore any leading whitespace (" ").
Signedness: Determine the sign by checking if the next character is '-' or '+', assuming positivity if neither present.
Conversion: Read the integer by skipping leading zeros until a non-digit character is encountered or the end of the string is reached. If no digits were read, then the result is 0.
Rounding: If the integer is out of the 32-bit signed integer range [-231, 231 - 1], then round the integer to remain in the range. Specifically, integers less than -231 should be rounded to -231, and integers greater than 231 - 1 should be rounded to 231 - 1.
Return the integer as the final result.
*/

const MAX_VALUE = (1 << 30) * 2 - 1;
const MIN_VALUE = (1 << 31); // overflows to negative max

function checkWillOverflow(x: number, add: number) {
    if (x > 0) {
        // x * 10 + add > MAX_VALUE
        return (MAX_VALUE - add) / 10 < x;
    }

    // x * 10 - add < MIN_VALUE
    return (MIN_VALUE + add) / 10 > x
}


function myAtoi(s: string): number {
    let out = 0;
    let i = 0;
    let sign = 1;

    // step 1
    while (s[i] == ' ') { ++i; }
    
    // step 2
    if (s[i] == '+') {
        ++i;
    } else if (s[i] == '-') {
        sign = -1;
        ++i;
    }

    // step 3
    while (s[i] == '0') { ++i; }

    // step 4
    for(; i < s.length && s[i] >= '0' && s[i] <= '9'; ++i) {
        const digit = Number(s[i]);
        if (checkWillOverflow(out, digit)) { return out < 0? MIN_VALUE: MAX_VALUE; }
        out *= 10;
        out += digit * sign;
    }

    return out;
};

function test() {
    const tests: Array<[string, number]> = [
        // ["42", 42],
        // ["-042", -42],
        // ["1337c0d3", 1337],
        // ["0-1", 0],
        // ["words and 987", 0],
        // ["-91283472332", MIN_VALUE],
        ["-2147483649", MIN_VALUE]
    ];
    
    for(const [s, expected] of tests) {
        const result = myAtoi(s);
    
        if (result != expected) {
            console.log(`Test failed\nExpected:'${expected}'.\nGot: '${result}'`)
        } else {
            console.log("Test passed")
        }
    }
}

test();