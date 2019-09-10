const app = require('express')();
const bodyParser = require("body-parser");
// const {PORT} = require('./config')

// importing controllers
const minesweeperRouter = require('./routes/minesweeper')

// executing middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

// endpoints
app.use('/minesweeper', minesweeperRouter)


app.listen(3000, () => {
  console.log(`Server running at port ${3000}.`)
})