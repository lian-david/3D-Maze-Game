import PrimsMaze3DGenerator from "./prims-maze3D-generator.js";
import MazeDisplay from "./maze-display.js";
import FormValidation from "./form-validation.js";

//initial maze display
const mazeDisplayGen = new PrimsMaze3DGenerator(1, 11, 11);
const mazeDisplay3D = mazeDisplayGen.generate();
console.log(mazeDisplay3D.toString());
const mazeDisplay = new MazeDisplay(mazeDisplay3D, "../images/character.png", "../images/end-arrow.png");
mazeDisplay.generate(0);

//form validation
const mazeGrid = document.getElementById("maze");
const btnSubmit = document.getElementById("startGame");
const name = document.getElementById("name");
const rows = document.getElementById("rows");
const cols = document.getElementById("cols");
const levels = document.getElementById("levels");
const validate = new FormValidation();

name.addEventListener("input", () => {
    validate.checkNameValidity();
});
rows.addEventListener("input", () => {
    validate.checkRowsValidity();
});
cols.addEventListener("input", () => {
    validate.checkColsValidity();
});
levels.addEventListener("input", () => {
    validate.checkLevelsValidity();
});

btnSubmit.addEventListener("click", e => {
    const validName = validate.checkNameValidity();
    const validRows = validate.checkRowsValidity();
    const validCols = validate.checkColsValidity();
    const validLevels = validate.checkLevelsValidity();

    if (!validName || !validRows || !validCols || !validLevels) {
        e.preventDefault();
    }

    //start game
    if (validName && validRows && validCols && validLevels) {
        mazeGrid.firstChild.remove();
        const mazeGen = new PrimsMaze3DGenerator(Number(levels.value), Number(rows.value), Number(cols.value));
        const maze3D = mazeGen.generate();
        console.log(maze3D.toString());
        const maze = new MazeDisplay(maze3D, "../images/character.png", "../images/end-arrow.png");
        maze.generate(maze3D.start[0]); 
        maze.run();
    }
});

//load previous game
const prevName = document.getElementById("prevName");
const prevNameError = document.querySelector("#prevName + p.error");
const loadBtn = document.getElementById("load");

prevName.addEventListener("input", () => {
    validate.checkPrevNameValidity();
});

loadBtn.addEventListener("click", e => {
    const validName = validate.checkPrevNameValidity();
    if (!validName) {
        e.preventDefault();
    }

    if (validName) {
        const prevMaze = localStorage.getItem(prevName.value);
        if (prevMaze) {
            mazeGrid.firstChild.remove();
            const prevMazeGen = JSON.parse(prevMaze);
            const newMaze = new MazeDisplay(prevMazeGen, "../images/character.png", "../images/end-arrow.png");
            newMaze.generate(prevMazeGen.start[0]);
            newMaze.run();
        } else {
            prevNameError.textContent = "Name not found.";
        }
    }
});