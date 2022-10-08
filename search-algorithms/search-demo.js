import DFSMaze3DGenerator from "../js/dfs-maze3D-generator.js";
import Maze3DAdapter from "./adapter.js";
import BreadthFirstSearch from "./breadth-first-search.js";
import DepthFirstSearch from "./depth-first-search.js";
import AStar from "./astar.js";

class SearchDemo {
    run() {
        const mazeGen = new DFSMaze3DGenerator(3, 5, 5);
        const maze = mazeGen.generate();
        
        const adapter = new Maze3DAdapter(maze);

        const bfs = new BreadthFirstSearch();
        bfs.search(adapter);
        const bfsStates = bfs.getNumberOfNodesEvaluated();

        const dfs = new DepthFirstSearch();
        dfs.search(adapter);
        const dfsStates = dfs.getNumberOfNodesEvaluated();

        const astar = new AStar();
        astar.search(adapter);
        const astarStates = astar.getNumberOfNodesEvaluated();

        return `Number of states evaluated: \n BFS: ${bfsStates} \n DFS: ${dfsStates} \n A*: ${astarStates}`;
    }
}

export default SearchDemo;