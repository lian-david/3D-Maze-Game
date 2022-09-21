import Maze3D from "./maze3D.js";
import Maze3DGenerator from "./maze3D-generator.js";
import SimpleMaze3DGenerator from "./simple-maze3D-generator.js";

// const maze = new Maze3D(5, 5);
// console.log(maze.toString());

// const mazeGen = new Maze3DGenerator(5, 5);
// console.log(mazeGen.measureAlgorithmTime());

const maze = new SimpleMaze3DGenerator(5, 5);
const genMaze = maze.generateMaze();
console.log(genMaze);