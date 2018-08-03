import React from "react";

import { withStyles } from '@material-ui/core/styles';
// Material UI components
import Grid from '@material-ui/core/Grid';

// Own React components
import NavBar from './NavBar';
import AddNoteForm from './AddNoteForm';
import VisibleNoteList from './VisibleNoteList';
import SortControl from "./SortControl";
import SearchControl from "./SearchControl";

const styles = () => ({
    grid: {
        padding: 18,
        margin: 0
    }
});

function App(props) {
    const classes = { props };
    return (
        <Grid>
            <NavBar />
            <Grid container className={classes.grid} justify='center'>
                <AddNoteForm />
                <SortControl />
                <SearchControl />
            </Grid>
            <Grid container>
                <VisibleNoteList />
            </Grid>
        </Grid>
    )
}

export default withStyles(styles)(App);