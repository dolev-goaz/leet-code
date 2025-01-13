import { compareArrays } from "./array";

type TestCase<TArgs, TReturn> = [TArgs, TReturn];

export function testMethod<TArgs extends any[], TReturn>(
    testMethod: (...args: TArgs) => TReturn,
    testCases: TestCase<TArgs, TReturn>[],
    options: { multipleInputs: boolean },
): void;

export function testMethod<TArg, TReturn>(
    testMethod: (arg: TArg) => TReturn,
    testCases: TestCase<TArg, TReturn>[],
    options?: { multipleInputs: false },
): void;

export function testMethod<TArg, TReturn>(
    testMethod: (...arg: any) => TReturn,
    testCases: TestCase<TArg, TReturn>[],
    options?: { multipleInputs: boolean },
){
    const isArgsArray = options?.multipleInputs;
    let errorCount = 0;
    for(const [args, expected] of testCases) {
        // @ts-ignore 
        const result = isArgsArray? testMethod(...args): testMethod(args);
    
        const success = Array.isArray(expected)? compareArrays(result as any[], expected): (result == expected);
        if (!success) {
            console.error(`Test failed\nExpected: '${expected}'.\nGot     : '${result}'`)
            ++errorCount
        }
    }
    if (errorCount == 0) {
        console.log("Test passed!");
    }
}