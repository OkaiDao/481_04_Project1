function getNeighbors(maze, r, c) {
    var row = r;
    var col = c;
    // Neighboring cells of the given one at (r, c)
    var neighbors = [];

    if (row + 2 >= 0 && row + 2 < maze.length && col >= 0 && col < maze[row].length &&
         maze[row + 2][col] === "IN") {
        neighbors.push([row + 2, col]);
    }
    if (row - 2 >= 0 && row - 2 < maze.length && col >= 0 && col < maze[row].length &&
         maze[row - 2][col] === "IN") {
        neighbors.push([row - 2, col]);
    }
    if (row >= 0 && row < maze.length && col + 2 >= 0 && col + 2 < maze[row].length &&
         maze[row][col + 2] === "IN") {
        neighbors.push([row, col + 2]);
    }
    if (row >= 0 && row < maze.length && col - 2 >= 0 && col - 2 < maze[row].length &&
         maze[row][col - 2] === "IN") {
        neighbors.push([row, col - 2]);
    }

    return neighbors;
}

// Checks if a row, col pair is already contained in the frontier
function frontierContains(frontier, row, col) {
    for (var i = 0; i < frontier.length; i++) {
        if (row === frontier[i][0] && col === frontier[i][1]) {
            return true;
        }
    }
    return false;
}

// Add cells to the frontier that are neighbors of the given cell
function addFrontier(r, c, maze, frontier) {
    var row = r;
    var col = c;


    if (row + 2 >= 0 && row + 2 < maze.length && col >= 0 && col < maze[row].length &&
         maze[row + 2][col] === "NOT IN" && frontierContains(frontier, row + 2, col) === false) {
        frontier.push([row + 2, col]);
    }
    if (row - 2 >= 0 && row - 2 < maze.length && col >= 0 && col < maze[row].length &&
         maze[row - 2][col] === "NOT IN" && frontierContains(frontier, row - 2, col) === false) {
        frontier.push([row - 2, col]);
    }
    if (row >= 0 && row < maze.length && col + 2 >= 0 && col + 2 < maze[row].length &&
         maze[row][col + 2] === "NOT IN" && frontierContains(frontier, row, col + 2) === false) {
        frontier.push([row, col + 2]);
    }
    if (row >= 0 && row < maze.length && col - 2 >= 0 && col - 2 < maze[row].length &&
         maze[row][col - 2] === "NOT IN" && frontierContains(frontier, row, col - 2) === false) {
        frontier.push([row, col - 2]);
    }
}

// Marks the frontier cell as being IN the maze.
// ie a place the person can walk on
function mark(frontier, maze, frontierNdx) {
    // Get the row and col of the frontier cell
    var r = frontier[frontierNdx][0];
    var c = frontier[frontierNdx][1];

    // Mark it as in the maze
    maze[r][c] = "IN";
    // Remove the given cell from the frontier
    frontier.splice(frontierNdx, 1);

    // Add the neighbors of the now included cell to the frontier
    addFrontier(r, c, maze, frontier);
}

