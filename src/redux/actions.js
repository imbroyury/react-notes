import NotesDB from '../core/dataStorage';

import uuidv4 from 'uuid/v4';

// Notes
export const ADD_ALL_NOTES = 'ADD_ALL_NOTES';
export const ADD_NOTE = 'ADD_NOTE';
export const DEL_NOTE = 'DEL_NOTE';
export const SWITCH_NOTE_MODE = 'SWITCH_NOTE_MODE';
export const EDIT_NOTE = 'EDIT_NOTE';

// Filters
export const UPDATE_SEARCH_QUERY = 'UPDATE_SEARCH_QUERY';
export const CHANGE_SORT_BY = 'CHANGE_SORT_BY';
export const CHANGE_SORT_ORDER = 'CHANGE_SORT_ORDER';

// Load Status
export const SET_LOAD_STATUS = 'SET_LOAD_STATUS';

const LOAD_START = 'LOAD_START';
const LOAD_ERROR = 'LOAD_ERROR';
const LOAD_SUCCESS = 'LOAD_SUCCESS';

export function getAllNotesFromDB() {
    return function (dispatch) {
        dispatch(setLoadStatus(LOAD_START));

        NotesDB
            .getAllNotes()
            .then(notes => {
                dispatch(addAllNotes(notes));
                dispatch(setLoadStatus(LOAD_SUCCESS));
            })
            .catch(() => {
                dispatch(setLoadStatus(LOAD_ERROR));
            });
    }
}

export function addAllNotes(notes) {
    return {
        type: ADD_ALL_NOTES,
        payload: {
            notes
        }
    }
}

export function addNote(title, body) {
    return function (dispatch) {
        const note = {
            title,
            body,
            updatedAt: new Date().toISOString(),
            id: uuidv4()
        }

        dispatch(setLoadStatus(LOAD_START));
        NotesDB
            .addNote(note)
            .then(() => {
                dispatch({
                    type: ADD_NOTE,
                    payload: {
                        note
                    }
                });
                dispatch(setLoadStatus(LOAD_SUCCESS));
            })
            .catch(() => {
                dispatch(setLoadStatus(LOAD_ERROR));
            });
    }
}

export function deleteNote(id) {
    return function (dispatch) {
        dispatch(setLoadStatus(LOAD_START));
        NotesDB
            .deleteNote(id)
            .then(() => {
                dispatch({
                    type: DEL_NOTE,
                    payload: {
                        id
                    }
                });
                dispatch(setLoadStatus(LOAD_SUCCESS));
            })
            .catch(() => {
                dispatch(setLoadStatus(LOAD_ERROR));
            });
    }
}

export function editNote(id, title, body) {
    return function (dispatch) {
        dispatch(setLoadStatus(LOAD_START));
        NotesDB
            .editNote(id, title, body)
            .then(() => {
                dispatch({
                    type: EDIT_NOTE,
                    payload: {
                        id,
                        title,
                        body
                    }
                });
                dispatch(setLoadStatus(LOAD_SUCCESS));
            })
            .catch(() => {
                dispatch(setLoadStatus(LOAD_ERROR));
            });
    }
}

export function switchNoteMode(id) {
    return {
        type: SWITCH_NOTE_MODE,
        payload: {
            id
        }
    }
}

export function updateSearchQuery(searchQuery) {
    return {
        type: UPDATE_SEARCH_QUERY,
        payload: {
            searchQuery
        }
    }
}

export const changeSortProps = (sortBy, sortOrder) => dispatch => {
    dispatch(changeSortBy(sortBy));
    dispatch(changeSortOrder(sortOrder));
};

export function changeSortBy(sortBy) {
    return {
        type: CHANGE_SORT_BY,
        payload: {
            sortBy
        }
    }
}

export function changeSortOrder(sortOrder) {
    return {
        type: CHANGE_SORT_ORDER,
        payload: {
            sortOrder
        }
    }
}

export function setLoadStatus(status) {
    return {
        type: SET_LOAD_STATUS,
        payload: {
            status
        }
    }
}