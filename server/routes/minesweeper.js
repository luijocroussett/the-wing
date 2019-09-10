const minesweeperRouter = require('express').Router();

const {
  createNewGame, 
  command, 
} = require('../controllers/gameController');

minesweeperRouter.get('/:level', createNewGame);
minesweeperRouter.post('/:id', command);

module.exports = minesweeperRouter;