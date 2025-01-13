import { testMethod } from "../test_utils";

function isValid(s: string): boolean {
    const stack = [];

    for(let i = 0; i < s.length; i++) {
        switch(s[i]) {
            case '(':
            case '[':
            case '{':
                stack.push(s[i]);
                break;
            
            case ')':
                if (stack.pop() != '(') return false;
                break;
            case ']':
                if (stack.pop() != '[') return false;
                break;
            case '}':
                if (stack.pop() != '{') return false;
                break;
        }
    }

    return stack.length == 0;
};

testMethod(isValid, [
    ["()", true],
    ["()[]{}", true],
    ["(]", false],
    ["([])", true],
    ["())(", false],
    ["([)]", false],
]);