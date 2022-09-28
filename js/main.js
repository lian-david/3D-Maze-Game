import SimpleMaze3DGenerator from "./simple-maze3D-generator.js";
import DFSMaze3DGenerator from "./dfs-maze3D-generator.js";
import PrimsMaze3DGenerator from "./prims-maze3D-generator.js";

// const maze = new SimpleMaze3DGenerator(3, 5, 5);
// const genMaze = maze.generate();
// console.log(genMaze.toString());

const maze = new DFSMaze3DGenerator(3, 5, 5);
const genMaze = maze.generate();
console.log(genMaze.toString());

// const maze = new PrimsMaze3DGenerator(3, 5, 5);
// const genMaze = maze.generate();
// console.log(genMaze.toString());