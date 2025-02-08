import { testMethod } from "../test_utils";

function simplifyPath(path: string): string {
    const components = path.replace(/\/{2,}/, '/').split('/'); // replace isn't really necessary
    const stack: string[] = [];

    for(let component of components) {
        if (!component) continue;
        switch(component) {
            case "..":
                stack.pop();
                break;
            case ".":
                break;
            default:
                stack.push(component);
                break;
        }
    }
    return "/" + stack.join("/");
};

testMethod(simplifyPath, [
    ["/home/", "/home"],
    ["/home//foo/", "/home/foo"],
    ["/home/user/Documents/../Pictures", "/home/user/Pictures"],
    ["/../", "/"],
    ["/.../a/../b/c/../d/./", "/.../b/d"],
]);