import React from 'react';
import Header from './Header';
import ContestList from './ContestList';
import Contest from './Contest';
// import apiFetchContest from '../api';
// import apiFetchContestList from '../api';
import * as api from '../api';

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

//And the other reason, we only have one route in our application. We actually have two. We're going to go to a contest, and we can go back to a list of contests. 
//So it's going to be simple enough for us to just use the history API directly. If you have complicated routing, 
//the react router library is really good and it gives you a declarative way of defining your routes, but we're going to just use the history API. 
//However, I'm going to put the history API in a function here. Let's call this function pushstate, and this function will receive the same parameters that the official pushstate receives.

//So I'll go with object, and we'll go with the URL and this pushstate is going to be an alias to window.history.pushstate, the object and an empty title and the URL. 
//This way if I decided later on to support older browsers, all I need to modify is this function. So as a first step, when we click on a contest right now, we are recognizing the contest that we just clicked. 
//Let's make the history API go to /contest/ the ID of that contest.

const pushState = (obj, url) => {
    window.history.pushState(obj, '', url);
};

//So this is a function, and this function will give me access to the popstate event in here. 
//Let's just console.log that event to take a look at it. So now let's refresh, go to one of the contests, and then go back. 
//And you'll see that in the console, I have a popstate event, and what's important about this event is that we have the state here. 
//And the state here is null, let's do one more navigation. Let's navigate forward, and I have another popstate event, and now the state here does have a currentContestId.

//So when I'm navigating back and forward here, I have access to this event, and I can detect if I'm on a contest ID or I don't have a contest ID, if I have a null state. 
//However, instead of handling this directly here, let's also extract it into its own handler. 
//So let's call this handler onPopState, and I'm going to make this into a function that receives a handler, and in here, I will just assign the onPopState this handler that I just received.

//        window.onpopstate = (event) => {

const onPopState = (handler) => {
    window.onpopstate = handler;
};

class App extends React.Component{
    // state = { 
    //     contests: this.props.initialContests
    // };
    
    static propTypes = {
      initialData: React.PropTypes.object.isRequired
    };
    
    state = this.props.initialData;
    
    componentDidMount(){
        //going to use ajax request to fetch data from remote api (/api/index.js) via axios
        //inside component did mount, we're going to start with an axios.get call, and specify the URL for the API endpoint that we're going to read. 
        //Since we're on the same server for now, it's going to be /api/contests. 
        //Axios is a promise-based, so this would give me a promise, and for every promise, we handle it with a .then method, and we also need to catch any error that happens in the promise.
        //axios is going to give us a response object. This response object will have the data, so let's actually console.log response to make sure that we are receiving the data properly. 
        //And I'll comment out this part of the code for now, and let's test. So it looks like I'm getting an object, this is the response object, it has some method like status okay, and my data is inside the response object here. 
        //So my contests' data is response.data.contests, according to the object that I'm receiving back.
        
        //we can't also reset the state here because that would be wasteful. If we have the data to begin with then we don't need to reset the state. 
        //So I'm going to actually remove this code in here and let's go back to the index.js. Since we need to bring the data before actually rendering the front end component, I'll go ahead and make an Axios call here. 
        //Instead of setting the state I'll do the react-dom render call itself in here. And the initial contests here are response.data.contests.
        // axios.get('/api/contests')
        //     .then(resp => {
        //         //console.log(resp);
        //         this.setState({
        //             contests: resp.data.contests    
        //         });
        //     })
        //     .catch(console.error);
        
        onPopState((event) => {
            this.setState({
                currentContestId: (event.state || {}).currentContestId
            });
        });
        
    }
    
    componentWillUnmount(){
        alert('will Unmount');
        onPopState(null);
    }
    
    //So we'll declare a function here. Let's call this function fetchcontest. This function will eventually fetch the contest information from the server when we click on it, but for now, it only receives the contest ID. 
    //This is a function, and it will use pushstate to push a history record. First argument is the object about that record, and the second argument is the URL. 
    //So the URL is going to be /contest/ the contest ID that we are receiving, and let's put on the state object, let's put the current contest ID.
    
    //Make that the contest ID that we're receiving. And now we want to use this fetch contest when we click on every contest, but we define this here on the main app component because it will eventually modify the state. 
    //So I'm going to pass it down to the children component. Let's call this onContestClick. This would be this.fetchContest. And then inside contest list, we're going to receive a new property, this property called onContestClick.
    
