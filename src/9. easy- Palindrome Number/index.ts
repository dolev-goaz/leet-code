/*
Given an integer x, return true if x is a palindrome, and false otherwise.
*/

function getDigitCount(x: number) {
    return x <= 1? 1: Math.ceil(Math.log10(x));
}

function isPalindrome(x: number): boolean {
    if (x < 0) return false;
    const digitCount = getDigitCount(x);
    const half = Math.floor(digitCount / 2);
    const digitStack: number[] = [];

    for(let i =0; i < half; ++i) {
        digitStack.push(x % 10);
        x = Math.floor(x / 10);
    }

    if (digitCount % 2 == 1) {
        x = Math.floor(x / 10); // ignore center digit
    }

    while (x) {
        if ((x % 10) != digitStack.pop()) return false;
        x = Math.floor(x / 10);
    }

    return true;
};

function test() {
    const tests: Array<[number, boolean]> = [
        [121, true],
        [-121, false],
        [10, false],
        [1221, true],
        [1222, false]
    ];
    
    for(const [s, expected] of tests) {
        const result = isPalindrome(s);
    
        if (result != expected) {
            console.log(`Test failed\nExpected:'${expected}'.\nGot: '${result}'`)
        } else {
            console.log("Test passed")
        }
    }
}

test();