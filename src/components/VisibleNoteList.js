import React from "react";

import { connect } from 'react-redux';

import { getFilteredOrderedNotes } from '../redux/selectors';

import NoteList from './NoteList';

const mapStateToProps = state => ({
  notes: getFilteredOrderedNotes(state)
});

const VisibleNoteList = props => (
  <NoteList notes={props.notes} />
);

export default connect(mapStateToProps, null)(VisibleNoteList);