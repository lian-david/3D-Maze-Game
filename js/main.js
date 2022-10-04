import SimpleMaze3DGenerator from "./simple-maze3D-generator.js";
import DFSMaze3DGenerator from "./dfs-maze3D-generator.js";
import PrimsMaze3DGenerator from "./prims-maze3D-generator.js";
import Maze3DAdapter from "../search-algorithms/adapter.js";
import DepthFirstSearch from "../search-algorithms/depth-first-search.js";
import BreadthFirstSearch from "../search-algorithms/breadth-first-search.js";
import AStar from "../search-algorithms/astar.js";

// const maze = new SimpleMaze3DGenerator(3, 5, 5);
// const genMaze = maze.generate();
// console.log(genMaze.toString());
// console.log(maze.measureAlgorithmTime());

// const maze2 = new DFSMaze3DGenerator(3, 5, 5);
// const genMaze2 = maze2.generate();
// console.log(genMaze2.toString());
// console.log(maze2.measureAlgorithmTime());


// const maze3 = new PrimsMaze3DGenerator(3, 5, 5);
// const genMaze3 = maze3.generate();
// console.log(genMaze3.toString());
// console.log(maze3.measureAlgorithmTime());

// const adapter = new Maze3DAdapter(genMaze3);
// const dfs = new DepthFirstSearch();
// console.log(dfs.search(adapter));
// console.log(dfs.getNumberOfNodesEvaluated());
// const bfs = new BreadthFirstSearch();
// console.log(bfs.search(adapter));
// console.log(bfs.getNumberOfNodesEvaluated());
// const astar = new AStar();
// console.log(astar.search(adapter));
// console.log(astar.getNumberOfNodesEvaluated());
