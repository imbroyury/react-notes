import uuidv4 from 'uuid/v4';
import { ADD_NOTE, DEL_NOTE, EDIT_NOTE, UPDATE_SEARCH_QUERY, SWITCH_NOTE_MODE, CHANGE_SORT_BY, CHANGE_SORT_ORDER } from './actions';
import { combineReducers } from 'redux-immutable';

import Immutable from 'immutable';

// INITIAL STATE​
const initialState = Immutable.fromJS({
    notes: [{
        title: 'Sample First Note',
        body: 'Note body Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatum aspernatur nobis et ullam, doloribus vel aliquam unde quaerat perferendis mollitia reiciendis dicta officia temporibus asperiores, magnam nesciunt sint odit quas? ',
        id: "8af17bec-6e6a-4102-bb09-5745bc7d6e57",
        updatedAt: "2018-08-03T08:48:32.611Z",
        editMode: false
    }, {
        title: 'Second Sample Note',
        body: 'note body Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatum aspernatur nobis et ullam, doloribus vel aliquam unde quaerat perferendis mollitia reiciendis dicta officia temporibus asperiores, magnam nesciunt sint odit quas?',
        id: "9539963b-74ce-4ab1-b359-14b93beab9e4",
        updatedAt: "2018-08-03T08:50:18.964Z",
        editMode: false
    }, {
        title: 'Third Note',
        body: 'note body Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatum aspernatur nobis et ullam, doloribus vel aliquam unde quaerat perferendis mollitia reiciendis dicta officia temporibus asperiores, magnam nesciunt sint odit quas?',
        id: "5e57f81a-8842-4b8c-a27d-b50108119dd0",
        updatedAt: "2018-08-03T08:50:27.441Z",
        editMode: false
    }],
    filters: {
        searchQuery: '',
        // updatedAt or title
        sortBy: 'updatedAt',
        // ascending or descending
        sortOrder: 'descending'
    }
});

console.log(initialState);

/**
|--------------------------------------------------
| NOTES-RELATED REDUCERS
|--------------------------------------------------
*/

function notes(state = initialState.get('notes'), action) {
    switch (action.type) {
        case ADD_NOTE:
            return addNote(state, action);
        case DEL_NOTE:
            return deleteNote(state, action);
        case SWITCH_NOTE_MODE:
            return switchNoteMode(state, action);
        case EDIT_NOTE:
            return editNote(state, action);
        default:
            return state;
    }
}

function addNote(notes, action) {
    return notes.push(Immutable.Map({
        title: action.title,
        body: action.body,
        id: uuidv4(),
        updatedAt: new Date().toISOString(),
        editMode: false
    }));
}

function deleteNote(notes, action) {
    return notes.filter(note => note.get('id') !== action.id);
}

function editNote(notes, action) {
    const ind = notes.findIndex(note => note.get('id') === action.id);
    return ind === -1 ?
        notes :
        notes.update(ind, note => {
            return note
                .update('title', () => action.title)
                .update('body', () => action.body)
                .update('updatedAt', () => new Date().toISOString());
        });
}

function switchNoteMode(notes, action) {
    const ind = notes.findIndex(note => note.get('id') === action.id);
    return ind === -1 ?
        notes :
        notes.update(ind, note => note.update('editMode', value => !value));
}

/**
|--------------------------------------------------
| FILTERS-RELATED REDUCERS
|--------------------------------------------------
*/

function filters(state = initialState.get('filters'), action) {
    switch (action.type) {
        case UPDATE_SEARCH_QUERY:
            return updateSearchQuery(state, action);
        case CHANGE_SORT_BY:
            return changeSortBy(state, action);
        case CHANGE_SORT_ORDER:
            return changeSortOrder(state, action);
        default:
            return state;
    }
}

function updateSearchQuery(filters, action) {
    return filters.update('searchQuery', () => action.searchQuery);
}

function changeSortBy(filters, action) {
    return filters.update('sortBy', () => action.sortBy);
}

function changeSortOrder(filters, action) {
    return filters.update('sortOrder', () => action.sortOrder);
}

const notesApp = combineReducers({
    notes,
    filters
});

export default notesApp;