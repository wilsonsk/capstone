import React from 'react';
import axios from 'axios';
import Header from './Header'
import ContestPreview from './ContestPreview';


//I'm going to put a div in here, and in that div, eventually we're going to render our naming contests; for now, I'm just going to do three dots. 
//And you'll immediately get a JSX parsing error, that says these two HTML elements must be wrapped in an enclosing HTML tag. 
//And the reason for this, if you remember, that this is a react.create element call, and this is another react.create element call. 
//So we can't actually have them follow each other like this. Instead, to fix this problem, we're going to enclose both of them in a top-level div tag.

//Now this app component has two parts. It has a header part and it has the content part. Because we have the React composability, we can actually take these parts into their own component. 
//Let's call this component header. So, not only I'm extracting this header component to our reusability, but it's also now much more readable. The app components start with the header component.

//Converting to state: We're going to go with the new syntax to extend react.component. 
//So what we do to make the app component extends reacting component, we're going to make this into a class. This class extends react component. 
//I'm going to cut the return code here. Inside the class, we define the render function and this render function will return the markup that we had so far. 
//So let's make sure this is working. And now the app component is using the other syntax which allows us to introduce state on the component.

//And in here, I'm going to actually import the data directly from testData one more time. This is now of one level. Although I'm reading the data directly from memory, I'm going to assume this process happened after React rendered all of the components to simulate an API call. So since we're already mounted, a proper place to do any modification now is inside component didMount. Inside component didMount, when the data is accessible, I'm going to go ahead and do this.setState and contests is coming from data.contests.

//Just like that. After React gets mounted, we can control when this happens exactly. And when we have access to the data, we just use setState to put the data back inside the React state. 
//Let's test. Now the App component is reading this list from the state. And we have a plan to work with any delay in fetching the data from an API. 
//Also having this data on the state, allows us to control the list. For example, let's go to the React dev tools.

//refactor as an ES6 class -- which allows us to introduce state on the component and/or lifecycle methods

////So to do so, we need to update something in the component. Now remember, the only thing we can update inside the component is the state of that component.
//Instead of rendering the contests from props, we're going to render it from the state. I'm going to remove it from here. 
//Go to the App component. And put the contests on the state of this App component and read the contests directly from the state, instead of the props. 
//So this should be exactly the same, no errors, and the App is rendering an empty list of contests.

//That's not going to work. The code of this component right now is not very friendly for server render. And what we need to do is we want to make this component able to render the contests using initial data here.
//Let's go with initialContests. And by default, we can pass this as an empty array here and then in the App component instead of hard coding this, we can start this using this.props.initialContests. 
//This way the React application on the front end will continue to work exactly as it was- an empty array and then it loads to the state.

//However, if another code that's rendering the same component actually specifies in initialContests values, then the application will render with initial data. 
//So the initialContests here is something that we want to read from the response. So it's response.data.contests. Just like that. 
//And we'll put that in multiple lines. So ReactDOMServer, renderToString, the App component initialized with actual data. Cool. So this is the exact string that I want to feed to the EJS template.
class App extends React.Component{
    state = { 
        pageHeader: 'Naming Contests',
        contests: this.props.initialContests
    };
    
    componentDidMount(){
        //going to use ajax request to fetch data from remote api (/api/index.js) via axios
        //inside component did mount, we're going to start with an axios.get call, and specify the URL for the API endpoint that we're going to read. 
        //Since we're on the same server for now, it's going to be /api/contests. 
        //Axios is a promise-based, so this would give me a promise, and for every promise, we handle it with a .then method, and we also need to catch any error that happens in the promise.
        //axios is going to give us a response object. This response object will have the data, so let's actually console.log response to make sure that we are receiving the data properly. 
        //And I'll comment out this part of the code for now, and let's test. So it looks like I'm getting an object, this is the response object, it has some method like status okay, and my data is inside the response object here. 
        //So my contests' data is response.data.contests, according to the object that I'm receiving back.
        axios.get('/api/contests')
            .then(resp => {
                //console.log(resp);
                this.setState({
                    contests: resp.data.contests    
                });
            })
            .catch(console.error);
    }
    
    componentWillUnmount(){
        alert('will Unmount');
    }
    
    
    
    render(){
        return(
            <div className="App">
                <Header message={this.state.pageHeader} />
                <div>
                    {/* 
                        So what we need is to take this component and actually use it inside a loop that loops over all the contests.
                        In React this is easily done with a map call. So we start with this dot props dot contests, again, this is the array, and we're going to map this array into contest preview elements. 
                        So the map is going to expose a contest object for me, and inside the map I'm going to take the same call and instead of using this .props.contests[0] now I could just use contest. Let's go ahead and test.
                        And as you can see, all the contests with all their categories are showing up now. Very simple, right. We start with the data array, and then we map it into a component per contest.
                        
                        .map(): The map() method creates a new array with the results of calling a provided function on every element in this array.
                        1st arg of .map(): function that produces an element of the new array -- in this care an arrow function that takes an element called, contest, of the array contests
                        ie, start with an array (this.props.contests) and map into a component per each array element (contest)
                        
                        You might have noticed that we're actually getting a warning from React in our current code. This is because of our dynamic array mapping here. 
                        Every time you display a list of things dynamically, React needs a little bit of help. It needs you to identify every element with a key. 
                        This key helps React identify the element when this array of children changes. 
                        So we can simply use the id for every contest in this key. contest.id. And let's go ahead and test. Now that warning is gone.
                        
                        So just remember, every time you have a map call, you need to provide a unique key to identify the child element inside that map. 
                        One bit of advice here. Do not use the array index as a unique key. Try and find another unique key to identify an element in an array. 
                        In our case, our data had an ID. And usually an API data is going to give you an ID for every object, so just use that. 
                        Now we have a React component that renders an array of contests. And we have the data, which we're reading into memory directly before rendering the React application.
                        
                         Now remember, the only thing we can update inside the component is the state of that component. Instead of rendering the contests from props, we're going to render it from the state. 
                         I'm going to remove it from here. Go to the App component. And put the contests on the state of this App component and read the contests directly from the state, instead of the props. 
                         So this should be exactly the same, no errors, and the App is rendering an empty list of contests.
                    */}
                    {this.state.contests.map((contest) => 
                        <ContestPreview key={contest.id} {...contest} />
                    )}
                </div>
            </div>
        );    
    }        
}

export default App;
