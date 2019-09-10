const {newGame, move, markMine, restart} = require('../utils/gameCommands');
const gamesObj = require('../db/db')

module.exports = {
  createNewGame: (req, res, next) => {
    // generating a randsom number that would represent a new id for a game
    let newGameId = Math.floor(Math.random() * 100000);
    let {level} = req.params.level ? req.params : null;
    let attempts = 1;
    const maxAttempts = 10
    // 10 is hard-coded as the number of attempts to generate a new game Id just to make sure that we are not caught on an infinite loop
    while (gamesObj.hasOwnProperty(newGameId) && maxAttempts <=10) {
      newGameId = Math.floor(Math.random() * 100000);
      attempts++;
    }
    if (attempts >= maxAttempts) {
      const error = new Error('Try again later...');
      console.log('### ERROR #### ', error)
      return res.status(500).send(error);
    }
    else if (!level) {
      const error = new Error('Set a difficulty level');
      console.log('### ERROR #### ', error)
      return res.status(500).send(error);
    }
    gamesObj[newGameId] = newGame(level, newGameId);
    return res.status(200).json(gamesObj[newGameId]);
  },
  
  getGame: (req, res, next) => {
    const {id} = req.params;
    console.log(id)
    // validate that the game exists
    if (!gamesObj[id]) {
      const error = new Error('Invalid game ID');
      console.log('### ERROR #### ', error);
      return res.status(404).send(error);
    }
    return res.status(200).json(gamesObj[id]);
  },
  
  command: (req, res, next) => {
    const {id} = req.params;
    const {coordinates, command} = req.body;
    // validate that the game exists
    if (!gamesObj[id]) {
      const error = new Error('Invalid game ID');
      console.log('### ERROR #### ', error);
      return res.status(404).send(error);
    }
    let newGameObj = {};
    if (command === 'move') newGameObj = move(coordinates, gamesObj[id]);
    else if (command === 'flagSpace') newGameObj = markMine(coordinates, gamesObj[id]);
    else if (command === 'restart') newGameObj = restart(coordinates, gamesObj[id]);
    else return res.status(404).send('Wrong command');
    // you can receive errors, like "invalid move"... etc.
    if (newGameObj instanceof Error) {
      return res.status(404).send(newGameObj);
    } 
    // on success updae global object and send new game Object
    gamesObj[id] = newGameObj;
    return res.status(200).json(newGameObj);
  },

  restartGame: (req, res, next) => {
    const {id} = req.params;
    // validate that the game exists
    if (!gamesObj[id]) {
      const error = new Error('Invalid game ID');
      console.log('### ERROR #### ', error);
      return res.status(404).send(error);
    }
    gamesObj[id] = restart(gamesObj[id]);
    return res.status(200).json(gamesObj[id])
  },

  flagSpace: (req, res, next) => {
    const {id} = req.params;
    const {coordinates} = req.body;
    // validate that the game exists
    if (!gamesObj[id]) {
      const error = new Error('Invalid game ID');
      console.log('### ERROR #### ', error);
      return res.status(404).send(error);
    }
    const newGameObj = markMine(coordinates, gamesObj[id]);
    // you can receive errors, like "invalid move"... etc.
    if (newGameObj instanceof Error) {
      console.log('### ERROR #### ', newGameObj);
      return res.status(404).send(newGameObj);
    }
    // on success updae global object and send new game Object
    gamesObj[id] = newGameObj;
    return res.status(200).json(newGameObj)
  }
}