import React, {Component} from 'react';
import axios from 'axios';
import getNotes from '../../actions/getnotes_action';
import filterNotes from '../../actions/filternotes_action';
import { connect } from 'react-redux';

const tags = ['All Tags'];
class AllNotes extends Component{
   
    constructor(props){
        super(props);
        this.showTagList = this.showTagList.bind(this);
        this.filterNotes = this.filterNotes.bind(this);
    }

    fetchNotes(tag = null){
        this.props.getNotes({is_busy: true});
        const url = (tag === null || tag === undefined || tag === 'All Tags') ? 'http://localhost:3001/api/getData' : 'http://localhost:3001/api/getData/tag/' + tag;
        axios.get(url)
            .then(res => {
                let notes = res.data;
                let is_busy = false;
                this.props.getNotes({is_busy, notes});
            });
    }

    componentDidMount(){
       this.fetchNotes();
    }

    showTagList(e){
        e.preventDefault();
    }

    filterNotes(e){
        e.preventDefault();
        let tag = e.target.dataset.tag;
        this.fetchNotes(tag);
    }

    render(){
        let props = this.props.notesReducer;
        let {notes} = props;
        //let tags = [];
        if(tags.length === 1){
            notes.forEach(element => {
                if(tags.indexOf(element.tag) === -1)   tags.push(element.tag);
            });
        }

        return(
            <div className="all-notes-container">
                <h1>All Notes</h1>
                <div className="note-count">{notes.length + ' Notes'} 
                    <a href="#" className="filter-tag-link" onClick={this.showTagList}><i className="fa fa-tag"></i></a>
                    <ul className="tag-list" aria-expanded="false">
                        {
                            tags.map(tag =>(
                                <li key={tag}><a href="#" onClick={this.filterNotes} data-tag={tag}>{tag}</a></li>
                            ))
                        }
                    </ul>
                </div>
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
        getNotes: (payload)  => dispatch(getNotes(payload)),
        filterNotes: (payload)  => dispatch(filterNotes(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllNotes);

