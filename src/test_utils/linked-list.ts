export class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.next = (next===undefined ? null : next)
    }
}

export function createListNode(data: number[]) {
    if (data.length === 0) return null;
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

export function toArray(list: ListNode | null) {
    const out: number[] = [];
    if (!list) return [];
    let current: ListNode | null = list;
    while (current) {
        out.push(current.val);
        current = current.next;
    }
    return out;
}
