import React, {Component} from 'react';

class AllNote extends Component{

    constructor(props){
        super(props);
    }

    componentDidMount(){
        fetch("http://localhost:3001/api/getData")
            .then(data => data.json())
            .then(res => console.log(res));
    }

    render(){
        return(
            <div className="all-notes-container">
                <h1>All Notes</h1>
            </div>
        )
    }
}

export default AllNote;