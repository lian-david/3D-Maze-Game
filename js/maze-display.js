import Maze3D from "./maze3D.js";
import BreadthFirstSearch from "../search-algorithms/breadth-first-search.js";
import DepthFirstSearch from "../search-algorithms/depth-first-search.js";
import AStar from "../search-algorithms/astar.js";
import Maze3DAdapter from "../search-algorithms/adapter.js";

class MazeDisplay {
    #maze
    #playerImage
    #endImage
    #width
    #height
    #startX
    #startY
    #currLevel
    #currX
    #currY
    #gridX
    #gridY

    /**
     * @param {Maze3D} maze 
     */
    constructor(maze, playerImage, endImage) {
        this.#maze = maze;
        this.#playerImage = playerImage;
        this.#endImage = endImage;
        this.#currLevel = maze.start[0];
        this.#currX = maze.start[1];
        this.#currY = maze.start[2];
        this.#gridX = this.#maze.start[1] * 2;
        this.#gridY = this.#maze.start[2] * 2;
    }

    /**
     * Generates HTML display of Maze3D
     * @param {Number} level 
     */
    generate(level) {
        const mazeGrid = document.getElementById("maze");
        this.#width = mazeGrid.clientWidth / (this.#maze.cols * 2 - 1);
        this.#height = mazeGrid.clientHeight / (this.#maze.rows * 2 - 1);
        const levelGrid = document.createElement("div");
        levelGrid.style.position = "relative";

        for (let x = 0; x < this.#maze.levels[level].grid.length; x++) {
            const row = document.createElement("div");
            row.className = "grid";
            const rowWalls = document.createElement("div");
            rowWalls.className = "grid";
            
            for (let y = 0; y < this.#maze.levels[level].grid[x].length; y++) {
                const cell = document.createElement("div");
                cell.className = "cell";
                cell.style.width = this.#width + "px";
                cell.style.height = this.#height + "px";
                row.appendChild(cell);
                if (y < this.#maze.cols - 1) {
                    if (this.#maze.levels[level].grid[x][y].values.right === true) {
                        const wall = document.createElement("div");
                        wall.className = "wall";
                        wall.style.width = this.#width + "px";
                        wall.style.height = this.#height + "px";
                        row.appendChild(wall);
                    } else {
                        const cell = document.createElement("div");
                        cell.className = "cell";
                        cell.style.width = this.#width + "px";
                        cell.style.height = this.#height + "px";
                        row.appendChild(cell);
                    }
                } 
                
                if (this.#maze.levels[level].grid[x][y].values.back === true) {
                    const wall = document.createElement("div");
                    wall.className = "wall";
                    wall.style.width = this.#width + "px";
                    wall.style.height = this.#height + "px";
                    rowWalls.appendChild(wall);
                } else {
                    const cell = document.createElement("div");
                    cell.className = "cell";
                    cell.style.width = this.#width + "px";
                    cell.style.height = this.#height + "px";
                    rowWalls.appendChild(cell);
                }

                if (this.#maze.levels[level].grid[x][y].values.right === true && y < this.#maze.cols - 1) {
                    const wall2 = document.createElement("div");
                    wall2.className = "wall";
                    wall2.style.width = this.#width + "px";
                    wall2.style.height = this.#height + "px";
                    rowWalls.appendChild(wall2);
                } else if (y < this.#maze.cols - 1) {
                    const cell = document.createElement("div");
                    cell.className = "cell";
                    cell.style.width = this.#width + "px";
                    cell.style.height = this.#height + "px";
                    rowWalls.appendChild(cell);
                }
                
                if (this.#maze.levels[level].grid[x][y].values.start === true) {
                    const char = new Image(this.#width, this.#height);
                    char.src = this.#playerImage;
                    char.id = "player";
                    char.className = "player";
                    cell.after(char);
                    char.style.position = "absolute";
                    char.style.left = y * this.#width * 2 - char.clientWidth + "px";
                    char.style.top = x * this.#height * 2 - char.clientHeight + "px";
                    this.#startX = y * this.#width * 2 - char.clientWidth;
                    this.#startY = x * this.#height * 2 - char.clientHeight;
                }

                if (this.#maze.levels[level].grid[x][y].values.end === true) {
                    const end = new Image(this.#width, this.#height);
                    end.src = this.#endImage;
                    end.id = "end";
                    cell.replaceWith(end);
                }
            }
            levelGrid.appendChild(row);
            if (x < this.#maze.rows - 1) {
                levelGrid.appendChild(rowWalls);
            }
        }
        mazeGrid.appendChild(levelGrid);
    }

    /**
     * Regenerates grid for level ahead
     */
    #moveLevelUp() {
        const maze = document.getElementById("maze");
        const player = document.getElementById("player");

        this.#currLevel++;
        maze.firstChild.remove();
        this.generate(this.#currLevel);
        if (this.#currLevel === this.#maze.start[0]) {
            const startPlayer = document.getElementById("player");
            startPlayer.remove();
        } 
        maze.firstChild.appendChild(player);
    }

    /**
     * Regenerates grid for level below
     */
    #moveLevelDown() {
        const maze = document.getElementById("maze");
        const player = document.getElementById("player");

        this.#currLevel--;
        maze.firstChild.remove();
        this.generate(this.#currLevel);
        if (this.#currLevel === this.#maze.start[0]) {
            const startPlayer = document.getElementById("player");
            startPlayer.remove();
        } 
        maze.firstChild.appendChild(player);
    }

    /**
     * Resets player to start of maze
     */
    #restart() {
        const player = document.getElementById("player");

        if (this.#currLevel !== this.#maze.start[0]) {
            this.#currLevel = this.#maze.start[0];
            this.#currX = this.#maze.start[1];
            this.#currY = this.#maze.start[2];
            this.#gridX = this.#maze.start[1] * 2;
            this.#gridY = this.#maze.start[2] * 2;
            maze.firstChild.remove();
            this.generate(this.#currLevel);
            const startPlayer = document.getElementById("player");
            startPlayer.replaceWith(player);
        } else {
            player.style.left = this.#startX + "px";
            player.style.top = this.#startY + "px";
            this.#gridX = this.#maze.start[1] * 2;
            this.#gridY = this.#maze.start[2] * 2;
            this.#currX = this.#maze.start[1];
            this.#currY = this.#maze.start[2];
        }
    }

    /**
     * Generates path to end of maze
     * @returns path of maze solution
     */
    #getPath() {
        const search = document.getElementById("search");
        const bfs = new BreadthFirstSearch();
        const dfs = new DepthFirstSearch();
        const astar = new AStar();
        this.#currX = Math.round(this.#currX);
        this.#currY = Math.round(this.#currY);
        this.#maze.start = [this.#currLevel, Math.round(this.#currX), Math.round(this.#currY)];
        const adapter = new Maze3DAdapter(this.#maze);

        let path;
        if (search.value === "bfs") {
            path = bfs.search(adapter);
        } else if (search.value === "dfs") {
            path = dfs.search(adapter);
        } else if (search.value === "astar") {
            path = astar.search(adapter);
        }
        return path;
    }

    /**
     * Moves player for each move in path solution
     * @param {Array} move 
     */
    #solveMove(move) {
        const player = document.getElementById("player");
        
        if (move[0] > this.#currLevel) {
            this.#moveLevelUp();
        } else if (move[0] < this.#currLevel) {
            this.#moveLevelDown();
        }

        if (move[1] > this.#currX) {
            player.style.top = player.offsetTop + (this.#height * 2) + "px";
            this.#currX++;
            this.#gridX += 2;
        } else if (move[1] < this.#currX) {
            player.style.top = player.offsetTop - (this.#height * 2) + "px";
            this.#currX--;
            this.#gridX -= 2;
        }

        if (move[2] > this.#currY) {
            player.style.left = player.offsetLeft + (this.#width * 2) + "px";
            player.style.transform = "scaleX(1)";
            this.#currY++;
            this.#gridY += 2;
        } else if (move[2] < this.#currY) {
            player.style.left = player.offsetLeft - (this.#width * 2) + "px";
            player.style.transform = "scaleX(-1)";
            this.#currY--;
            this.#gridY -= 2;
        }
    }

    /**
     * Moves player to next best move
     */
    #getHint() {
        const mazeStart = this.#maze.start;
        const path = this.#getPath();
        this.#solveMove(path[1]);
        this.#maze.start = mazeStart;   
    }

    /**
     * Saves maze to local storage 
     */
    #save() {
        const name = document.getElementById("name");
        const prevName = document.getElementById("prevName");
        
        this.#maze.levels[this.#maze.start[0]].grid[this.#maze.start[1]][this.#maze.start[2]].values.start = false;
        this.#maze.levels[this.#currLevel].grid[Math.round(this.#currX)][Math.round(this.#currY)].values.start = true;
        this.#maze.start = [this.#currLevel, Math.round(this.#currX), Math.round(this.#currY)];
        if (name.value) {
            localStorage.setItem(name.value, JSON.stringify(this.#maze));
        } else if (prevName.value) {
            localStorage.setItem(prevName.value, JSON.stringify(this.#maze));
        }
    }

    /**
     * Generates game over display 
     */
    #gameOver() {
        const maze = document.getElementById("maze");
        const gameOverImage = document.getElementById("gameOver");
        const moveBtns = document.getElementById("moveButtons");

        gameOverImage.style.width = maze.clientWidth / 2 + "px";
        gameOverImage.style.height = maze.clientHeight / 2 + "px";
        gameOverImage.style.marginTop = maze.clientHeight / 4 + "px";
        gameOverImage.style.marginLeft = maze.clientWidth / 4 + "px";
        maze.firstChild.remove();
        maze.appendChild(gameOverImage);
        gameOverImage.hidden = false;
        moveBtns.hidden = true;
    }

    /**
     * Generates document events for playing 
     */
    run() {
        const restart = document.getElementById("restart");
        restart.hidden = false;
        const solve = document.getElementById("solve");
        const hint = document.getElementById("hint");
        hint.hidden = false;
        const save = document.getElementById("save");
        save.hidden = false;
        const moveUp = document.getElementById("moveUp");
        const moveDown = document.getElementById("moveDown");
        const maze = document.getElementById("maze");
        const player = document.getElementById("player");

        document.addEventListener("keydown", e => {
            const x = Math.round(this.#currX);
            const y = Math.round(this.#currY);

            if (this.#maze.levels[this.#currLevel].grid[x][y].values.up === true) {
                moveUp.hidden = false;
            } else {
                moveUp.hidden = true;
            }

            if (this.#maze.levels[this.#currLevel].grid[x][y].values.down === true) {
                moveDown.hidden = false;
            } else {
                moveDown.hidden = true;
            }

            if (this.#maze.levels[this.#currLevel].grid[x][y].values.end === true) {
                this.#gameOver();
            }

            switch(e.key) {
                case "ArrowRight":
                    if (player.offsetLeft + this.#width <= maze.clientWidth - player.clientWidth && 
                        !maze.firstChild.children[this.#gridX].children[this.#gridY + 1].classList.contains("wall")) {
                            player.style.left = player.offsetLeft + this.#width + "px";
                            player.style.transform = "scaleX(1)";
                            this.#currY += 0.5;
                            this.#gridY++;
                            
                    }
                    break;
                case "ArrowLeft":
                    if (player.offsetLeft - this.#width >= 0 &&
                        !maze.firstChild.children[this.#gridX].children[this.#gridY - 1].classList.contains("wall")) {
                            player.style.left = player.offsetLeft - this.#width + "px";
                            player.style.transform = "scaleX(-1)";
                            this.#currY -= 0.5;
                            this.#gridY--;
                    }
                    break;
                case "ArrowUp":
                    if (player.offsetTop - this.#height >= 0 &&
                        !maze.firstChild.children[this.#gridX - 1].children[this.#gridY].classList.contains("wall")) {
                            player.style.top = player.offsetTop - this.#height + "px";
                            this.#currX -= 0.5;
                            this.#gridX--;
                        }
                    break;
                case "ArrowDown":
                    if (player.offsetTop + this.#height <= maze.clientHeight - player.clientHeight &&
                        !maze.firstChild.children[this.#gridX + 1].children[this.#gridY].classList.contains("wall")) {
                            player.style.top = player.offsetTop + this.#height + "px";
                            this.#currX += 0.5;
                            this.#gridX++;
                        }
                    break; 
            }
        });

        restart.addEventListener("click", () => {
            this.#restart();
        });

        moveUp.addEventListener("click", () => {
            this.#moveLevelUp();
            moveUp.hidden = true;
        });

        moveDown.addEventListener("click", () => {
            this.#moveLevelDown();
            moveDown.hidden = true;
        })

        save.addEventListener("click", () => {
            this.#save();
        });

        hint.addEventListener("click", () => {
            this.#getHint();
        });

        solve.addEventListener("click", () => {
            restart.hidden = true;
            hint.hidden = true;
            const path = this.#getPath();
            player.style.transition = "left 0.5s, top 0.5s";

            for (let i = 0; i < path.length; i++) {
                let j = i;
                setTimeout(() => {
                    this.#solveMove(path[j]);
                }, 1000 * (j + 1));
            }
        });
    }
}

export default MazeDisplay;