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
ReactDOM.render(
  <App initialContests={[]} />,
  document.getElementById('root')
);
