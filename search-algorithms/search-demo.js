import DFSMaze3DGenerator from "./js/dfs-maze3D-generator";
import Maze3DAdapter from "./search-algorithms/adapter";
import BreadthFirstSearch from "./search-algorithms/breadth-first-search";
import DepthFirstSearch from "./search-algorithms/depth-first-search";
import AStar from "./search-algorithms/astar";

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

        return `Number of states evaluated: \n BFS: ${bfsStates} \n DFS: ${dfsStates} \n ${astarStates}`;
    }
}

export default SearchDemo;