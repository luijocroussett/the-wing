const dotenv = require('dotenv');
dotenv.config();

const envObj = {
  port: process.env.PORT,
  nodeEnv: process.env.NODE_ENV,
  startMode: process.env.START_MODE,
  isMockData: process.env.MOCK_DATA,
  dbUri:
    process.env.NODE_ENV === 'development'
      ? process.env.DB_URI_DEV
      : process.env.DB_URI_PROD,
};

module.exports = envObj;
