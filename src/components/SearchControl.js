import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { updateSearchQuery } from '../redux/actions';

const styles = () => ({
    paper: {
        padding: 18,
        margin: 10,
        width: 120,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around'
    }
});

const mapStateToProps = state => {
    return {
        searchQuery: state.get('filters').get('searchQuery')
    }
}

const mapDispatchToProps = dispatch => ({
    updateSearchQuery: searchQuery => dispatch(updateSearchQuery(searchQuery))
});

function SearchControl(props) {
    const { classes } = props;

    const handleQueryUpdate = e => props.updateSearchQuery(e.target.value);

    return (
        <Paper className={classes.paper}>
            <h2>Search</h2>
            <TextField
                placeholder="Start typing..."
                name='search'
                autoComplete='off'
                InputProps={{
                    classes: {
                        input: classes.search
                    }
                }}
                onChange={handleQueryUpdate}
            />
        </Paper>
    );
}



export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps)
)(SearchControl);