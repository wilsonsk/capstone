//With Express, we can also manage a group of routes in their own module, instead of having everything here in server.js. 
//For example, we're going to manage all API requests in this API module index.js

import express from 'express';

//create a route object
const router = express.Router();

//f you're now wondering how come we can invoke Express itself, and we can also invoke properties on Express, remember that a function in JavaScript is just an object, 
//so we can attach other properties on that object. 
//This router object is similar to the server object we used before, we can define .get calls on it and handle them in the second argument.

//This is an API call, so I'll send a JSON response by sending an object here.
//so any url requests to .../api/ is handled below -- if the route prefix was '/test' then any calls to /api/s would be handled below
router.get('/', (req, res) => {
    res.send({ data: [] }); 
    
});

export default router;
