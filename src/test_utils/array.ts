
export function compareArrays<T>(a1: T[], a2: T[]) {
    if (a1.length != a2.length) return false;
    for(let i = 0; i < a1.length; ++i) {
        if (a1[i] != a2[i]) return false;
    }
    return true;
}