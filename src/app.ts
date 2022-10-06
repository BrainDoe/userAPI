require('dotenv').config();
import express from 'express';
import config from "config"
import dbConnect from './utils/dbConnect';
import log from './utils/logger';
import router from './routes/index';

const app = express();

app.use(router);

const port = config.get('port');
app.listen(port, () => {
  log.info(`App listening on port http://localhost:${port}`);
  dbConnect();
});