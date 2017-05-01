//stateless function component
import React from 'react';
import ContestPreview from './ContestPreview';

//So call it ContestList. And this would simply just return the same mark up that we have in the App component, we don't need this extra div. And it will receive as probed, the list of contests, call them contests. 
//And it will render them directly here, we don't have a state. We need to import React, and we need to export default ContestList. 
//And let's define the props that we have here. So ContestList.propTypes equal, the only prop we have is the contests object, which is an array.

//So React.PropTypes.array. And we need ConstestPreview, so we're going to actually remove it form App.js because we're not using it here anymore. 
//And put it in ContestList. So this ContestList looks good. Inside App.js, we want to import this new component which is ContestList, and we'll just use it in here. ContestList, passing in the contests, which we can read from the state.

const ContestList = ({ contests, onContestClick }) => {
    return(
        <div className="ContestList">
            {Object.keys(contests).map((contestId) => 
                <ContestPreview 
                key={contestId} 
                onClick={onContestClick}
                {...contests[contestId]} />
            )}
        </div>  
    );
};

ContestList.propTypes = {
    contests: React.PropTypes.object,
    onContestClick: React.PropTypes.func.isRequired
};

export default ContestList