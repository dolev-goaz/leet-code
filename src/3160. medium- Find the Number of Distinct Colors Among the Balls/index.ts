import { testMethod } from "../test_utils";

type Color = number;
type Query = [number, Color];
function queryResults(limit: number, queries: Query[]): number[] {
    const colorCountMap = new Map<Color, number>();
    // const ballColors = new Int32Array(limit + 1);
    const ballColorMap = new Map<number, Color>();
    
    const out: Array<number> = new Array(queries.length);
    queries.forEach(([ballIndex, color], queryIndex) => {
        const currentBallColor = ballColorMap.get(ballIndex);
        if (currentBallColor) {
            // remove previous color
            const colorCount = colorCountMap.get(currentBallColor)!;
            if (colorCount == 1) colorCountMap.delete(currentBallColor);
            else colorCountMap.set(currentBallColor, colorCount - 1);
        }
        // set current color
        ballColorMap.set(ballIndex, color);
        const colorCount = colorCountMap.get(color) ?? 0;
        colorCountMap.set(color, colorCount + 1);

        // set current color count
        out[queryIndex] = colorCountMap.size;
    });

    return out;
};

testMethod(queryResults, [
    [[4, [[1,4],[2,5],[1,3],[3,4]]], [1,2,2,3]],
    [[4, [[0,1],[1,2],[2,2],[3,4],[4,5]]], [1,2,2,3,4]],
    [[1, [[0,1],[0,4],[1,2],[1,5],[1,4]]], [1,1,2,2,1]],
], { multipleInputs: true })