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
        this.state = {hidden: true};
    }

    fetchNotes(tag = null){
        this.props.getNotes({is_busy: true});
        const url = (tag === null || tag === undefined || tag === 'All Tags') ? 'http://localhost:3001/api/getData' : 'http://localhost:3001/api/getData/tag/' + tag;
        axios.get(url)
            .then(res => {
                let notes = res.data;
                setTimeout(() => {
                    let is_busy = false;
                    this.props.getNotes({is_busy, notes});
                }, 500);
            });
    }

    componentDidMount(){
       this.fetchNotes();
    }

    showTagList(e){
        e.preventDefault();
        this.setState({hidden: !this.state.hidden});
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
                    <ul className={"tag-list" + ((this.state.hidden) ? " hidden" : "")} aria-expanded="false">
                    {
                        tags.map(tag =>(
                            <li className="tag-list-item" key={tag}><a href="#" onClick={this.filterNotes} data-tag={tag}>{tag}</a></li>
                        ))
                    }
                    </ul>
                </div>
                {
                    notes.map(note => (
                        <div className="note-item" key={note._id}>
                            <div className="note-title">{note.title} </div>
                            <div className="note-content">{note.content}</div>
                            <div className="note-tag">
                                <i className="fa fa-tag"></i>&nbsp;{note.tag}
                            </div>

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

