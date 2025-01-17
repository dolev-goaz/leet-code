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

// function findMin(lists: Array<ListNode | null>) {
//     let min = 1e5; // min value
//     let minIndex = -1;
//     for(let i = 0; i < lists.length; ++i) {
//         const list = lists[i];
//         if (!list) continue;
//         if (list.val < min) {
//             min = list.val;
//             minIndex = i;
//         }
//     }
//     return minIndex;
// }

// function mergeKLists(lists: Array<ListNode | null>): ListNode | null {
//     if (lists.every((list) => !list)) return null; // if all lists are null
//     const dummy = new ListNode();
//     let current = dummy;
//     while (true){
//         const minIndex = findMin(lists);
//         if (minIndex == -1) return dummy.next;
//         current.next = lists[minIndex];
//         current = current.next!;
//         lists[minIndex] = lists[minIndex]!.next;
//     }
// };

function mergeSort2(l1: ListNode | null, l2: ListNode | null): ListNode | null {
    if (!l1 || !l2) return l1 ?? l2;
    
    const dummy = new ListNode();
    let head = dummy;
    while (l1 && l2) {
        if (l1.val < l2.val) {
            head.next = l1;
            head = head.next;
            l1 = l1.next;
            head.next = null;
        } else {
            head.next = l2;
            head = head.next;
            l2 = l2.next;
            head.next = null;
        }
    }

    head.next = (l1 ?? l2);
    return dummy.next;
}

function mergeSortDivideAndConquer(lists: Array<ListNode | null>, left: number, right: number): ListNode | null {
    if (left == right) return lists[left];
    const mid = Math.floor((left + right) / 2);
    const l1 = mergeSortDivideAndConquer(lists, left, mid);
    const l2 = mergeSortDivideAndConquer(lists, mid+1, right);
    return mergeSort2(l1, l2);
}

function mergeKLists(lists: Array<ListNode | null>): ListNode | null {
    if (lists.length == 0) return null;
    return mergeSortDivideAndConquer(lists, 0, lists.length - 1);
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