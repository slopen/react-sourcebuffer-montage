import path from 'path';
import http from 'http';

import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';

import api from './api';
import config from 'config';

const {
	appName: NAME,
	appServer: PORT
} = config;

const VIDEOS_PATH = path.resolve (__dirname, '../../../data/videos');

const cors = (req, res, next) => {
	res.header ('Access-Control-Allow-Credentials', true);
	res.header ('Access-Control-Allow-Origin', req.headers.origin || '*');
	res.header ('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header ('Access-Control-Allow-Headers', 'X-Requested-With,X-HTTP-Method-Override,Content-Type,Accept');

	if (req.method === 'OPTIONS') {
		return res.send (200);
	}

	console.log (req.method, req.url, req.query, req.body);

	next ();
};

const app = express ()

	.all ('*', cors)

	.use (session ({
		resave: true,
		saveUninitialized: true,
		secret: 'secret do not tell'
	}))

	.use ('/resources', express.static (VIDEOS_PATH))

	.use (cookieParser ())
	.use (bodyParser.urlencoded ({extended: true}))
	.use (bodyParser.json ())

	.use ('/', api);

http
	.createServer (app)
	.listen (PORT, async () => {
		console.log (`\n* ${NAME} server started on port ${PORT}`);
	});

