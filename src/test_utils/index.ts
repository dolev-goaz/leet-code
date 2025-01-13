
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
    for(const [args, expected] of testCases) {
        // @ts-ignore 
        const result = isArgsArray? testMethod(...args): testMethod(args);
    
        if (result != expected) {
            console.log(`Test failed\nExpected:'${expected}'.\nGot: '${result}'`)
        } else {
            console.log("Test passed")
        }
    }

}