    //Let's now look up the contest when we click on it. Right now, the route changes, but the content doesn't. So we're going to start changing the content here. 
    //In particular, when I click on a contest, after I change the route, I want to look up the contest. I want to be able to put things on the state that are related to that contest that I just clicked. 
    //However, the contest structure is an array. So right now, api/contest is giving me an array. And if I want to look up an item using the ID of that item, I have to scan the array; that's not very efficient.
    
    //ie., lookup a contest
    
    fetchContest = (contestId) => {
        pushState(
            {currentContestId: contestId},
            `/contest/${contestId}`
        );
        //lookup contest
        //this.state.contests[contestId]
        
        //So I'm making sure that we're using the valid information coming from the server. And just doing the current contestId is going to switch to this view. 
        //And this view is just looking up a contest from the state. So what I can do to make this view read the description and everything else in the contest, i
        //s I can modify the contests object that I have on the state by copying the current contest object. So it's state.contests. 
        //However, the property associated with the current contestId, so contest.id is a dynamic here, I can set that to the new contest object coming from the server, and that's the one that has the description and everything else.
        
        //So this way, I cache the fetched contest information on the state, and when I start going back and forth, this is going to be an improvement on performance.
        //Because if I already have a description for a contest, it will be on the state. So I think this is good to go. 
        //Except we need a semi colon here. Thank you, yes lint. And now, inside contest, we can start using more information coming from the API. 
        //So I'm going to go ahead and use the description here. And I have a description, which is a string, not using the id anymore.
        
        api.apiFetchContest(contestId).then(contest => {
            this.setState({
                //pageHeader: this.state.contests[contestId].contestName,
                //pageHeader: contest.contestName,
                currentContestId: contest.id,
                contests: {
                    ...this.state.contests,
                    [contest.id]: contest
                }
            });            
        });
    };
    
    fetchContestList = () => {
        pushState(
            {currentContestId: null},
            '/'
        );
        //lookup contest
        //this.state.contests[contestId]
        
        //So I'm making sure that we're using the valid information coming from the server. And just doing the current contestId is going to switch to this view. 
        //And this view is just looking up a contest from the state. So what I can do to make this view read the description and everything else in the contest, i
        //s I can modify the contests object that I have on the state by copying the current contest object. So it's state.contests. 
        //However, the property associated with the current contestId, so contest.id is a dynamic here, I can set that to the new contest object coming from the server, and that's the one that has the description and everything else.
        
        //So this way, I cache the fetched contest information on the state, and when I start going back and forth, this is going to be an improvement on performance.
        //Because if I already have a description for a contest, it will be on the state. So I think this is good to go. 
        //Except we need a semi colon here. Thank you, yes lint. And now, inside contest, we can start using more information coming from the API. 
        //So I'm going to go ahead and use the description here. And I have a description, which is a string, not using the id anymore.
        
        api.apiFetchContestList().then(contests => {
            this.setState({
                //pageHeader: this.state.contests[contestId].contestName,
                //pageHeader: contest.contestName,
                currentContestId: null,
                contests 
            });            
        });
    };    
    
    //And I think we can actually test that. So clicking on this contest, there you go. So now that we changed the title, let's go ahead and try to change the content as well.
    //To change the content, I have to do a condition statement here and say something like, "do we have an active contest? Do we have a current contest?" So to do so, I'm going to also place the current contest id on the state as well. 
    //So now when I click on a contest, not only I get the header here, I also get the current contest id. Which means, I can replace this with a conditional now and say, 
    //"if there is a current contest id on the state, then go ahead and display contest information.
    //Otherwise, display the contest list information." So to do so, I'm going to take this code here and place it in an instance function. 
    //So this dot, let's call this, currentContent. So this is a function that I'm invoking directly. So I'll define it here, currentContent. 
    //This can be a direct method here. And it will have an if statement and return either a contest component or the contest list component that we just removed from the render method.
    
    currentContest(){
        return this.state.contests[this.state.currentContestId];
    }
    pageHeader(){
        if(this.state.currentContestId){
            return this.currentContest().contestName;
        }else{
            return 'Naming Contests';
        }
    }
    
    currentContent(){
        if (this.state.currentContestId) {
            return (
                <Contest contestListClick={this.fetchContestList} {...this.currentContest()} />
            );
        }else{
            return (
                <ContestList 
                    onContestClick={this.fetchContest}
                    contests={this.state.contests} /> 
            );
        }
    }
    
    render(){
        return(
            <div className="App">
                <Header message={this.pageHeader()} />
                {this.currentContent()}
            </div>
        );    
    }        
}

export default App;
