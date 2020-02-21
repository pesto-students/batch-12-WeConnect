import express from 'express';
// eslint-disable-next-line import/no-unresolved
import 'babel-polyfill';
import bodyParser from 'body-parser';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import camelCase from './middleware/camelcase';
import routers from './routes/router';
import routes from './constants/routes';

const app = express();

app.use(cors());

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(camelCase);
app.use(express.static(path.join(__dirname, '../public')));
app.use(routes.API, routers);

export default app;
