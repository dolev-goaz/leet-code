import { testMethod } from "../test_utils";

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

testMethod(intToRoman, [
    [3749, "MMMDCCXLIX"],
    [58, "LVIII"],
    [1994, "MCMXCIV"],
]);