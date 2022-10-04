import Cell from "./cell.js";

/**
 * Maze3D class represents the maze as a 3-dimensional array of cells
 */
class Maze3D {
    #rows
    #cols
    #levels
    #cellTypes

    constructor(levels, rows, cols) {
        this.#rows = rows;
        this.#cols = cols;
        this.#levels = this.generateLevels(levels);

        this.#cellTypes = new Map([
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

    get rows() {
        return this.#rows;
    }

    get cols() {
        return this.#cols;
    }

    get levels() {
        return this.#levels;
    }

    /**
     * Function to generate each level's grid
     * @param {Number} levels 
     * @returns array of level objects
     */
    generateLevels(levels) {
        let numLevels = [];

        for (let x = 0; x < levels; x++) {
            let level = {
                grid: this.generateGrid()
            };

            numLevels.push(level);
        }
        return numLevels;
    }

    /**
     * Function to generate array from given rows and columns for each level
     * @returns array of matrix cells 
     */
    generateGrid() {
        let mat = new Array(this.#rows);
        for (let i = 0; i < mat.length; i++) {
            mat[i] = new Array(this.#cols);
            for (let j = 0; j < mat[i].length; j++) {
                mat[i][j] = new Cell([i, j]);
            }
        }
        return mat;
    }

    /**
     * Function to return string representation of maze
     * @returns string displaying maze
     */
    toString() {
        let mappedGrid = "";
        let num = 0;
        for (const level of this.levels) {
            let map = `Level ${num}:\n`;
            let outline = " ";
            for (let c = 0; c < this.#cols; c++) {
                outline += "--";
            }
            map += outline + "\n";
            for (let x = 0; x < level.grid.length; x++) {
                let border = "\n|";
                for (let y = 0; y < level.grid[x].length; y++) {
                    let cellLocation = level.grid[x][y];
                    if (cellLocation.values.left) {
                        let cellType = this.#cellTypes.get("wall");
                        map += cellType;
                    } else {
                        map += " ";
                    }
                    if (cellLocation.values.up && cellLocation.values.down) {
                        let cellType = this.#cellTypes.get("upDown");
                        map += cellType;
                    } else {
                        if (cellLocation.values.up) {
                            let cellType = this.#cellTypes.get("up");
                            map += cellType;
                        }
                        if (cellLocation.values.down) {
                            let cellType = this.#cellTypes.get("down");
                            map += cellType;
                        }
                    }
                    if (cellLocation.values.back) {
                        let cellType = this.#cellTypes.get("midWall");
                        border += cellType;
                    } else {
                        border += " ";
                    }
                    if (y < this.#cols - 1) {
                        let cellType = this.#cellTypes.get("+")
                        border += cellType;
                    }
                    if (cellLocation.values.start) {
                        let cellType = this.#cellTypes.get("S");
                        map += cellType;
                    }
                    if (cellLocation.values.end) {
                        let cellType = this.#cellTypes.get("E");
                        map += cellType;
                    }
                    if (cellLocation.values.up === false && cellLocation.values.down === false &&  
                        cellLocation.values.start === false && cellLocation.values.end === false) {
                        map += " ";
                    } 
                    if (y === this.#cols - 1 && cellLocation.values.right) {
                        let cellType = this.#cellTypes.get("wall");
                        map += cellType;
                    }
                }
                if (x < level.grid.length - 1) {
                    map += border + "|\n";
                }
            }
            mappedGrid += map + "\n" + outline + "\n\n";
            num++;
        }
        return mappedGrid;
    }
}

export default Maze3D;