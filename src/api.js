//So now in our application, we need a place to fetch this information with ajax. 
//So let me introduce a new file under source, call this file api.js. 
//This is where we should place all our API logic. 
//So this is the only file that should import the library to fetch from ajax, and in here we'll export multiple functions to fetch different things from the API.

//So our first function would be to fetch a single contest. 
//And this function is going to receive a contestId and it will return a promise from axios to get this API/contest/ the id of the contest that we're interested in, contestId. 
//And let's also just return the data from the response, so it's resp.data, so we'll go ahead and just export this. 
//Cool, so now in the app.js, right before I set the state to the currentContest, how about we fetch the contest first.

import axios from 'axios';

export const apiFetchContest = (contestId) => {
    return axios.get(`/api/contests/${contestId}`)
    //resp.data == contest
        .then(resp => resp.data);
};

export const apiFetchContestList = () => {
    return axios.get(`/api/contests`)
    //resp.data == contest
        .then(resp => resp.data.contests);
};

