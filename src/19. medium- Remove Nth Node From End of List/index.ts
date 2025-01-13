import { testMethod } from "../test_utils";

class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.next = (next===undefined ? null : next)
    }
}

function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
    if (!head) return null;

    let temp: ListNode | null = head;

    let size = 0;
    while (temp) {
        temp = temp.next;
        ++size;
    }

    const toRemove = size - n + 1;
    
    if (toRemove == 1) {
        // remove head
        if (!head.next) return null;
        return head.next;
    }

    temp = head;
    for(let i = 1; i < toRemove - 1; ++i) {
        temp = temp!.next;
    }

    temp!.next = temp!.next?.next ?? null;

    return head;
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
    const res = removeNthFromEnd(createListNode(list), n);
    return res? toArray(res): [];
}

testMethod(methodWrapper, [
    [[[1,2,3,4,5], 2], [1,2,3,5]],
    [[[1], 1], []],
    [[[1,2], 1], [1]],
    [[[1,2], 2], [2]],
], { multipleInputs: true });