import { testMethod } from "../test_utils";
import { createListNode, ListNode, toArray } from "../test_utils/linked-list";

function reverseBetween(head: ListNode | null, left: number, right: number): ListNode | null {
    if (!head || !head.next || (right==left)) return head;
    const dummyHead = new ListNode();
    dummyHead.next = head;

    let prevHead = dummyHead;
    let currentHead = head;
    for(let i = 1; i < left; ++i) {
        prevHead = currentHead;
        currentHead = currentHead.next!;
    }
    right = right - left + 1;
    // need to swap the next <right+1> items from currentHead
    let prev = prevHead, curr: ListNode | null = currentHead, next;
    while (curr && right > 0) {
        next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
        --right;
    }
    currentHead.next = curr;
    prevHead.next = prev;
    return dummyHead.next;
};

function methodWrapper(data: number[], left: number, right: number) {
    const head = createListNode(data);
    const res = reverseBetween(head, left, right);
    return toArray(res);
}

testMethod(methodWrapper, [
    [[[1,2,3,4,5], 2, 4], [1,4,3,2,5]],
    [[[5], 1, 1], [5]],
    [[[3,5], 1, 2], [5,3]],
], {multipleInputs: true});