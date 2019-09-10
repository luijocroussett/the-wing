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
    let columnsArray = [];
    const minesObj = {
      count: 0,
      mineBoard: {}
    };
    for (let index = 0; index < columns; index++) {
      columnsArray.push('empty');
    }
    for (let index = 0; index < rows; index++) {
      boardObj[index] = columnsArray;
    }
    while (minesObj.count < difficulty[level].numberOfMines) {
      let currentRow = Math.floor(Math.random() * difficulty[level].size.rows);
      let currentColumn = Math.floor(Math.random() * difficulty[level].size.columns);
      console.log(currentRow, currentColumn,boardObj[currentRow][currentColumn], minesObj.count, difficulty[level].numberOfMines)
      console.log(boardObj)
      if (boardObj[currentRow][currentColumn] === 'empty') {
        // boardObj[currentRow][currentColumn] = 'mine';
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
    return {...gameObj, id}
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
    else if (gameObj.board[row][column] !== 'empty') return new Error('Position already flagged');
    gameObj.board[row][column] = 'flagged';
    return gameObj;
  },
}
