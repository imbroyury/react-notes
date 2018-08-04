export const ADD_NOTE = 'ADD_NOTE';
export const DEL_NOTE = 'DEL_NOTE';
export const SWITCH_NOTE_MODE = 'SWITCH_NOTE_MODE';
export const EDIT_NOTE = 'EDIT_NOTE';
export const UPDATE_SEARCH_QUERY = 'UPDATE_SEARCH_QUERY';
export const CHANGE_SORT_BY = 'CHANGE_SORT_BY';
export const CHANGE_SORT_ORDER = 'CHANGE_SORT_ORDER';

export function addNote(title, body) {
    return {
        type: ADD_NOTE,
        title,
        body
    }
}

export function deleteNote(id) {
    return {
        type: DEL_NOTE,
        id
    }
}

export function editNote(id, title, body) {
    return {
        type: EDIT_NOTE,
        id,
        title,
        body
    }
}

export function switchNoteMode(id) {
    return {
        type: SWITCH_NOTE_MODE,
        id
    }
}

export function updateSearchQuery(searchQuery) {
    return {
        type: UPDATE_SEARCH_QUERY,
        searchQuery
    }
}

export function changeSortBy(sortBy) {
    return {
        type: CHANGE_SORT_BY,
        sortBy
    }

}

export function changeSortOrder(sortOrder) {
    return {
        type: CHANGE_SORT_ORDER,
        sortOrder
    }
}
