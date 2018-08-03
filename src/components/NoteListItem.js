import React from 'react';

import { connect } from 'react-redux';
import { deleteNote, switchNoteMode, editNote } from '../redux/actions';

import Note from './Note';
import EditNoteForm from './EditNoteForm';

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        switchMode: () => dispatch(switchNoteMode(ownProps.id)),
        handleEditNote: (title, body) => dispatch(editNote(ownProps.id, title, body)),
        handleDeleteNote: () => dispatch(deleteNote(ownProps.id)),
    }
}

function NoteListitem(props) {
    return props.editMode ?
        <EditNoteForm
            title={props.title}
            body={props.body}
            switchMode={props.switchMode}
            editNote={props.handleEditNote}
        /> :
        <Note
            title={props.title}
            body={props.body}
            switchMode={props.switchMode}
            deleteNote={props.handleDeleteNote}
        />;
}

export default connect(null, mapDispatchToProps)(NoteListitem);