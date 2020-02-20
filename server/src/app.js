import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import routers from './routes/router';
import routes from './constants/routes';

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.use(routes.API, routers);

export default app;
