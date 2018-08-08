import React, { Component } from "react";

import { withStyles } from '@material-ui/core/styles';
// Material UI components
import Grid from '@material-ui/core/Grid';

// Own React components
import NavBar from './NavBar';
import AddNoteForm from './AddNoteForm';
import VisibleNoteList from './VisibleNoteList';
import SortControl from "./SortControl";
import SearchControl from "./SearchControl";
import LoadStatus from "./LoadStatus";

import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { getAllNotesFromDB } from '../redux/actions';

const styles = () => ({
    grid: {
        padding: 18,
        margin: 0
    }
});

const mapStateToProps = state => ({
    loadStatus: state.get('loadStatus')
});

const mapDispatchToProps = dispatch => ({
    getAllNotes: () => dispatch(getAllNotesFromDB())
});

class App extends Component {
    componentDidMount() {
        console.log('CDM on APP called');
        console.log(this.props);
        this.props.getAllNotes();
    }

    render() {
        const { classes, loadStatus } = this.props;

        return (
            <Grid>
                <NavBar />
                <Grid container className={classes.grid} justify='center'>
                    <AddNoteForm />
                    <SortControl />
                    <SearchControl />
                </Grid>
                <Grid container>
                    <LoadStatus status={loadStatus}/>
                    <VisibleNoteList />
                </Grid>
            </Grid>
        );
    }
}

export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps)
)(App);