import { testMethod } from "../test_utils";
import { createListNode, toArray } from "../test_utils/linked-list";

class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.next = (next===undefined ? null : next)
    }
}

function findMin(lists: Array<ListNode | null>) {
    let min = 1e5; // min value
    let minIndex = -1;
    for(let i = 0; i < lists.length; ++i) {
        const list = lists[i];
        if (!list) continue;
        if (list.val < min) {
            min = list.val;
            minIndex = i;
        }
    }
    return minIndex;
}

function mergeKLists(lists: Array<ListNode | null>): ListNode | null {
    if (lists.every((list) => !list)) return null; // if all lists are null
    const dummy = new ListNode();
    let current = dummy;
    while (true){
        const minIndex = findMin(lists);
        if (minIndex == -1) return dummy.next;
        current.next = lists[minIndex];
        current = current.next!;
        lists[minIndex] = lists[minIndex]!.next;
    }
};

function methodWrapper(lists: Array<number[]>) {
    const nodeLists = lists.map(createListNode);
    const res = mergeKLists(nodeLists);
    return toArray(res);
}

testMethod(methodWrapper, [
    [[[1,4,5],[1,3,4],[2,6]], [1,1,2,3,4,4,5,6]],
    [[], []],
    [[[]], []],
]);