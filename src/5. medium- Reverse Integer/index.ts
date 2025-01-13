/*
Given a signed 32-bit integer x, return x with its digits reversed.
If reversing x causes the value to go outside the signed 32-bit integer range [-231, 231 - 1], then return 0.
Assume the environment does not allow you to store 64-bit integers (signed or unsigned). 
*/

const MAX_VALUE = (1 << 30) * 2 - 1;
const MIN_VALUE = (1 << 31); // overflows to negative max

function checkWillOverflow(x: number, add: number) {
    if (x > 0) {
        // x * 10 + add > MAX_VALUE
        return (MAX_VALUE - add) / 10 < x;
    }

    // x * 10 + add < MIN_VALUE
    return (MIN_VALUE- add) / 10 > x
}

function reverse(x: number): number {
    let out = 0;
    let sign = 1;
    if (x < 0) {
        sign = -1;
        x = -x;
    }
    while (x) {
        if (checkWillOverflow(out, x % 10)) return 0;
        out *= 10;
        out += sign*(x % 10);
        x = Math.floor(x / 10);
    }
    return out;
};

function test() {
    const tests: Array<[number, number]> = [
        [123, 321],
        [-123, -321],
        [120, 21],
        [1463847412, 2147483641]
    ];
    
    for(const [s, expected] of tests) {
        const result = reverse(s);
    
        if (result != expected) {
            console.log(`Test failed\nExpected:'${expected}'.\nGot: '${result}'`)
        } else {
            console.log("Test passed")
        }
    }
}

test();