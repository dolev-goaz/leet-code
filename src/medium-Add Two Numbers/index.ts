// https://leetcode.com/problems/add-two-numbers/

import { compareArrays } from "../test_utils/array"

class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.next = (next===undefined ? null : next)
    }
}
/*
    You are given two non-empty linked lists representing two non-negative integers.
    The digits are stored in reverse order, and each of their nodes contains a single digit.
    Add the two numbers and return the sum as a linked list.

    Input: l1 = [2,4,3], l2 = [5,6,4]
    Output: [7,0,8]
    Explanation: 342 + 465 = 807.

    Input: l1 = [0], l2 = [0]
    Output: [0]

    Input: l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
    Output: [8,9,9,9,0,0,0,1]

*/

function getValue(l: ListNode | null) {
    return l === null? 0: l.val
}

function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode {
    if (!l1 || !l2) return l1? l1: l2!;
    const out_head = new ListNode();

    let current: ListNode = out_head;
    let carry: 0 | 1 = 0;

    while (l1 || l2) {
        const sum: number = getValue(l1) + getValue(l2) + carry;
        current.val = sum % 10;
        carry = (sum > 9)? 1: 0;

        l1 = l1?.next ?? null;
        l2 = l2?.next ?? null;

        if (l1 || l2) {
            // not last item- add more nodes
            current.next = new ListNode();
            current = current.next;
        }

    }

    if (carry) {
        current.next = new ListNode(1); // carried over new digit
    }
    
    return out_head;
};

// testing

function createListNode(data: number[]) {
    const out_head = new ListNode();
    let current = out_head;

    data.forEach((item, index) => {
        current.val = item;

        if (index < data.length-1) {
            // not last item- add more nodes
            current.next = new ListNode();
            current = current.next;
        }
    });

    return out_head;
}

function toArray(list: ListNode) {
    const out: number[] = [];
    let current: ListNode | null = list;
    while (current) {
        out.push(current.val);
        current = current.next;
    }
    return out;
}

const tests = [
    [[2,4,3], [5,6,4], [7,0,8]],
    [[0], [0], [0]],
    [[9,9,9,9,9,9,9], [9,9,9,9], [8,9,9,9,0,0,0,1]]
]

function test() {
    for(const [l1, l2, expected] of tests) {
        const l1_list = createListNode(l1);
        const l2_list = createListNode(l2);
        const result = toArray(addTwoNumbers(l1_list, l2_list));
    
        if (!compareArrays(result, expected)) {
            console.log("Test failed")
        } else {
            console.log("Test passed")
        }
    }
}
test();