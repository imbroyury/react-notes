import React from "react";

import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';

import NoteListItem from './NoteListItem';

const styles = () => ({
  grid: {
    padding: 10,
    margin: 0
  }
});

function NoteList({ notes, classes }) {
  return (
    <Grid container alignContent='center' spacing={16} className={classes.grid} >
      {notes.map(note => (
        <NoteListItem
          title={note.get('title')}
          body={note.get('body')}
          editMode={note.get('editMode')}
          id={note.get('id')}
          key={note.get('id')}
        />
      ))}
    </Grid>
  );
}

export default withStyles(styles)(NoteList);