import React from 'react';
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

//refactor as an ES6 class -- which allows us to introduce state on the component and/or lifecycle methods
class App extends React.Component{
    state = { 
        pageHeader: 'Naming Contests'
    };
    
    componentDidMount(){
        //alert('did mount');
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
                    */}
                    {this.props.contests.map((contest) => 
                        <ContestPreview {...contest} />
                    )}
                </div>
            </div>
        );    
    }        
}

export default App;
