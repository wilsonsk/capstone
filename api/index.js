//With Express, we can also manage a group of routes in their own module, instead of having everything here in server.js. 
//For example, we're going to manage all API requests in this API module index.js

import express from 'express';
import data from '../src/testData';

//create a route object
const router = express.Router();

//f you're now wondering how come we can invoke Express itself, and we can also invoke properties on Express, remember that a function in JavaScript is just an object, 
//so we can attach other properties on that object. 
//This router object is similar to the server object we used before, we can define .get calls on it and handle them in the second argument.

//This is an API call, so I'll send a JSON response by sending an object here.
//so any url requests to .../api/ is handled below -- if the route prefix was '/test' then any calls to /api/s would be handled below
//So now that we have the data on the state, we can start working with the data API, instead of reading the data directly from memory. 
//So we're kill this line, and we're going to go prepare and API endpoint on the back end instead. So if you remember, in server.js, we prepared an API endpoint at /api, and started preparing an API router module under API. 
//Right now, we're returning an empty data array. So what we want to do here now is to have an API endpoint to serve the contest's data.
router.get('/contests', (req, res) => {
    res.send({ contests: data.contests }); 
    
});

export default router;
