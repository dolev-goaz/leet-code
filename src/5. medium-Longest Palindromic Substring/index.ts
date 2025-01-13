// https://leetcode.com/problems/longest-palindromic-substring/

import { testMethod } from "../test_utils";

/*
    Given a string s, return the longest palindromic substring in s.

    Input: s = "babad"
    Output: "bab"
    Explanation: "aba" is also a valid answer.

    Input: s = "cbbd"
    Output: "bb"
*/

function longestPalindrome(s: string): string {
    if (s.length <= 1) return s;
    let max = s[0];
    // initialize is_palindrome map
    // const is_palindrome: Array<Array<boolean>> =
    //     Array
    //         .from(s)
    //         .map(() => Array
    //                     .from(s)
    //                     .map(() => false));

    const is_palindrome: Array<Array<boolean>> = new Array(s.length);
    for (let i = 0; i < s.length; i++) {
        is_palindrome[i] = new Array(s.length);
        for (let j = 0; j < s.length; j++) {
            is_palindrome[i][j] = false;
        }
    }


    // is_palindrome[s.length - 1][s.length - 1] = true; // missing case from the loop, not necessary
    for(let start_i = 0; start_i < s.length - 1; ++start_i) {
        // base cases
        is_palindrome[start_i][start_i] = true;
        is_palindrome[start_i][start_i + 1] = (s[start_i] == s[start_i+1]);
        if (is_palindrome[start_i][start_i+1]) {
            max = max.length < 2? s.slice(start_i, start_i + 2): max;
        }

        for (let radius = 1; radius <= start_i && start_i + radius < s.length; ++radius) {
            const pal_start = start_i - radius, pal_end = start_i + radius;
            // 1 letter base
            is_palindrome[pal_start][pal_end] =
                is_palindrome[pal_start+1][pal_end-1] && s[pal_start] == s[pal_end];

            // 2 letter base
            is_palindrome[pal_start][pal_end+1] =
                is_palindrome[pal_start+1][pal_end] && s[pal_start] == s[pal_end+1];


            if (is_palindrome[pal_start][pal_end+1]) { // 2 letter base is new max
                max = (2 * radius + 2) > max.length? s.slice(pal_start, pal_end + 2): max;
            } else if (is_palindrome[pal_start][pal_end]) { // 1 letter base is new max
                max = (2 * radius + 1) > max.length? s.slice(pal_start, pal_end + 1): max;
            }

        }
    }
    
    return max;
};

testMethod(longestPalindrome, [
    ["babad", "bab"],
    ["cbbd", "bb"],
    ["aaaaa", "aaaaa"],
    ["aaaa", "aaaa"],
]);