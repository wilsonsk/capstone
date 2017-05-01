import React from 'react';

//And now inside ContestPreview, what we need is we need to define an onClick handler here. And this onClick handler is going to be a function. 
//Now if this was a static function that doesn't depend on the actual object inside every ContestPreview, then we can potentially pass it down from the parent as a property, and just use it here as a reference. 
//But this particular function needs access to every contest object, because we're console logging the contest data, or we're eventually going to access the contest data when we click on here.

//So this is a dynamic function that depends on the content of the ContestPreview function, and since this is a stateless function component, we can't actually have a dynamic function. 
//If we do a dynamic function here, it would mean that every time we render this contest preview it's going to create a new function, and that's not very good. 
//So if we have a stateless function component like this, and we need to handle events dynamically, we should upgrade this component into a class component So we're going to do a React class component, and it's the same name, ContestPreview. 
//And it's also the same mark up, and instead of contests, we don't have an argument like that anymore.

// const ContestPreview = (contest) => {
//     return(
//     <div className="ContestPreview" onClick={...}>
//         <div className="category-name">
//             {contest.categoryName}
//         </div>
//         <div className="contest-name">
//             {contest.contestName}
//         </div>
//     </div>
//     );
// };

//Let's call this function this.handleClick. And let's go ahead and define this function, handleClick is a function, use the property syntax here so we can access this inside. 
//Let's log this.props.contestName. Component is undefined, we can de-structure it from here. And I think we can test. Refresh, clicking on every contest will give me the name of that contest. 
//Although when I hover over these, they don't appear clickable, because the cursor is not a pointer.

class ContestPreview extends React.Component {
    handleClick = () => {
        console.log(this.props.contestName);
        this.props.onClick(this.props.id)
    };
    render() {
        return (
            <div className="link ContestPreview" onClick={this.handleClick}>
                <div className="category-name">
                    {this.props.categoryName}
                </div>
                <div className="contest-name">
                    {this.props.contestName}
                </div>
            </div>
        );
    }
}

ContestPreview.propTypes = {
    id: React.PropTypes.number.isRequired,
    categoryName: React.PropTypes.string.isRequired,
    contestName: React.PropTypes.string.isRequired,
    onClick: React.PropTypes.func.isRequired
};

export default ContestPreview;
