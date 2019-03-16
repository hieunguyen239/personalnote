import React, { Component } from 'react';

import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import { EditorState, convertToRaw } from 'draft-js';
import axios from 'axios';
import {connect} from 'react-redux';
import saveNote from '../../actions/savenote_action';
import getNotes from '../../actions/getnotes_action';

const tags = ['All Tags'];

class NewNote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty()
        }
        this.saveNote = this.saveNote.bind(this);
    }

    fetchNotes(tag = null){
        this.props.getNotes({is_busy: true});
        const domain = 'http://localhost:3001/';
        const url = (tag === null || tag === undefined || tag === 'All Tags') ? domain + 'api/getData' : domain + 'api/getData/tag/' + tag;
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

    onEditorStateChange = (editorState) => {
        this.setState({
            editorState,
        });
        this.saveNote = this.saveNote.bind(this);
    };

    saveNoteToDB(data){
        const domain = 'http://localhost:3001/';
        const url = domain + 'api/putData';
        axios.post(url, data)
            .then(res => {
                let data = res.data;
                if(data.success){
                    //retrive note and added to left sidebar
                }
            });
    }

    saveNote(e){
        e.preventDefault();
        let title = (e.target.elements.title.value.trim)() ? e.target.elements.title.value : "No Title";
        let content = e.target.elements.content.value;
        let data = {title, content};
        this.saveNoteToDB(data);
    }

    render(){
        const { editorState } = this.state;

        let props = this.props.notesReducer;
        console.log(props);
        let {notes} = props;

        if(tags.length === 1){
            notes.forEach(element => {
                if(tags.indexOf(element.tag) === -1)   tags.push(element.tag);
            });
        }
        return (
            <div className="new-note-wrapper">
                <div className="old-notes-wrapper">
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
                                    <div className="note-content">{note.content.slice(0, 100)}</div>
                                    <div className="note-tag">
                                        <i className="fa fa-tag"></i>&nbsp;{note.tag}
                                    </div>

                                </div>
                            ))
                        }
                    </div>
                </div>
                <form className="create-new-note-wysiswg"  method="POST" id="frm-new-note" onSubmit={this.saveNote}>
                    <div className="controls-wrapper">
                        <input type="submit" value="save" className="btn save" id="save-note" name="save" />
                    </div>
                    <div className="input-box">
                        <label htmlFor="title">Title</label>
                        <input type="text" id="note-title" name="title"/>
                    </div>
                    <div className="input-box">
                        <label htmlFor="content">Content</label>
                        <Editor
                            wrapperClassName="wrapper-class"
                            editorClassName="editor-class"
                            toolbarClassName="toolbar-class"
                            onEditorStateChange={this.onEditorStateChange}
                        />
                         <textarea
                                disabled
                                name="content"
                                value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
                                style={{display:'none'}}
                        />
                    </div>
                </form>
            </div>
        )
    }
}

function mapStateToProps(state, props){
    return{
        notesReducer: state.noteReducer
    }
}

function mapDispatchToProps(dispach){
    return({
        saveNote : (payload) => dispach(saveNote(payload)),
        getNotes : (payload) => dispach(getNotes(payload))
    });
}

export default connect(mapStateToProps, mapDispatchToProps)(NewNote);