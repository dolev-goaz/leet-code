import { testMethod } from "../test_utils";

const BOARD_SIZE = 9;

const rowMap = new Map<number, Set<number>>();
const colMap = new Map<number, Set<number>>();
const squareMap = new Map<number, Set<number>>();

const zeroCharCode = '0'.charCodeAt(0);

const squareIndices = Array.from({ length: BOARD_SIZE }, (_, i) => 
    Array.from({ length: BOARD_SIZE }, (_, j) => Math.floor(i / 3) * 3 + Math.floor(j / 3))
);


function loadMaps(board: string[][]): void {
    rowMap.clear();
    colMap.clear();
    squareMap.clear();

    for(let row = 0; row < BOARD_SIZE; ++row) {
        const seen = Array.from({length: BOARD_SIZE}).fill(false) as boolean[];
        // get all possible for current row
        
        for(let col = 0; col < BOARD_SIZE; ++col) {
            const current = board[row][col];
            if (current === ".") continue;
            seen[current.charCodeAt(0) - zeroCharCode - 1] = true;
        }

        const acc = new Set<number>();
        for(let i = 0; i < seen.length; ++i) {
            if (!seen[i]) acc.add(i+1);
        }

        rowMap.set(row, acc);
    }

    for(let col = 0; col < BOARD_SIZE; ++col) {
        const seen = Array.from({length: BOARD_SIZE}).fill(false) as boolean[];
        // get all possible for current col
        
        for(let row = 0; row < BOARD_SIZE; ++row) {
            const current = board[row][col];
            if (current === ".") continue;
            seen[current.charCodeAt(0) - zeroCharCode - 1] = true;
        }

        const acc = new Set<number>();
        for(let i = 0; i < seen.length; ++i) {
            if (!seen[i]) acc.add(i+1);
        }

        colMap.set(col, acc);
    }

    for(let square = 0; square < BOARD_SIZE; ++square) {
        const square_start_x = (square % 3) * 3;
        const square_start_y = Math.floor(square / 3) * 3;
        const seen = Array.from({length: BOARD_SIZE}).fill(false) as boolean[];
        for(let y_offset = 0; y_offset < 3; ++y_offset) {
            for(let x_offset = 0; x_offset < 3; ++x_offset) {
                const current = board[square_start_y + y_offset][square_start_x + x_offset];
                if (current === ".") continue;
                seen[current.charCodeAt(0) - zeroCharCode - 1] = true;
            }
        }

        const acc = new Set<number>();
        for(let i = 0; i < seen.length; ++i) {
            if (!seen[i]) acc.add(i+1);
        }

        squareMap.set(square, acc);
    }

}

function getAvailableValues(row: number, col: number) {
    const squareIndex = squareIndices[row][col];
    return new Set(
        [...rowMap.get(row)!].filter(
            (value) => colMap.get(col)!.has(value) && squareMap.get(squareIndex)!.has(value)
        )
    );
}

function removeAvailableValue(row: number, col: number, value: number) {
    const squareIndex = squareIndices[row][col];
    colMap.get(col)!.delete(value)
    rowMap.get(row)!.delete(value)
    squareMap.get(squareIndex)!.delete(value);
}
function restoreAvailableValue(row: number, col: number, value: number) {
    const squareIndex = squareIndices[row][col];
    colMap.get(col)!.add(value)
    rowMap.get(row)!.add(value)
    squareMap.get(squareIndex)!.add(value);
}

function solveRecursive(board: string[][], cell_index: number) {
    for (let i = cell_index; i < BOARD_SIZE * BOARD_SIZE; ++i) {
        const row = Math.floor(i / BOARD_SIZE);
        const col = i % BOARD_SIZE;

        if (board[row][col] !== ".") continue;
        const available = getAvailableValues(row, col);
        for(let value of available) {
            board[row][col] = String.fromCharCode(value + "0".charCodeAt(0));
            removeAvailableValue(row, col, value);
            const success = solveRecursive(board, cell_index + 1);
            if (success) return true;
            restoreAvailableValue(row, col, value);
        }
        // no solution if we reached here (tried all possible solutions)
        board[row][col] = '.'; // restore
        return false;

    }
    return true;
}

function solveSudoku(board: string[][]): void {
    loadMaps(board);
    // assumes there is always a solution
    solveRecursive(board, 0);
};


// testing

function testWrapper(board: string[][]) {
    solveSudoku(board);
    return board;
}


const board1 = [["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]];
const solution1 = [["5","3","4","6","7","8","9","1","2"],["6","7","2","1","9","5","3","4","8"],["1","9","8","3","4","2","5","6","7"],["8","5","9","7","6","1","4","2","3"],["4","2","6","8","5","3","7","9","1"],["7","1","3","9","2","4","8","5","6"],["9","6","1","5","3","7","2","8","4"],["2","8","7","4","1","9","6","3","5"],["3","4","5","2","8","6","1","7","9"]];

testMethod(testWrapper,[
    [board1, solution1]
]);