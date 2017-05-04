//With Express, we can also manage a group of routes in their own module, instead of having everything here in server.js. 
//For example, we're going to manage all API requests in this API module index.js

import express from 'express';
//import data from '../src/testData';
import { MongoClient } from 'mongodb';
import assert from 'assert';
import config from '../config';

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

// const contests = data.contests.reduce((obj, contest) => {
//             obj[contest.id] = contest;
//             return obj;
//         }, {});

// router.get('/contests', (req, res) => {
//     res.send({ 
//         contests: contests
//     }); 
// });


//non mongodb: Once we switch to actual data from Mongo, we just need to change the logic inside these API endpoints
// router.get('/contests/:contestId', (req, res) => {
//     //id put in the url is available as req.params.contestId 
//     let contest = contests[req.params.contestId];
//     contest.description = 'placeholder description';
//     // res.send({ 
//     //     contests: contests
//     // }); 
//     res.send(contest);
    
// });

//Mongo!
//We're inside the API level. And the first thing we need is we need a MongoDB object, so we start with an empty object and then we go with MongoClient.connect. -- mdb is global to this file
let mdb;
//We connect to the config.mongodbUri, and this call gives me a callback and in that callback it exposes an error first and then the connected DB. 
//So we always assert equal know the error, this will raise an error if we do have an error, and if we don't have an error then I have successful connection to MongoDB and I'm just going to assign it to the global object here. 
//So now inside my routes I have access to the MDB connected object.
MongoClient.connect(config.mongodbUri, (err, db) => {
    assert.equal(null, err);
    
    mdb = db;
});

//However if you remember the first level of this API I don't need all the information, I only need ID category and contest name. 
//Because if I don't project just these three columns I'll be asking for more data than my application is consuming.
//So in Mongo we can easily do a project call here and this project call takes an object with the fields that you want to be included. 
//So in here we're going to include the ID, you just give it a one and then category name, also one, and also the contest name.

router.get('/contests', (req, res) => {
    let contests = {};
    mdb.collection('contests').find({})
    .project({
        id: 1,
        categoryName: 1,
        contestName: 1
    })
        .each((err, contest) => {
            assert.equal(null, err);
            if(!contest){
                res.send(contests);
                return;
            }
            contests[contest.id] = contest;
        });
});

router.get('/contests/:contestId', (req, res) => {
    mdb.collection('contests')
        .findOne({ id: req.params.contestId })
        .then(contest => res.send(contest))
        .catch(console.error);
});

export default router;
