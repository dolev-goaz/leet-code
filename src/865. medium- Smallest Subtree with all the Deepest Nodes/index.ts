import { testMethod } from "../test_utils"

class TreeNode {
    val: number
    left: TreeNode | null
    right: TreeNode | null
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.left = (left===undefined ? null : left)
        this.right = (right===undefined ? null : right)
    }
}

function getDepth(root: TreeNode | null): [TreeNode | null, number] {
    if (!root) return [null, 0];
    
    const [l, d1] = getDepth(root.left);
    const [r, d2] = getDepth(root.right);
    
    if (d1 == d2) {
        return [root, d1 + 1];
    }
    if (d1 > d2) {
        return [l, d1 + 1];
    }
    return [r, d2 + 1];
}

function subtreeWithAllDeepest(root: TreeNode | null): TreeNode | null {
    return getDepth(root)[0];
};

// testing

function createTree(data: (number | null)[]) {
    if (!data.length || data[0] === null) return null;
    const out_head = new TreeNode(data[0]);
    const queue: TreeNode[] = [out_head];
    let i = 1;

    while (i < data.length) {
        const current = queue.shift();
        if (!current) break;
        // Process left child
        if (data[i] !== null) {
            current.left = new TreeNode(data[i]!);
            queue.push(current.left);
        }
        i++;

        // Process right child
        if (i < data.length && data[i] !== null) {
            current.right = new TreeNode(data[i]!);
            queue.push(current.right);
        }
        i++;
    }

    return out_head;
}

function toArray(root: TreeNode | null): (number | null)[] {
    if (!root) return [];

    const result: (number | null)[] = [];
    const queue: (TreeNode | null)[] = [root];

    while (queue.length > 0) {
        const current = queue.shift();

        if (current) {
            result.push(current.val);
            queue.push(current.left);
            queue.push(current.right);
        } else {
            result.push(null);
        }
    }

    // Remove trailing `null` values to match the desired format
    while (result[result.length - 1] === null) {
        result.pop();
    }

    return result;
}

function testWrapper(tree_data: (number | null)[]) {
    const tree = createTree(tree_data);
    const res = subtreeWithAllDeepest(tree);
    return toArray(res);
}

testMethod(testWrapper, [
    [[3,5,1,6,2,0,8,null,null,7,4], [2,7,4]],
    [[1], [1]],
    [[0,1,3,null,2], [2]],
]);