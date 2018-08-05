import React from "react";

import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import NoteList from './NoteList';

const getNotes = state => state.get('notes');
const getFilters = state => state.get('filters');
const getSearchQuery = state => state.get('filters').get('searchQuery');

const getFilteredNotes = createSelector(
  [getNotes, getSearchQuery],
  (notes, searchQuery) => {
    return searchQuery ?
    notes.filter(note => (
      note.get('title').toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.get('body').toLowerCase().includes(searchQuery.toLowerCase())
    )) :
    notes;
  }
);

const getFilteredOrderedNotes = createSelector(
  [getFilteredNotes, getFilters],
  (notes, filters) => {
    const sortBy = filters.get('sortBy'),
          sortOrder = filters.get('sortOrder');
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
);

const mapStateToProps = state => {
  return {
    notes: getFilteredOrderedNotes(state)
  };

};

function VisibleNoteList(props) {
  return (
    <NoteList notes={props.notes}/>
  );
};

export default connect(mapStateToProps, null)(VisibleNoteList);