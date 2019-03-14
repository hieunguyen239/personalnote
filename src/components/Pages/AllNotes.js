import React, {Component} from 'react';
import axios from 'axios';
import getNotes from '../../actions/getnotes_action';
import { connect } from 'react-redux';

class AllNotes extends Component{

    constructor(props){
        super(props);
        this.props.getNotes({is_busy: true});
    }

    fetchNotes(){
        axios.get("http://localhost:3001/api/getData")
            .then(res => {
                let notes = res.data;
                let is_busy = false;
                this.props.getNotes({is_busy, notes});
            });
    }

    componentDidMount(){
       this.fetchNotes();
    }

    render(){
        let notes = this.props.notesReducer.notes;
      
        return(
            <div className="all-notes-container">
                <h1>All Notes</h1>
                <p className="note-count">{notes.length + ' Notes'}</p>
                {
                    notes.map(note => (
                        <div className="note-item" key={note._id}>
                            <p className="note-title">{note.title} - <small className="fa fa-tag">&nbsp;{note.tag}</small></p>
                            <p className="note-content">{note.content}</p>
                        </div>
                    ))
                }
            </div>
        )
    }
}

function mapStateToProps(state, props){
    return{
        notesReducer: state.noteReducer
    }
}

function mapDispatchToProps(dispatch){
    return {
        getNotes: (payload)  => dispatch(getNotes(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllNotes);

