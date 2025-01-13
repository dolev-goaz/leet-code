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

function test() {
    const tests: Array<[string, number]> = [
        ["MMMDCCXLIX", 3749],
        ["LVIII", 58],
        ["MCMXCIV", 1994],
    ];
    
    for(const [s, expected] of tests) {
        const result = romanToInt(s);
    
        if (result != expected) {
            console.log(`Test failed\nExpected:'${expected}'.\nGot: '${result}'`)
        } else {
            console.log("Test passed")
        }
    }
}

test();