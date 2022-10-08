import PrimsMaze3DGenerator from "./prims-maze3D-generator.js";
import Maze3DAdapter from "../search-algorithms/adapter.js";
import DepthFirstSearch from "../search-algorithms/depth-first-search.js";
import BreadthFirstSearch from "../search-algorithms/breadth-first-search.js";
import AStar from "../search-algorithms/astar.js";
import MazeDisplay from "./generate-maze-display.js";

//initial maze display
const mazeDisplayGen = new PrimsMaze3DGenerator(1, 11, 11);
const mazeDisplay3D = mazeDisplayGen.generate();
console.log(mazeDisplay3D.toString());
const mazeDisplay = new MazeDisplay(mazeDisplay3D, "../images/character.png", "../images/end-arrow.png");
mazeDisplay.generate();
const mazeDisplayLevel = document.querySelector("div.start");
mazeDisplayLevel.hidden = false;

//form validation
const btnSubmit = document.getElementById("startGame");
const name = document.getElementById("name");
const nameError = document.querySelector("#name + p.error");
const rows = document.getElementById("rows");
const rowsError = document.querySelector("#rows + p.error");
const cols = document.getElementById("cols");
const colsError = document.querySelector("#cols + p.error");
const levels = document.getElementById("levels");
const levelsError = document.querySelector("#levels + p.error");

function checkNameValidity() {
    if (name.checkValidity()) {
        nameError.textContent = "";
        nameError.className = "error";
        return true;
    }

    if (name.validity.valueMissing) {
        nameError.textContent = "Please enter a name.";
    } else if (name.validity.patternMismatch) {
        nameError.textContent = "Name must be alphabetic.";
    }
    nameError.className = "error active";
    return false;
}

function checkRowsValidity() {
    if (rows.checkValidity()) {
        rowsError.textContent = "";
        rowsError.className = "error";
        return true;
    }

    if (rows.validity.valueMissing) {
        rowsError.textContent = "Please enter a number of rows.";
    } else if (rows.validity.rangeUnderflow) {
        rowsError.textContent = "Row number must be a positive integer greater than 2.";
    } else if (rows.validity.patternMismatch) {
        rowsError.textContent = "Row number must be a positive integer.";
    }
    rowsError.className = "error active";
    return false;
}

function checkColsValidity() {
    if (cols.checkValidity()) {
        colsError.textContent = "";
        colsError.className = "error";
        return true;
    }

    if (cols.validity.valueMissing) {
        colsError.textContent = "Please enter a number of columns.";
    } else if (cols.validity.rangeUnderflow) {
        colsError.textContent = "Column number must be a positive integer greater than 2.";
    } else if (cols.validity.patternMismatch) {
        colsError.textContent = "Column number must be a positive integer.";
    }
    colsError.className = "error active";
    return false;
}

function checkLevelsValidity() {
    if (levels.checkValidity()) {
        levelsError.textContent = "";
        levelsError.className = "error";
        return true;
    }

    if (levels.validity.valueMissing) {
        levelsError.textContent = "Please enter a number of levels.";
    } else if (levels.validity.rangeUnderflow) {
        levelsError.textContent = "Level number must be a positive integer.";
    } else if (levels.validity.patternMismatch) {
        levelsError.textContent = "Level number must be a positive integer.";
    }
    levelsError.className = "error active";
    return false;
}

name.addEventListener("input", checkNameValidity);
rows.addEventListener("input", checkRowsValidity);
cols.addEventListener("input", checkColsValidity);
levels.addEventListener("input", checkLevelsValidity);

btnSubmit.addEventListener("click", e => {
    const validName = checkNameValidity();
    const validRows = checkRowsValidity();
    const validCols = checkColsValidity();
    const validLevels = checkLevelsValidity();

    if (!validName || !validRows || !validCols || !validLevels) {
        e.preventDefault();
    }

    //start game
    if (validName && validRows && validCols && validLevels) {
        const mazeGrid = document.getElementById("maze");
        mazeGrid.firstChild.remove();

        const mazeGen = new PrimsMaze3DGenerator(Number(levels.value), Number(rows.value), Number(cols.value));
        const maze3D = mazeGen.generate();
        console.log(maze3D.toString());
        const maze = new MazeDisplay(maze3D, "../images/character.png", "../images/end-arrow.png");
        maze.generate();
        maze.run();
    }
});
