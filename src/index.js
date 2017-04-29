import React from 'react';
import ReactDOM from 'react-dom';

import data from './testData';
import App from './components/App';

//index.js has one responsiblilty, it renders the top level component to the DOM
//furthermore, with the modular structure of the components and the index.js, there is an isolation of responsibilities
//so the App component doesn't really care about what the Header component does with that message
//How the Header component is going to display that message, that's the business of the Header component itself.

//ReactDOM.render(): takes 2 args- 1st what we want to create; 2nd where we want to place the creation
//React.createElement(): takes 3 args- 1st type of element; 2nd properties; 3rd content
//'react-container': ID we created

ReactDOM.render(
    <App contests={data.contests}/>,
    document.getElementById('root')
);

