import { testMethod } from "../test_utils";

const keyboard = {
    "2": "abc",
    "3": "def",
    "4": "ghi",
    "5": "jkl",
    "6": "mno",
    "7": "pqrs",
    "8": "tuv",
    "9": "wxyz"
};

function letterCombinations(digits: string): string[] {
    if (digits.length == 0) return [];
    const letters = keyboard[digits[0] as keyof typeof keyboard];
    if (digits.length == 1) return letters.split("");
    const acc: string[] = [];

    const res = letterCombinations(digits.slice(1));
    letters.split("").forEach((letter) => {
        acc.push(...res.map((item) => `${letter}${item}`))
    });
    
    return acc;
};

testMethod(letterCombinations, [
    // ["23", ["ad","ae","af","bd","be","bf","cd","ce","cf"]],
    // ["", []],
    // ["2", ["a", "b", "c"]],
    ["234", ["adg","adh","adi","aeg","aeh","aei","afg","afh","afi","bdg","bdh","bdi","beg","beh","bei","bfg","bfh","bfi","cdg","cdh","cdi","ceg","ceh","cei","cfg","cfh","cfi"]],
])