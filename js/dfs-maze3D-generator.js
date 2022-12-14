import Maze3DGenerator from "./maze3D-generator.js";

/**
 * Subclass of Maze3DGenerator to generate maze using Depth First Search 
 */
class DFSMaze3DGenerator extends Maze3DGenerator {
    constructor(levels, rows, cols) {
        super(levels, rows, cols);
    }

    /**
     * Generates maze 
     * @returns instance of Maze3D
     */
    generate() {
        const maze = super.generate();
        const coords = super.generateRandCoords();
        maze.levels[coords.startLevel].grid[coords.startRow][coords.startCol].values.start = true;
        maze.levels[coords.endLevel].grid[coords.endRow][coords.endCol].values.end = true;
        maze.start = [coords.startLevel, coords.startRow, coords.startCol];
        maze.end = [coords.endLevel, coords.endRow, coords.endCol];
        
        for (const level of maze.levels) {
            for (let x = 0; x < level.grid.length; x++) {
                for (let y = 0; y < level.grid[x].length; y++) {
                    if (y === 0) {
                        level.grid[x][y].values.left = true;
                    }
                    if (y === this.cols - 1) {
                        level.grid[x][y].values.right = true;
                    }
                    if (y !== 0) {
                        level.grid[x][y].values.left = true;
                        level.grid[x][y - 1].values.right = true;
                    }
                    if (x + 1 < level.grid.length) {
                        level.grid[x][y].values.back = true;
                        level.grid[x + 1][y].values.forward = true;
                    }
                    if (x === 0) {
                        level.grid[x][y].values.forward = true;
                    }
                    if (x === this.rows - 1) {
                        level.grid[x][y].values.back = true;
                    }
                }
            }
        }

        let stack = [[coords.startLevel, coords.startRow, coords.startCol]];
        let visited = [[coords.startLevel, coords.startRow, coords.startCol]];
        let currCell = [coords.startLevel, coords.startRow, coords.startCol];
        if (coords.startRow < this.rows - 1) {
            maze.levels[coords.startLevel].grid[coords.startRow][coords.startCol].values.back = false;
            maze.levels[coords.startLevel].grid[coords.startRow + 1][coords.startCol].values.forward = false;
        } else {
            maze.levels[coords.startLevel].grid[coords.startRow - 1][coords.startCol].values.back = false;
            maze.levels[coords.startLevel].grid[coords.startRow][coords.startCol].values.forward = false;
        }
        
        while (stack.length) {
            let neighbors = [[currCell[0], currCell[1] + 1, currCell[2]], [currCell[0], currCell[1] - 1, currCell[2]],
                [currCell[0], currCell[1], currCell[2] + 1], [currCell[0], currCell[1], currCell[2] - 1],
                [currCell[0] + 1, currCell[1], currCell[2]], [currCell[0] - 1, currCell[1], currCell[2]]];
            
            let notVisited = neighbors.filter(n => (n[0] >= 0 && n[0] < this.levels && n[1] >= 0 && n[1] < this.rows
                && n[2] > 0 && n[2] < this.cols && !visited.some(c => (n[0] === c[0] && n[1] === c[1] && n[2] === c[2]))));
            
            if (notVisited.length) {
                let n = notVisited[Math.floor(Math.random() * notVisited.length)];
                maze.levels[n[0]].grid[n[1]][n[2]].values.left = false;
                maze.levels[n[0]].grid[n[1]][n[2] - 1].values.right = false;
                if (n[1] < this.rows - 1) {
                    maze.levels[n[0]].grid[n[1]][n[2]].values.back = false;
                    maze.levels[n[0]].grid[n[1] + 1][n[2]].values.forward = false;
                }
                if (n[0] + 1 < this.levels && maze.levels[n[0] + 1].grid[n[1]][n[2]].values.start !== true
                    && maze.levels[n[0] + 1].grid[n[1]][n[2]].values.end !== true) {
                        maze.levels[n[0] + 1].grid[n[1]][n[2]].values.down = true;
                    }
                if (n[0] - 1 < this.levels && n[0] - 1 >= 0 && maze.levels[n[0] - 1].grid[n[1]][n[2]].values.start !== true
                    && maze.levels[n[0] - 1].grid[n[1]][n[2]].values.end !== true) {
                        maze.levels[n[0] - 1].grid[n[1]][n[2]].values.up = true;
                    }
                visited.push(n);
                stack.push(n);
                currCell = n;
            } else {
                currCell = stack.pop();
            }
            if (currCell[0] === coords.endLevel && currCell[1] === coords.endRow && currCell[2] === coords.endCol) {
                return maze;
            }
        }
    }
}

export default DFSMaze3DGenerator;