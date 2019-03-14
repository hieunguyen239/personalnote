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
                <p className="note-count">4 Notes</p>
                <div className="note-item active">
                    <p className="note-title">TOA team</p>
                    <p className="note-content">Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti, excepturi.</p>
                    <p className="note-date">Oct 6, 2018</p>
                </div>
                <div className="note-item">
                    <p className="note-title">TOA team</p>
                    <p className="note-content">Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti, excepturi.</p>
                    <p className="note-date">Oct 6, 2018</p>
                </div>
                <div className="note-item">
                    <p className="note-title">TOA team</p>
                    <p className="note-content">Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti, excepturi.</p>
                    <p className="note-date">Oct 6, 2018</p>
                </div>
                <div className="note-item">
                    <p className="note-title">TOA team</p>
                    <p className="note-content">Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti, excepturi.</p>
                    <p className="note-date">Oct 6, 2018</p>
                </div>
            </div>
        )
    }
}

export default AllNote;