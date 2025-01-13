// https://leetcode.com/problems/longest-substring-without-repeating-characters/
/*
    Given a string s, find the length of the longest substring without repeating characters.

    Input: s = "abcabcbb"
    Output: 3
    Explanation: The answer is "abc", with the length of 3.

    Input: s = "bbbbb"
    Output: 1
    Explanation: The answer is "b", with the length of 1.

    Input: s = "pwwkew"
    Output: 3
    Explanation: The answer is "wke", with the length of 3.
    Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.

*/

// solution is done via sliding-window
function lengthOfLongestSubstring(s: string): number {
    if (!s) return 0;
    let max = 1;
    const set = new Set<string>(); // stores all characters we encountered

    let start_i = 0, curr_i = start_i;


    while (curr_i < s.length) {
        const current_char = s[curr_i];
        if (set.has(current_char)) {
            const current_length = curr_i - start_i; // + 1 - 1, because we count up to *last* character
            if (current_length > max) {
                max = current_length;
            }
            while (set.has(current_char)) {
                set.delete(s[start_i]);
                ++start_i; // at most, stops at start_i = curr_i
            }
        }
        set.add(current_char);

        ++curr_i;
    }

    const current_length = curr_i - start_i; // +1 -1, because curr_i should be s.length
    return current_length > max? current_length: max;
};

// testing
function test() {
    const tests: Array<[string, number]> = [
        ["abbabcbb", 3],
        ["bbbbb", 1],
        ["pwwkew", 3],
    ];
    
    for(const [s, expected] of tests) {
        const result = lengthOfLongestSubstring(s);
    
        if (result != expected) {
            console.log("Test failed")
        } else {
            console.log("Test passed")
        }
    }
}

test();