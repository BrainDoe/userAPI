require('dotenv').config();
import express from 'express';
import config from "config"
import dbConnect from './utils/dbConnect';
import log from './utils/logger';
import router from './routes/index';
import sendMail from './utils/mailer';

const app = express();

app.use(express.json());

app.use(router);

const port = config.get('port');
app.listen(port, () => {
  log.info(`App listening on port http://localhost:${port}`);

  dbConnect();

  // sendMail()
});