import React, {Component} from 'react';

class DashBoard extends Component{
    constructor(props){
        super(props);
    }

    render(){
       return(
        <div className="dashboard">
            <aside className="left-sidebar">
                <section className="new-note-container">
                    <a href="#" className="link" id="link-create-new-note"><i className="fa fa-plus"></i>Create a New Note</a>
                </section>
                <section className="ulities">
                    <ul className="ulities-main list">
                        <li>
                            <a href="#" className="link" id="link-all-note">All Notes</a>
                        </li>
                        <li>
                            <a href="#" className="link" id="link-all-tag">Tags</a>
                        </li>
                        <li>
                            <a href="#" className="link" id="link-trash">Trash</a>
                        </li>
                    </ul>
                </section>
            </aside>
            <div className="main-content">
                abcdef
            </div>
        </div>
       );
    }
}

export default DashBoard;