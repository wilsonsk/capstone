import React from 'react';

class Contest extends React.Component{
    render() {
        return (
            <div className="Contest">
                <div className="contest-description">
                    {this.props.description}
                </div>
                {/*  
                    So in the contest component we want to define an on click handler for this contest list link.
                    Since this is going to fetch something from the API and change the state of our UI, let's pass this click function down from the parent app component. 
                    So we'll name it this dot props dot contest list click. 
                    So this is a function, so we want to do contest list click is prop types dot function dot required and this is looking good so far so let's go back to the app 
                    component and inside the contest component we're going to define a contest list click and this contest list click is going to change the state of our UI.
                */} 
                <div className="home-link link" onClick={this.props.contestListClick}>
                    Contest Link
                </div>
            </div>
        );
    }
}

Contest.propTypes = {
    description: React.PropTypes.string.isRequired,
    contestLinkClick: React.PropTypes.func.isRequired
};

export default Contest;