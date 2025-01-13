const entries: [number, string][] = [
    [1000, 'M'],
    [900, 'CM'],
    [500, 'D'],
    [400, 'CD'],
    [100, 'C'],
    [90, 'XC'],
    [50, 'L'],
    [40, 'XL'],
    [10, 'X'],
    [9, 'IX'],
    [5, 'V'],
    [4, 'IV'],
    [1, 'I']
];
function intToRoman(num: number, start: number = 0): string {
    if (num == 0) return "";
    
    let maxValueIndex = start;
    for(; maxValueIndex < entries.length && entries[maxValueIndex][0] > num; ++maxValueIndex);
    const maxPair = entries[maxValueIndex];
    
    let temp = maxPair[0];
    let count = 1;
    for(; temp + maxPair[0] <= num; ++count) {
        temp += maxPair[0];
    }

    return maxPair[1].repeat(count) + intToRoman(num - temp, maxValueIndex);
};

function test() {
    const tests: Array<[number, string]> = [
        [3749, "MMMDCCXLIX"],
        [58, "LVIII"],
        [1994, "MCMXCIV"],
    ];
    
    for(const [s, expected] of tests) {
        const result = intToRoman(s);
    
        if (result != expected) {
            console.log(`Test failed\nExpected:'${expected}'.\nGot: '${result}'`)
        } else {
            console.log("Test passed")
        }
    }
}

test();