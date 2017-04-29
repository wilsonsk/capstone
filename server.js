//
// # NodeJS-React-Mongodb-webcrawler
//
// 
//
import config from './config';
import apiRouter from './api';

import express from 'express';
const server = express();

server.set('view engine', 'ejs');

server.get('/', (req, res) => {
    res.render('index', {
        content: '...'
    });
});

//to be able to use this API router, we need to export it in /api/index.js
//first import this API router, and we can use it just like any other Express middleware.
//First argument is the route prefix, and the API router is the second argument
server.use('/api', apiRouter);
server.use(express.static('public'));

server.listen(config.port, () => {
  console.log('Express is listening on port ' + config.port);
});