function buildMaze(maze) {
    //Make this a random location within the 'maze'
    var neighbors;
    var randNdx;
    var nextFrontier;
    var endSpot;
    var startEnd = [];

    //Pick starting position to build maze from ie begin algorithm here this cell
    var startRow = Math.floor(Math.random() * maze.length);
    var startCol = Math.floor(Math.random() * maze[0].length);

    // index 0 contains the starting location
    startEnd.push([startRow, startCol]);

    //Cells to consider making part of the maze's path?
    var frontier = [];
    // Put the start cell in the frontier, guaranteed to be added as "IN" the maze
    // since only thing in the frontier; needed to begin the 'while' loop below
    frontier.push([startRow, startCol]);

    // mark() marks this first cell as being in the maze
    // and adds all its neighbors to the frontier
    mark(frontier, maze, 0);

    var frontierRow; // current row of cell connecting to the graph
    var frontierCol;
    var inNeighRow; // all frontier cells must have a neighbor in the maze
    var inNeighCol;
    // Keep going until no more cells in the "frontier"
    while (frontier.length > 0) {
        // Random index into the frontier
        nextFrontier = Math.floor(Math.random() * frontier.length);

        frontierRow = frontier[nextFrontier][0];
        frontierCol = frontier[nextFrontier][1];

        neighbors = getNeighbors(maze, frontierRow, frontierCol);

        mark(frontier, maze, nextFrontier);

        randNdx = Math.floor(Math.random() * neighbors.length);
        inNeighRow = neighbors[randNdx][0];
        inNeighCol = neighbors[randNdx][1];
        var frontRowNeigh = frontierRow - (frontierRow - inNeighRow) / 2;
        var frontColNeigh = frontierCol - (frontierCol - inNeighCol) / 2;
        maze[frontRowNeigh][frontColNeigh] = "IN";

        // Records the last cell to leave the frontier
        end = [frontRowNeigh, frontColNeigh];
        // Go through the neighbors and either add a path or a wall between them
        for (var i = 0; i < neighbors.length; i++) {

            // if this neighbor is not the one the frontier cell is connecting to
            if (i !== randNdx) {
                var nRow = neighbors[i][0];
                var nCol = neighbors[i][1];
                var rDiff = (frontierRow - nRow) / 2;
                var cDiff = (frontierCol - nCol) / 2;
                // Place a "WALL" between the frontier cell and this neighbor
                maze[nRow + rDiff][nCol + cDiff] = "WALL";
            }
        }


    }
    // Add the last "IN" part added to the maze as the coffee's (finish line) location
    startEnd.push(end);

    return startEnd;
}

// Returns a new 2D array identical in value
// to the given parameter
function mazeCopy(maze) {
    var newMaze = [];
    for (var r = 0; r < maze.length; r++) {
        newMaze.push([]);
        for (var c = 0; c < maze[r].length; c++) {
            newMaze[r][c] = maze[r][c];
        }
    }
    return newMaze;
}


// Finds the path to get back to the start position
// beginning from where the coffee is.
function backTrack(maze, endRow, endCol) {

    // Start from the end (coffee) location
    var curRow = endRow;
    var curCol = endCol;
    // Start with the total path length from start to end
    var distance = maze[curRow][curCol];
    var id; 

    while (distance > 0) { // distance = 0 at the start of maze
        distance = maze[curRow][curCol];
        id = "#r" + curRow + "c" + curCol;
        if (curRow + 1 >= 0 && curRow + 1 < maze.length && curCol >= 0 &&
            curCol < maze[0].length && maze[curRow + 1][curCol] === distance - 1) {
                    $(id).addClass("final");
                    curRow += 1;
        }
        else if (curRow - 1 >= 0 && curRow - 1 < maze.length && curCol >= 0 &&
                 curCol < maze[0].length && maze[curRow - 1][curCol] === distance - 1) {
                    $(id).addClass("final");
                    curRow -= 1;
        }
        else if (curRow >= 0 && curRow < maze.length && curCol + 1 >= 0 &&
                 curCol + 1 < maze[0].length && maze[curRow][curCol + 1] === distance - 1) {
                    $(id).addClass("final");
                    curCol += 1;
        }
        else if (curRow >= 0 && curRow < maze.length && curCol - 1 >= 0 &&
                 curCol - 1 < maze[0].length && maze[curRow][curCol - 1] === distance - 1) {
                    $(id).addClass("final");
                    curCol -= 1;
        }

    }
}

