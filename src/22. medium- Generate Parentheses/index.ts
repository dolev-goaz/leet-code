/*
    Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.

    Example 1:
    Input: n = 3
    Output: ["((()))","(()())","(())()","()(())","()()()"]

    Example 2:
    Input: n = 1
    Output: ["()"]

    My Example 1:
    Input: n = 2
    Output: ["()()", (())]
*/

import { testMethod } from "../test_utils";

function myGenParen(acc: string, lCount: number, rCount: number, n: number): string[] {
    // assume lCount >= rCount
    if (rCount == n) return [acc];
    const out: string[] = [];
    if (lCount < n) out.push(...myGenParen(acc+ "(", lCount + 1, rCount, n));
    if (rCount < lCount) out.push(...myGenParen(acc+ ")", lCount, rCount + 1, n));
    return out;
}

function generateParenthesis(n: number): string[] {
    return myGenParen("(", 1, 0, n);
};

testMethod(generateParenthesis, [
    [1, ["()"]],
    [2, ["(())", "()()"]],
    [3, ["((()))","(()())","(())()","()(())","()()()"]]
]);