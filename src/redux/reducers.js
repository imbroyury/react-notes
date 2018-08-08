
import { ADD_ALL_NOTES, ADD_NOTE, DEL_NOTE, EDIT_NOTE, UPDATE_SEARCH_QUERY, SWITCH_NOTE_MODE, CHANGE_SORT_BY, CHANGE_SORT_ORDER, SET_LOAD_STATUS } from './actions';
import { combineReducers } from 'redux-immutable';

import Immutable from 'immutable';

// INITIAL STATE​
const initialState = Immutable.fromJS({
    notes: [],
    filters: {
        searchQuery: '',
        // updatedAt or title
        sortBy: 'updatedAt',
        // ascending or descending
        sortOrder: 'descending'
    },
    // could be 'inProgress', 'error' or 'success'
    loadStatus: 'success'
});

console.log(initialState);


/**
|--------------------------------------------------
| NOTES-RELATED REDUCERS
|--------------------------------------------------
*/

function notes(state = initialState.get('notes'), action) {
    switch (action.type) {
        case ADD_ALL_NOTES:
            return addAllNotes(state, action);
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

function addAllNotes(notes, { payload }) {
    return Immutable.fromJS(payload.notes);
}

function addNote(notes, { payload }) {
    return notes.push(Immutable.Map(payload.note));
}

function deleteNote(notes, { payload }) {
    return notes.filter(note => note.get('id') !== payload.id);
}

function editNote(notes, { payload }) {
    const ind = notes.findIndex(note => note.get('id') === payload.id);
    return ind === -1 ?
        notes :
        notes.update(ind, note => {
            return note
                .update('title', () => payload.title)
                .update('body', () => payload.body)
                .update('updatedAt', () => new Date().toISOString());
        });
}

function switchNoteMode(notes, { payload }) {
    const ind = notes.findIndex(note => note.get('id') === payload.id);
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

function updateSearchQuery(filters, { payload }) {
    return filters.update('searchQuery', () => payload.searchQuery);
}

function changeSortBy(filters, { payload }) {
    return filters.update('sortBy', () => payload.sortBy);
}

function changeSortOrder(filters, { payload }) {
    return filters.update('sortOrder', () => payload.sortOrder);
}

/**
|--------------------------------------------------
| STATUS-RELATED REDUCERS
|--------------------------------------------------
*/

const loadStatusMap = {
    LOAD_START: 'inProgress',
    LOAD_ERROR: 'error',
    LOAD_SUCCESS: 'success'
}

function loadStatus(state = initialState.get('loadStatus'), action) {
    switch (action.type) {
        case SET_LOAD_STATUS:
            return loadStatusMap[action.payload.status];
        default:
            return state;
    }
}

const notesApp = combineReducers({
    notes,
    filters,
    loadStatus
});

export default notesApp;