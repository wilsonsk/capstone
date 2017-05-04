import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';

//index.js has one responsiblilty, it renders the top level component to the DOM
//furthermore, with the modular structure of the components and the index.js, there is an isolation of responsibilities
//so the App component doesn't really care about what the Header component does with that message
//How the Header component is going to display that message, that's the business of the Header component itself.

//ReactDOM.render(): takes 2 args- 1st what we want to create; 2nd where we want to place the creation
//React.createElement(): takes 3 args- 1st type of element; 2nd properties; 3rd content
//'react-container': ID we created

//So to do so, we need to update something in the component. Now remember, the only thing we can update inside the component is the state of that component.
//Instead of rendering the contests from props, we're going to render it from the state. I'm going to remove it from here. 
//Go to the App component. And put the contests on the state of this App component and read the contests directly from the state, instead of the props. 
//So this should be exactly the same, no errors, and the App is rendering an empty list of contests.

//That's not going to work. The code of this component right now is not very friendly for server render. And what we need to do is we want to make this component able to render the contests using initial data here.
//Let's go with initialContests. And by default, we can pass this as an empty array here and then in the App component instead of hard coding this, we can start this using this.props.initialContests. 
//This way the React application on the front end will continue to work exactly as it was- an empty array and then it loads to the state.

//However, if another code that's rendering the same component actually specifies in initialContests values, then the application will render with initial data. 
//So the initialContests here is something that we want to read from the response. So it's response.data.contests. Just like that. 
//And we'll put that in multiple lines. So ReactDOMServer, renderToString, the App component initialized with actual data. Cool. So this is the exact string that I want to feed to the EJS template.

//We got the server to render, however, it's not playing very well with the front end react application because the react application is still initializing the DOM with an empty list of contests and then going back to the API to fetch the actual list of contests. 
//So I'm going to show you two solutions for this problem. First on the front end we can't actually initialize this code with an empty array. 
//We have to initialize this code with the same data that we did on the server for the back end and front end to sync together without any problem.


//And the reason it's gone because the markup that we are rendering from the server now matches exactly the markup that react is starting with. 
//React does not start with an empty list, it does not use set state to regenerate the list, but it's still doing one wasteful API call to /api/contests.

//It's not really necessary to go back to the server because we already have this data. 
//However, this is one solution to the problem that is not too bad if you're okay with a client going back to the data api. 
//I'll show you another solution that does not require us to go back to the api to fetch the data for the react component. 
//And that solution is to also return the data itself from the server. So in server render, when we returned the DOM itself here, I'm going to go ahead and return two things.

//I'm going to return the initial markup that we need, and this would be the exact thing we returned before and let's also return the initial data because we have it already. 
//And this would be response.data and only to modify server.js to also include both of them in ejs. 
//So this would give me an object with two properties, the initial markup and the initial data and I want to include them both in ejs, so initial markup and initial data.
// axios.get('/api/contests')
//   .then(resp => {
//     ReactDOM.render(
//       <App initialContests={resp.data.contests} />,
//       document.getElementById('root')
//     );
//     // //console.log(resp);
//     // this.setState({
//     //   contests: resp.data.contests    
//     // });
//   })
//   .catch(console.error);

//**************IMPORTANT: window.initialData = <%- JSON.stringify(initialData) -%> : is used to create a global object that holds initial data

//So here's what is happening. If I don't have java script the application is still working. 
//It gives me an initial rendered markup using react-dom server but if I do have java script not only do I get the markup but I also get the data as a variable on the window. 
//Window.initialData. So I don't have to go back to the server to retrieve that data for the React application. 
//So now the React application can re render itself using the same data that we have on the server and actually this whole operation on the front end is going to be a no operation because React will 
//find out that the same content is already rendered to the DOM so it will not go back to the DOM and re render it.

//So we get both the benefits of exposing our content to be visible for search engines and also we get a little bit of performance improvement in the react front end code because the browser already has a copy of 
//the DOM that matches exactly what react will try to put back in the DOM and the virtual dom will just do nothing. 
//So this is another solution but you do have to pick your weapons here. Because I imagine that some people would think that this is actually a hack. But it did save us an extra round trip from the client to the server.

ReactDOM.render(
  <App initialData={window.initialData} />,
  document.getElementById('root')
);




