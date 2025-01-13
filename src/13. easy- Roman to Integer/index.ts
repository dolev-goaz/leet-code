import { testMethod } from "../test_utils";

const entries: [string, number][] = [
    ['M', 1000],
    ['CM', 900],
    ['D', 500],
    ['CD', 400],
    ['C', 100],
    ['XC', 90],
    ['L', 50],
    ['XL', 40],
    ['X', 10],
    ['IX', 9],
    ['V', 5],
    ['IV', 4],
    ['I', 1],
];

function romanToInt(s: string): number {
    let out = 0;
    while (s) {
        const current = entries.find((pair) => s.startsWith(pair[0]))!; // assuming valid roman
        out += current[1];
        s = s.slice(current[0].length);
    }
    return out;
};

testMethod(romanToInt, [
        ["MMMDCCXLIX", 3749],
        ["LVIII", 58],
        ["MCMXCIV", 1994],
]);