function solveMaze(maze, start) {
    var done = false;
    var queue = [];
    var currCell;
    var infinity = 8000;

    var row;
    var col;

    var newMaze = mazeCopy(maze);

    // Recreate the maze into a new object
    for (var r = 0; r < newMaze.length; r++) {
        for (var c = 0; c < newMaze[r].length; c++) {
            if (newMaze[r][c] === "IN" || newMaze[r][c] === "end") {
                newMaze[r][c] = infinity;
            }
            else { // WALL or NOT IN
                newMaze[r][c] = -1;
            }
        }
    }
    newMaze[start[0]][start[1]] = 0;

    // Push the starting position
    queue.push( [start[0], start[1]] );
    var currDistance;
    var endCol;
    var endRow;
    while (queue.length > 0 && done === false) {
        // Pop the first element
        currCell = queue.shift();
        //Get it's row and column
        row = currCell[0];
        col = currCell[1];
        currDistance = newMaze[row][col];

        // If it's the end; the coffee
        if (maze[row][col] === "end") {
            endRow = row;
            endCol = col;
            done = true;
        }
        else {
            // Add the neighbors (if within the bounds of the maze)
            // Check tentative distances, if tentative distance < current distance
            // add to queue and update the distance
            currDistance = newMaze[row][col];

            if (row + 1 >= 0 && row + 1 < newMaze.length && col >= 0 && col < newMaze[0].length && currDistance + 1 < newMaze[row + 1][col]) {
                if (newMaze[row + 1][col] !== -1) { // Not a wall
                    newMaze[row + 1][col] = currDistance + 1;
                    queue.push([row + 1, col]);
                }
            }
            if (row - 1 >= 0 && row - 1 < newMaze.length && col >= 0 && col < newMaze[0].length && currDistance + 1 < newMaze[row - 1][col]) {
                if (newMaze[row - 1][col] !== -1) { // Not a wall
                    newMaze[row - 1][col] = currDistance + 1;
                    queue.push([row - 1, col]);
                }
            }
            if (row >= 0 && row < newMaze.length && col + 1 >= 0 && col + 1 < newMaze[0].length && currDistance + 1 < newMaze[row][col + 1]) {
                if (newMaze[row][col + 1] !== -1) { // Not a wall
                    newMaze[row][col + 1] = currDistance + 1;
                    queue.push([row, col + 1]);
                }
            }
            if (row >= 0 && row < newMaze.length && col - 1 >= 0 && col - 1 >= 0 && col - 1 < newMaze[0].length && currDistance + 1 < newMaze[row][col - 1]) {
                if (newMaze[row][col - 1] !== -1) { // Not a wall
                    newMaze[row][col - 1] = currDistance + 1;
                    queue.push([row, col - 1]);
                }
            }
        }
    }

    // Backtrack to find shortestpath
    backTrack(newMaze, endRow, endCol);

}

// r and c for number of rows and columns respectively
// r and c taken from the textareas; may or may not be passed in
function start(r, c) {
    // Remove event listeners, and clear out the maze's div
    refreshPage();

    var maze = [];

    // Rows limited to size of 5 - 20
    // Columns limited to a size of 3 - 40
    // Should tell user that their sized map is not fitting their specs
    var rows = (r !== undefined && r !== "" && r <= 40 && r >= 10 ? r : 25);
    var cols = (c !== undefined && c !== "" && c <= 70 && c >= 5  ? c : 55);

    // Array to record the position of the maze's start and end
    // startEnd[0] = [startRow, startCo]
    // startEnd[1] = [endRow, endCol]
    var startEnd;

    for (var i = 0; i < rows; i++) {
        // Create arrays for each row/col
        maze.push([]);
    }

    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            maze[i].push("NOT IN");
        }
    }

    startEnd = buildMaze(maze);

    var startRow = startEnd[0][0];
    var startCol = startEnd[0][1];
    maze[startRow][startCol] = "start";

    var endRow = startEnd[1][0];
    var endCol = startEnd[1][1];
    maze[endRow][endCol] = "end";

    // Adds HTML to DOM to show maze
    // To change appearance of the maze such as color
    // edit in drawMaze()
    drawMaze(maze);

    $("#solve").on("click", function() {
        // Pass the maze and the start position
        solveMaze(maze, startEnd[0]);
    });


    $("#restart").on("click", function() {
        //Restart!
        start();
    });
}