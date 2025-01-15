/*
    Given a linked list, swap every two adjacent nodes and return its head.
    You must solve the problem without modifying the values in the list's nodes (i.e., only nodes themselves may be changed.)

    Input: head = [1,2,3,4]
    Output: [2,1,4,3]

    Input: head = []
    Output: []

    Input: head = [1]
    Output: [1]

    Input: head = [1,2,3]
    Output: [2,1,3]
*/

import { testMethod } from "../test_utils";

class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.next = (next===undefined ? null : next)
    }
}

function swapPairs(head: ListNode | null): ListNode | null {
    if (!head || !head.next) return head;
    const newHead = head.next;

    head.next = newHead.next;
    newHead.next = head;

    while (head && head.next && head.next.next) {
        // next1 <-> next2

        const next1: ListNode = head.next;
        const next2 = head.next.next;

        head.next = next2;
        next1.next = next2.next;
        next2.next = next1;

        head = next1;
    }

    return newHead;
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

function methodWrapper(l1: number[]) {
    const res = swapPairs(createListNode(l1));
    return res? toArray(res): [];
}

testMethod(methodWrapper, [
    [[[1,2,3,4]], [2,1,4,3]],
    // [[[1,2,3]], [2,1,3]],
    // [[[1]], [1]],
    // [[[]], []],
], { multipleInputs: true });