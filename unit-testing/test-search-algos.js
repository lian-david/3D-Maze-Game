import PrimsMaze3DGenerator from "../js/prims-maze3D-generator";
import Maze3DAdapter from "../search-algorithms/adapter";
import Searchable from "../search-algorithms/searchable";
import SearchAlgorithm from "../search-algorithms/search-algorithm";
import DepthFirstSearch from "../search-algorithms/depth-first-search";
import BreadthFirstSearch from "../search-algorithms/breadth-first-search";
import AStar from "../search-algorithms/astar";

test("throws on constructor", () => {
    expect(() => {
        const maze = new PrimsMaze3DGenerator(3, 5, 5);
        new Searchable(maze);
    }).toThrow();
});

test("throws on constructor", () => {
    expect(() => {
        new SearchAlgorithm();
    }).toThrow();
});

test(".arrayContaining", () => {
    const mazeGen = new PrimsMaze3DGenerator(3, 5, 5);
    const maze = mazeGen.generate();
    const adapter = new Maze3DAdapter(maze);
    const dfs = new DepthFirstSearch();
    const path = dfs.search(adapter);
    expect(path).toEqual(expect.arrayContaining([maze.end]));
});

test(".arrayContaining", () => {
    const mazeGen = new PrimsMaze3DGenerator(3, 5, 5);
    const maze = mazeGen.generate();
    const adapter = new Maze3DAdapter(maze);
    const bfs = new BreadthFirstSearch();
    const path = bfs.search(adapter);
    expect(path).toEqual(expect.arrayContaining([maze.end]));
});

test(".arrayContaining", () => {
    const mazeGen = new PrimsMaze3DGenerator(3, 5, 5);
    const maze = mazeGen.generate();
    const adapter = new Maze3DAdapter(maze);
    const astar = new AStar();
    const path = astar.search(adapter);
    expect(path).toEqual(expect.arrayContaining([maze.end]));
});