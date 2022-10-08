import Maze3D from "./maze3D.js";

class MazeDisplay {
    #maze
    #characterImage
    #endImage

    /**
     * 
     * @param {Maze3D} maze 
     */
    constructor(maze, characterImage, endImage) {
        this.#maze = maze;
        this.#characterImage = characterImage;
        this.#endImage = endImage;
    }

    /**
     * Generates HTML display of Maze3D
     */
    generate() {
        const mazeGrid = document.getElementById("maze");
        const width = mazeGrid.clientWidth / (this.#maze.cols * 2 - 1);
        const height = mazeGrid.clientHeight / (this.#maze.rows * 2 - 1);
        let numLevels = 0;
         
        for (const level of this.#maze.levels) {
            const displayGrid = document.createElement("div");
            displayGrid.style.position = "relative";
            displayGrid.id = numLevels;
    
            for (let x = 0; x < level.grid.length; x++) {
                const row = document.createElement("div");
                row.className = "grid";
                const rowWalls = document.createElement("div");
                rowWalls.className = "grid";
                
                for (let y = 0; y < level.grid[x].length; y++) {
                    const cell = document.createElement("div");
                    cell.className = "cell";
                    cell.style.width = width + "px";
                    cell.style.height = height + "px";
                    row.appendChild(cell);
                    if (y < this.#maze.cols - 1) {
                        if (level.grid[x][y].values.right === true) {
                            const wall = document.createElement("div");
                            wall.className = "wall";
                            wall.style.width = width + "px";
                            wall.style.height = height + "px";
                            row.appendChild(wall);
                        } else {
                            const cell = document.createElement("div");
                            cell.className = "cell";
                            cell.style.width = width + "px";
                            cell.style.height = height + "px";
                            row.appendChild(cell);
                        }
                    } 
                    
                    if (level.grid[x][y].values.back === true) {
                        const wall = document.createElement("div");
                        wall.className = "wall";
                        wall.style.width = width + "px";
                        wall.style.height = height + "px";
                        rowWalls.appendChild(wall);
                    } else {
                        const cell = document.createElement("div");
                        cell.className = "cell";
                        cell.style.width = width + "px";
                        cell.style.height = height + "px";
                        rowWalls.appendChild(cell);
                    }

                    if (level.grid[x][y].values.right === true && y < this.#maze.cols - 1) {
                        const wall2 = document.createElement("div");
                        wall2.className = "wall";
                        wall2.style.width = width + "px";
                        wall2.style.height = height + "px";
                        rowWalls.appendChild(wall2);
                    } else if (y < this.#maze.cols - 1) {
                        const cell = document.createElement("div");
                        cell.className = "cell";
                        cell.style.width = width + "px";
                        cell.style.height = height + "px";
                        rowWalls.appendChild(cell);
                    }

                    if (level.grid[x][y].values.start === true) {
                        const char = new Image(width, height);
                        char.src = this.#characterImage;
                        char.id = "player";
                        cell.replaceWith(char);
                        char.style.position = "absolute";
                        char.style.left = y * width * 2 - char.clientWidth + "px";
                        char.style.top = x * height * 2 - char.clientHeight + "px";
                        displayGrid.className = "start";
                    }

                    if (level.grid[x][y].values.end === true) {
                        const char = new Image(width, height);
                        char.src = this.#endImage;
                        char.id = "end";
                        cell.replaceWith(char);
                    }
                }
                displayGrid.appendChild(row);
                if (x < this.#maze.rows - 1) {
                    displayGrid.appendChild(rowWalls);
                }
            }
            displayGrid.hidden = true;
            mazeGrid.appendChild(displayGrid);
            numLevels++;
        }
    }

    /**
     * Generates coordinates and events for playing 
     */
    run() {
        const startLevel = document.querySelector("div.start");
        startLevel.hidden = false;
        const maze = document.getElementById("maze");
        const player = document.getElementById("player");
        const cellsPerRow = this.#maze.cols * 2 - 1;
        const cellsPerColumn = this.#maze.rows * 2 - 1;

        const dx = maze.clientWidth / cellsPerRow;
        const dy = maze.clientHeight / cellsPerColumn;

        const directions = new Map([
            ["ArrowRight", [dx, 0]],
            ["ArrowLeft", [-dx, 0]],
            ["ArrowUp", [0, -dy]],
            ["ArrowDown", [0, dy]]
        ]);

        document.addEventListener("keydown", e => {
            if (directions.has(e.key)) {
                const direction = directions.get(e.key);
                const x = player.offsetLeft + direction[0];
                const y = player.offsetTop + direction[1];

                if (x >= 0 && x <= maze.clientWidth - player.clientWidth && 
                    y >= 0 && y <= maze.clientHeight - player.clientHeight) {
                        player.style.left = x + "px";
                        player.style.top = y + "px";
                    }
            }
        });
    }
}

export default MazeDisplay;