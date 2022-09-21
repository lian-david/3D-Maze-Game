import Cell from "./cell.js";

/**
 * Maze3D class represents the maze as a 3-dimensional array of cells
 */
class Maze3D {
    #rows
    #cols
    #cellTypes

    constructor(rows, cols) {
        this.#rows = rows;
        this.#cols = cols;
        this.levels = [];
        
        this.levels[0] = {
            grid: this.generateGrid()
        };
        this.levels[0].cells = this.generateCells(this.levels[0].grid);

        this.levels[1] = {
            grid: this.generateGrid()
        };
        this.levels[1].cells = this.generateCells(this.levels[1].grid);

        this.levels[2] = {
            grid: this.generateGrid()
        };
        this.levels[2].cells = this.generateCells(this.levels[2].grid);

        this.#cellTypes = new Map([
            [0, " "],
            ["wall", "|"],
            ["midWall", "-"],
            ["+", "+"],
            ["up", "↑"],
            ["down", "↓"],
            ["upDown", "↕"],
            ["S", "S"],
            ["E", "E"]
        ]);
    }

    /**
     * Function to generate array from given rows and columns for each level
     * @returns array of matrix cells 
     */
    generateGrid() {
        let mat = new Array(this.#rows);
        for (let i = 0; i < mat.length; i++) {
            mat[i] = new Array(this.#cols);
            for (let j = 0; j < mat.length; j++) {
                mat[i][j] = 0;
            }
        }
        return mat;
    }

    /**
     * Function to generate instance of Cell for every cell
     * @param {Array} grid 
     * @returns array of instances of Cell
     */
    generateCells(grid) {
        let cells = [];
        for (let x = 0; x < grid.length; x++) {
            for (let y = 0; y < grid[x].length; y++) {
                let cellLocation = grid[x][y];
                let cell = new Cell(cellLocation);
                cells.push(cell);
            }
        }
        return cells;
    }

    /**
     * Generates string of given matrix symbols
     * @param {Array} level 
     * @returns string representation of matrix
     */
    generateMaze(level) {
        let mappedGrid = "\n ";
        let border = "";
        for (let x = 0; x < level.grid.length; x++) {
            mappedGrid += "__";
            border += "-+";
        }

        for (let x = 0; x < level.grid.length; x++) {
            mappedGrid += "\n|";
            for (let y = 0; y < level.grid[x].length; y++) {
                let cellLocation = level.grid[x][y];
                let cellType = this.#cellTypes.get(cellLocation);
                //put if statement for walls here, probs replace space string 
                mappedGrid += cellType + " ";
            }
            mappedGrid += "|";
            if (x === level.grid.length - 1) {
                break;
            } else {
                // mappedGrid += "\n|" + "|";
                mappedGrid += "\n|" + border + "|";
            }
        }

        mappedGrid += "\n ";
        for (let x = 0; x < level.grid.length; x++) {
            mappedGrid += "--";
        }

        return mappedGrid;
    }

    /**
     * Function to return string representation of maze
     * @returns string displaying maze
     */
    toString() {
        return `Level 0: ${this.generateMaze(this.levels[0])}
        \nLevel 1: ${this.generateMaze(this.levels[1])}
        \nLevel 2: ${this.generateMaze(this.levels[2])}`;
    }
}

export default Maze3D;