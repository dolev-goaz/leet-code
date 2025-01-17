/* 
    The value of a triplet of indices (i, j, k) is equal to (nums[i] - nums[j]) * nums[k].
*/

import { testMethod } from "../test_utils";

function maximumTripletValue(nums: number[]): number {
    let maxValue = -Infinity;
    for(let k = 0; k < nums.length; ++k) {
        for(let j = 0; j < k; ++j) {
            for(let i = 0; i < j; ++i) {
                const value = (nums[i]-nums[j])*nums[k];
                if (value > maxValue) {
                    maxValue = value;
                }
            }
        }
    }
    return maxValue > 0? maxValue: 0;
};

testMethod(maximumTripletValue, [
    [[12,6,1,2,7], 77],
    // [[1,10,3,4,19], 133],
    // [[1,2,3], 0],
])