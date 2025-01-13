// https://leetcode.com/problems/two-sum/

import { testMethod } from "../test_utils";
import { compareArrays } from "../test_utils/array";

/*
    Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
    You may assume that each input would have exactly one solution, and you may not use the same element twice.
    You can return the answer in any order.

    Input: nums = [2,7,11,15], target = 9
    Output: [0,1]
    Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].

    Input: nums = [3,2,4], target = 6
    Output: [1,2]

    Input: nums = [3,3], target = 6
    Output: [0,1]
*/

function twoSum(nums: number[], target: number): [number, number] {
    const map = new Map<number, number>();

    for(let i = 0; i < nums.length; ++i) {
        let current = nums[i];
        if (map.has(current)) {
            return [map.get(current)!, i];
        }
        map.set(target-current, i);
    }
    return [-1, -1]; // shouldn't reach here
};

testMethod(twoSum, [
    [[[2,7,11,15], 9], [0, 1]],
    [[[3,2,4], 6], [1, 2]],
    [[[3,3], 6], [0, 1]],
], { multipleInputs: true })