import React, {Component} from 'react';
import axios from 'axios';
import getNotes from '../../actions/getnotes_action';
import { connect } from 'react-redux';

import filterNotes from '../../actions/filternotes_action';
import updateNote from '../../actions/updatenote_action';


import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

let tags = [];
const domain = 'http://localhost:3001/';

class AllNotes extends Component{
   
    constructor(props){
        super(props);
        this.showTagList = this.showTagList.bind(this);
        this.filterNotes = this.filterNotes.bind(this);
        this.editNote = this.editNote.bind(this);
        this.filterSuggestTag = this.filterSuggestTag.bind(this);
        this.showSuggestTag = this.showSuggestTag.bind(this);
        this.setTag = this.setTag.bind(this);

        this.state = {
            editorState: EditorState.createEmpty(),
            hidden: true, 
            filteredTags: []
        }

        this.saveNote = this.saveNote.bind(this);
    }

    fetchTags(){
        const url = domain + 'api/getTags';
        axios.get(url)
            .then(res => {
                tags = res.data;
                let allTag = {_id: 0, tag_name: 'All Tags'};
                tags.unshift(allTag);
            });
    }

    fetchNotes(tag = null){
        this.props.getNotes({is_busy: true});
        const url = (tag === null || tag === undefined || tag === 'All Tags') ? domain + 'api/getData' : domain + 'api/getData/tag/' + tag;
        this.fetchTags();
        axios.get(url)
            .then(res => {
                let notes = res.data;
                //setTimeout(() => {
                    let is_busy = false;
                    this.props.getNotes({is_busy, notes});
                //}, 5000);
            });

    }

    componentDidMount(){
       this.fetchNotes();
       this.setState({
            filteredTags: tags
        });
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

    onEditorStateChange = (editorState) => {
        this.setState({
            editorState,
        });
    };

    editNote(e){
        let props = this.props.notesReducer;
        e.preventDefault();
        if(e.currentTarget.className === 'note-item'){
            let id = e.currentTarget.dataset.id;
            let {notes} = props;
            let note = notes.find(ele => id === ele._id);
            if(note._id){
                
                let $frm = document.getElementById('frm-new-note');
                $frm.elements.title.value = note.title;
                $frm.elements.content.value = note.content;
                $frm.elements.noteid.value = note._id;

                const html = note.content;
                const contentBlock = htmlToDraft(html);
                if (contentBlock) {
                    const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
                    const editorState = EditorState.createWithContent(contentState);
                    this.onEditorStateChange(editorState);
                }
               
                this._setTag(e.currentTarget.dataset.tag);
            }
        }
    }

    saveNoteToDB(data){
        const domain = 'http://localhost:3001/';
        const url = domain + 'api/updateData';
        axios.post(url, data)
            .then(res => {
                let data = res.data;
                if(data.success){
                    this.fetchNotes();
                }
            });
    }

    saveNote(e){
        e.preventDefault();
        let title = (e.target.elements.title.value.trim)() ? e.target.elements.title.value : "No Title";
        let content = e.target.elements.content.value;
        let _id = e.target.elements.noteid.value;
        let tag = e.target.elements.tagInput.value;
        let data = {id:_id, update:{title, content, tag}};
        this.saveNoteToDB(data);
    }

    showSuggestTag(e){

    }

    _setTag(name){
        const $input = document.getElementById('tag-input');
        $input.value = name;

        const $tagList = document.getElementById('suggest-taglist');

        const display = $tagList.style.display;
        if(display === 'block')  $tagList.style.display = 'none';

        const $fakeInp = document.getElementById('fake-input');

        $fakeInp.classList.remove('editable');        
        const $spanTag = document.createElement('span');
        $spanTag.classList.add('tag-choosen');
        $fakeInp.innerText = '';
        $spanTag.innerText = name;

        const $rmTag = document.createElement('span');
        $rmTag.classList.add('remove-tag');
        $rmTag.innerText = 'x';
        $spanTag.appendChild($rmTag);

        $fakeInp.contentEditable = 'false';

        $rmTag.addEventListener('click', (e) => {
            $fakeInp.classList.add('editable'); 
            $input.value = '';
            $fakeInp.innerText = '';
            $fakeInp.contentEditable = 'true';
        });

        $fakeInp.appendChild($spanTag);
    }

    setTag(e){
        const name = e.target.dataset.name
        this._setTag(name);
    }

    filterSuggestTag(e){
        /* const inputVal = e.target.value;
        const $tagList = document.getElementById('suggest-taglist');

        const display = $tagList.style.display;
        if(display === 'none')  $tagList.style.display = 'block';

        const filteredTags = tags.filter((tag) => tag.tag_name.toLowerCase().includes(inputVal.toLowerCase()));
        this.setState({
            filteredTags
        }); */

        const inputVal = e.target.innerHTML;
        const $tagList = document.getElementById('suggest-taglist');

        const display = $tagList.style.display;
        if(display === 'none')  $tagList.style.display = 'block';

        const filteredTags = tags.filter((tag) => tag.tag_name.toLowerCase().includes(inputVal.toLowerCase()));
        this.setState({
            filteredTags
        });
    }

    render(){
        let props = this.props.notesReducer;
        let {notes} = props;
        const { editorState } = this.state;
        
        return(
            <section className="new-note-wrapper">
                <div className="all-notes-container">
                    <h1>All Notes</h1>
                    <div className="note-count">{notes.length + ' Notes'} 
                        <a href="#" className="filter-tag-link" onClick={this.showTagList}><i className="fa fa-tag"></i></a>
                        <ul className={"tag-list" + ((this.state.hidden) ? " hidden" : "")} aria-expanded="false">
                        {
                            tags.map(tag =>(
                                <li className="tag-list-item" key={tag._id}><a href="#" onClick={this.filterNotes} data-tag={tag.tag_name}>{tag.tag_name}</a></li>
                            ))
                        }
                        </ul>
                    </div>
                    {
                        notes.map(note => (
                            <div className="note-item" key={note._id} onClick={this.editNote} data-tag={note.tag} data-id={note._id}>
                                <div className="note-title">{note.title} </div>
                                <div className="note-content">{note.content.slice(0, 100)}</div>
                                <div className="note-tag">
                                    <i className="fa fa-tag"></i>&nbsp;{note.tag}
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className="note-review-container">
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
                                editorState={editorState}
                            />
                            <input type="hidden" id="note-id" name="noteid"></input>
                            <textarea
                                    disabled
                                    name="content"
                                    value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
                                    style={{display:'none'}}
                            />
                        </div>
                        <div className="input-box">
                            <div className="tags-con">
                                <label htmlFor="tags">Tags</label>
                                <div className="tag-autosuggest-con">
                                    <div className="fake-input editable" contenteditable="true" id="fake-input" onKeyUp={this.filterSuggestTag}></div>
                                    <input type="text" id="tag-input" name="tagInput" onKeyUp={this.filterSuggestTag} onClick={this.showSuggestTag} autocomplete="off"/>
                                    <ul className="suggest-taglist" id="suggest-taglist" style={{display:'none'}}>
                                        {
                                            this.state.filteredTags.map(tag => (
                                                <li key={tag._id} onClick={this.setTag} data-name={tag.tag_name}>{tag.tag_name}</li>
                                            ))
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
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
        filterNotes: (payload)  => dispatch(filterNotes(payload)),
        updateNote: (payload) => dispatch(updateNote(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllNotes);

