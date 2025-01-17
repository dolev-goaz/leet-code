
export function compareArrays<T>(a1: T[], a2: T[]) {
    if (a1.length != a2.length) return false;
    for(let i = 0; i < a1.length; ++i) {
        if (Array.isArray(a1[i]) && Array.isArray(a2[i])) {
            if (!compareArrays(a1[i] as any[], a2[i]  as any[])) return false;
        } else if (a1[i] != a2[i]) return false;
    }
    return true;
}