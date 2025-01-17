/*
    Given a string containing just the characters '(' and ')',
    return the length of the longest valid (well-formed) parentheses substring.
*/

import { testMethod } from "../test_utils";

function longestValidParentheses(s: string): number {
    const valid = Array.from({length: s.length}).fill(false) as boolean[];
    const stack = [];

    for(let i = 0; i < s.length; ++i) {
        if (s[i] == '(') {
            stack.push(i); // index of paren start
        } else {
            const corresponding = stack.pop();
            if (corresponding === undefined) continue;
            valid[corresponding] = true;
            valid[i] = true;
        }
    }
    // now find longest block

    let max = 0;
    let acc = 0;
    for(let i = 0; i < valid.length; ++i) {
        if (valid[i]) {
            acc += 1;
            continue;
        }

        // end of block
        max = Math.max(max, acc);
        acc = 0;
    }
    max = Math.max(max, acc);
    return max;
};

testMethod(longestValidParentheses, [
    ["(()", 2],
    [")()())", 4],
    ["", 0],
    [")(()()))", 6],
]);