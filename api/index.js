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

//What we can do before doing anything related to contest lookup, is to change the structure from an array into an object. Once I have it as an object, my lookup will be a constant time operation. 
//So this is what I'm going to do first. I'm going to go to the api module and in here, when I return the data as an array, let's convert it into an object. 
//There are many ways to do so, the easiest way is just to reduce array into an object. Reduce give me a function in the first argument, and we'll start with an empty object.

//The function is going to expose the object that we're going to return and in every iteration we have a contest object. Assign it as a property on this object with the key being the contest id.
//And the value is the contest itself. And we need to return the object here. So this very simply made the array into an object with the id's being the contest id's, and the values being the actual contest objects. 
//Let's actually test. As you can see, we have every contest now is a key value pair on this contests object.

// router.get('/contests', (req, res) => {
//     res.send({ contests: data.contests }); 
    
// });

const contests = data.contests.reduce((obj, contest) => {
            obj[contest.id] = contest;
            return obj;
        }, {})

router.get('/contests', (req, res) => {
    res.send({ 
        contests: contests
    }); 
    
});

export default router;
