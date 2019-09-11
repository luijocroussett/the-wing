const difficulty  = {
  'easy' : {
    size: {
      columns: 10, 
      rows: 10
    },
    numberOfMines: 10
  },
  'medium' : {
    size: {
      columns: 20, 
      rows: 20
    },
    numberOfMines: 20
  },
  'hard' : {
    size: {
      columns: 30, 
      rows: 30
    },
    numberOfMines: 30
  },
}

module.exports = {

  /**
   ************************
   @author Luis Croussett

   @method newGame
   @param {String}  level
   @returns {Object} a new gameObj
   */

  newGame: (level, id) => {
    console.log('Creating game of level: ',level)
    let {columns, rows} = difficulty[level].size;
    let boardObj = {};
    const minesObj = {
      count: 0,
      mineBoard: {}
    };
    for (let row = 0; row < rows; row++) {
      for (let column = 0; column < columns; column++) {
        if (!boardObj[row]) boardObj[row] = [];
        boardObj[row].push(0);
      }
    }
    while (minesObj.count < difficulty[level].numberOfMines) {
      let currentRow = Math.floor(Math.random() * difficulty[level].size.rows);
      let currentColumn = Math.floor(Math.random() * difficulty[level].size.columns);
      if (boardObj[currentRow][currentColumn] === 0) {
        boardObj[currentRow][currentColumn] = 'mine';
        let currentValue = 0;
        if (currentRow < rows - 1) {
          currentValue = boardObj[currentRow+1][currentColumn];
          if (typeof currentValue === 'number') boardObj[currentRow+1][currentColumn] += 1;
        }
        if (currentRow > 0) {
          currentValue = boardObj[currentRow-1][currentColumn];
          if (typeof currentValue === 'number') boardObj[currentRow-1][currentColumn] += 1;
        }
        if (currentColumn < columns - 1) {
          currentValue = boardObj[currentRow][currentColumn+1];
          if (typeof currentValue === 'number') boardObj[currentRow][currentColumn+1] += 1;
        }
        if (currentColumn > 0) {
          currentValue = boardObj[currentRow][currentColumn-1];
          if (typeof currentValue === 'number') boardObj[currentRow][currentColumn-1] += 1;
        }
        if (currentRow < rows - 1 && currentColumn < columns - 1) {
          currentValue = boardObj[currentRow+1][currentColumn+1];
          if (typeof currentValue === 'number') boardObj[currentRow+1][currentColumn+1] += 1;
        }
        if (currentColumn > 0 && currentRow < rows - 1) {
          currentValue = boardObj[currentRow+1][currentColumn-1];
          if (typeof currentValue === 'number') boardObj[currentRow+1][currentColumn-1] += 1;
        }
        if (currentRow > 0 && currentColumn < columns - 1 ) {
          currentValue = boardObj[currentRow-1][currentColumn+1];
          if (typeof currentValue === 'number') boardObj[currentRow-1][currentColumn+1] += 1;
        }
        if (currentRow > 0 && currentColumn > 0) {
          currentValue = boardObj[currentRow-1][currentColumn-1];
          if (typeof currentValue === 'number') boardObj[currentRow-1][currentColumn-1] += 1;
        }
        if (!minesObj.mineBoard[currentRow]) minesObj.mineBoard[currentRow] = {};
        minesObj.mineBoard[currentRow][currentColumn] = true;
        minesObj.count++
      }
    }
    return {
      id,
      size: {
        rows: Number(rows), 
        columns: Number(columns)
      }, // board size
      board: boardObj, // board object
      mines: minesObj, // number of mines left and position of mines
      flags: {},
      emptyBoard: JSON.parse(JSON.stringify(boardObj)),
    }
  },

  /**
   * **********************
   @author Luis Croussett

   @method restart
   @param {Object}  gameObj
   @returns {Object} a new gameObj
   */

  restart: (gameObj) => {
    const id = gameObj.id;
    return {
      ...gameObj, 
      id, 
      board: JSON.parse(JSON.stringify(gameObj.emptyBoard)) 
    }
  },

  /**
   * **********************
   @author Luis Croussett

   @method move
   @param {String}  coordinates
   @param {Object}  gameObj
   @returns {Object} a new gameObj
   */

  move: (coordinates, gameObj) => {
    // validate coordinates are good
    const {column, row} = coordinates;
    if (row >= gameObj.size.row || column >= gameObj.size.column) 
      return new Error('Invalid Coordinates');
    else if (gameObj.board[row][column] !== 'empty')
      return new Error('Move already made');
    // make move logic
    return gameObj;
  },

  /**
   * **********************
   @author Luis Croussett

   @method markMine
   @param {String}  coordinates
   @param {Object}  gameObj
   @returns {Object} a new gameObj
   */

  markMine: (coordinates, gameObj) => {
    // validate coordinates are good
    const {column, row} = coordinates;
    if (row >= gameObj.size.row || column >= gameObj.size.column) 
      return new Error('Invalid Coordinates');
    else if (gameObj.flags[row][column]) return new Error('Position already flagged');
    if (!gameObj.flag[row]) gameObj.flag[row] = {};
    gameObj.flags[row][column] = true;
    return gameObj;
  },
}
