//To render React components on the server, we're going to use the ReactDOMServer package. To be able to use this ReactDOMServer, we're going to have to import React itself first and we'll also need to import ReactDOMServer 
//from react-dom/server. And we also need our own React application. So we're going to import App from ./src/components/App .js. This is the top level of our React application.

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from './src/components/App';

//fetch data from api

//Instead of waiting for React to warm up, render the component, and then go back to the server to fetch the data, we can have an initial view ready by the server.
//So, to do that, we're going to have to modify this code, here, to pre-render all the React components on the server using the same data that we have in the API.

//However, remember that we're doing all the different parts of this project in a single Node application, but we're going to consider them separate. 
//So, I'm going to consider the React application is separate from the API application. So, I need this server code to be able to read data from the API part. 
//Let's create a new file. Call this file serverRender.js. 
//And in this file we're going to fetch the data from the API assuming that this part does not have direct access to the data, and it needs to go to the API server to fetch the data.

//So, we're going to actually import axios from axios, just like we did for the front end. And we'll try to do axios.get a URL here, and then do something with it just like we did in the front end. 
//However, I can't do /api here, because this is not a front end trigger. I have to actually do the full server. But instead of hard-coding any server host here, we should really read it from the configuration. 
//So, I'm going to go back to the config.js file.

//so instead of axios.get('http://localhost:8080/api/contests'); use config.js

import axios from 'axios';
import config from './config';

/*
const serverRenderFunction = () => 
    axios.get('${config.serverURL}/api/contests')
        .then(resp => {
           //console.log(resp.data.contests);
           //And then in here, we can use ReactDOMServer.renderToString and give it our own component. Just like that. 
           //This would read the React code and renders everything to string. Let's go back and take a look at our React component. 
           //And you'll remember that our React component depends on the state to load the data. 
           //So there is no way for me to pass the data in here to the React component to prerender the component with data.
           
            //So to do so, we need to update something in the component. Now remember, the only thing we can update inside the component is the state of that component.
            //Instead of rendering the contests from props, we're going to render it from the state. I'm going to remove it from here. 
            //Go to the App component. And put the contests on the state of this App component and read the contests directly from the state, instead of the props. 
            //So this should be exactly the same, no errors, and the App is rendering an empty list of contests.
            
            //That's not going to work. The code of this component right now is not very friendly for server render. And what we need to do is we want to make this component able to render the contests using initial data here.
            //Let's go with initialContests. And by default, we can pass this as an empty array here and then in the App component instead of hard coding this, we can start this using this.props.initialContests. 
            //This way the React application on the front end will continue to work exactly as it was- an empty array and then it loads to the state.
            
            //However, if another code that's rendering the same component actually specifies in initialContests values, then the application will render with initial data. 
            //So the initialContests here is something that we want to read from the response. So it's response.data.contests. Just like that. 
            
            //However, this string is inside a promise. This whole call returns a promise. So I cannot use it directly. 
            //What we can do is, let's return this value from the bin and let's wrap all this call in a function and call this function serverRenderFunction()
            //This is a function that basically returns a promise. Just like that. And we're going to go ahead and export default this function serverRenderFunction(). 
            //So now back in server.js, instead of importing this directly, we're going to import serverRender from serverRender.
            return ( 
		ReactDOMServer.renderToString(
                    <App initialContests={resp.data.contests} />
		)
            );
        });
*/

//It's not really necessary to go back to the server because we already have this data. 
//However, this is one solution to the problem that is not too bad if you're okay with a client going back to the data api. 
//I'll show you another solution that does not require us to go back to the api to fetch the data for the react component. 
//And that solution is to also return the data itself from the server. So in server render, when we returned the DOM itself here, I'm going to go ahead and return two things.

//I'm going to return the initial markup that we need, and this would be the exact thing we returned before and let's also return the initial data because we have it already. 
//And this would be response.data and only to modify server.js to also include both of them in ejs. 
//So this would give me an object with two properties, the initial markup and the initial data and I want to include them both in ejs, so initial markup and initial data.

//I'm going to return the initial markup that we need, and this would be the exact thing we returned before and let's also return the initial data because we have it already.
//And this would be response.data and only to modify server.js to also include both of them in ejs. 
//So this would give me an object with two properties, the initial markup and the initial data and I want to include them both in ejs, so initial markup and initial data.

//And now in the index.js where I'm rendering the content, this is now called initial markup, I'll also include a script tag and put the initial data as a global variable on the window. 
//Window.initialData equal the initial data that I'm reading from the ejs variable. So that would be initial data. However I can't really read it directly like that.

const serverRenderFunction = () => 
  axios.get(`${config.serverUrl}/api/contests`)
    .then(resp => {
        return {
            initialMarkup: ReactDOMServer.renderToString(
        	    <App initialContests={resp.data.contests} />
	        ),
	        initialData: resp.data
        };
    });

export default serverRenderFunction;

