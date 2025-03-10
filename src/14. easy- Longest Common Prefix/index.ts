import { testMethod } from "../test_utils";

function longestCommonPrefix(strs: string[]): string {
   if (strs.length == 0) return "";
   if (strs.length == 1) return strs[0];


   for(let curr = 0; curr < strs[0].length; ++curr) {
        const curr_char = strs[0][curr];
        for(let str_i = 1; str_i < strs.length; ++str_i) {
            if (strs[str_i].length <= curr) return strs[str_i];
            if (strs[str_i][curr] != curr_char) {
                return curr == 0? "":  strs[str_i].slice(0, curr);
            }
       }
   }
   return strs[0]; // never broke, all strs are at least the same length as first string
};

testMethod(longestCommonPrefix, [
        [["flower","flow","flight"], "fl"],
        [["flower","flower","flower","flower"], "flower"],
        [["dog","racecar","car"], ""],
]);