import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { changeSortProps } from '../redux/actions';

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
    const sortBy = state.get('filters').get('sortBy'),
        sortOrder = state.get('filters').get('sortOrder');
    let sortValue = null;

    if (sortBy === 'updatedAt' && sortOrder === 'ascending') {
        sortValue = 'oldest';
    } else if (sortBy === 'updatedAt' && sortOrder === 'descending') {
        sortValue = 'newest';
    } else if (sortBy === 'title' && sortOrder === 'ascending') {
        sortValue = 'a-z';
    } else if (sortBy === 'title' && sortOrder === 'descending') {
        sortValue = 'z-a';
    }

    return {
        sortValue
    }
}

const mapDispatchToProps = dispatch => ({
    handleSortChange: e => {
        switch (e.target.value) {
            case 'newest':
                return dispatch(changeSortProps('updatedAt', 'descending'));
            case 'oldest':
                return dispatch(changeSortProps('updatedAt', 'ascending'));
            case 'a-z':
                return dispatch(changeSortProps('title', 'ascending'));
            case 'z-a':
                return dispatch(changeSortProps('title', 'descending'));
            default:
                return dispatch(changeSortProps('title', 'ascending'));
        }
    }
});

function SortControl(props) {
    return (
        <Paper className={props.classes.paper}>
            <h2>Sort</h2>
            <FormControl>
                <InputLabel htmlFor="sort-by">Sort By</InputLabel>
                <Select
                    value={props.sortValue}
                    onChange={props.handleSortChange}
                    inputProps={{
                        name: 'sortBy',
                        id: 'sort-by',
                    }}
                >
                    <MenuItem value={'newest'}>Newest</MenuItem>
                    <MenuItem value={'oldest'}>Oldest</MenuItem>
                    <MenuItem value={'a-z'}>A - Z</MenuItem>
                    <MenuItem value={'z-a'}>Z - A</MenuItem>
                </Select>
            </FormControl>
        </Paper>
    );
};

export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps)
)(SortControl);