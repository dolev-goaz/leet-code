import { testMethod } from "../test_utils";

class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.next = (next===undefined ? null : next)
    }
}

function reverse(beforeHead: ListNode, tail: ListNode) {
    if (!beforeHead.next) return beforeHead;
    let cur = beforeHead.next;
    let next: ListNode;
    let prev = null;

    while (prev != tail) {
        next = cur.next!;
        cur.next = prev;
        prev = cur;
        cur = next;
    }
    beforeHead.next = tail;
    while (tail.next) {
        tail = tail.next;
    }
    tail.next = cur;

    return tail;
}

function reverseKGroup(head: ListNode | null, k: number): ListNode | null {
    if (!head || !head.next || k == 1) return head;
    // at least 2 elements, k>=2
    const dummy = new ListNode(0, head);
    let tempHead = dummy;

    let kGroupEnd: ListNode;
    while (tempHead) {
        kGroupEnd = tempHead;
        // make sure the kgroup exists(length wise)
        for(let i = 0; i < k; ++i) {
            if (!kGroupEnd.next) return dummy.next; // not enough elements for another reverse
            kGroupEnd = kGroupEnd.next;
        }
        const newTail = reverse(tempHead, kGroupEnd);
        tempHead = newTail;
    }

    return dummy.next;
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

function methodWrapper(list: number[], n: number) {
    const res = reverseKGroup(createListNode(list), n);
    return res? toArray(res): [];
}

testMethod(methodWrapper, [
    [[[1,2,3,4,5], 2], [2,1,4,3,5]],
    [[[1,2,3,4,5], 3], [3,2,1,4,5]],
], { multipleInputs: true });