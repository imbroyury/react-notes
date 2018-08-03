import React from "react";

import { connect } from 'react-redux';

import NoteList from './NoteList';


const filterAndOrderNotes = state => {
  const notes = state.get('notes'),
    filters = state.get('filters'),
    searchQuery = filters.get('searchQuery'),
    sortBy = filters.get('sortBy'),
    sortOrder = filters.get('sortOrder');

  return orderNotes(filterNotesByQuery(notes, searchQuery), sortBy, sortOrder);
}

const filterNotesByQuery = (notes, query) => {
  return query ?
    notes.filter(note => (
      note.get('title').toLowerCase().includes(query.toLowerCase()) ||
      note.get('body').toLowerCase().includes(query.toLowerCase())
    )) :
    notes;
}

const orderNotes = (notes, sortBy, sortOrder) => {
  return notes.sort(comparator);

  function comparator(a, b) {
    const aProp = a.get(sortBy).toLowerCase();
    const bProp = b.get(sortBy).toLowerCase();

    if (aProp < bProp) {
      return sortOrder === 'ascending' ? -1 : 1;
    } else if (aProp > bProp) {
      return sortOrder === 'ascending' ? 1 : -1;
    } else {
      return 0;
    }
  }
}


const mapStateToProps = state => {
  return {
    notes: filterAndOrderNotes(state)
  };

};

function VisibleNoteList(props) {
  return (
    <NoteList notes={props.notes}/>
  );

}

export default connect(mapStateToProps, null)(VisibleNoteList);