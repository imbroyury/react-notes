import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { addNote } from '../redux/actions';

const styles = () => ({
    paper: {
        padding: 18,
        margin: 10
    },
    input: {
        margin: 5
    }
});

const mapDispatchToProps = dispatch => {
    return {
        addNote: (title, body) => dispatch(addNote(title, body))
    }
}

class AddNoteForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            body: ''
        }
    }

    handleChange = e => {
        const value = e.target.value,
            name = e.target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit = e => {
        e.preventDefault();

        const { title, body } = this.state;
        this.props.addNote(title, body);
        this.setState({
            title: '',
            body: ''
        });
    }

    render() {
        const { classes } = this.props;
        return (
            <Paper className={classes.paper}>
                <form onSubmit={this.handleSubmit}>
                    <h2>New Note</h2>
                    <Input
                        placeholder="Note title"
                        className={classes.input}
                        inputProps={{
                            'aria-label': 'Title',
                        }}
                        name='title'
                        value={this.state.title}
                        onChange={this.handleChange}
                        required
                        autoComplete='off'
                    />
                    <Grid container>
                        <TextField
                            placeholder="Note description"
                            className={classes.input}
                            multiline
                            rowsMax="4"
                            name='body'
                            value={this.state.body}
                            onChange={this.handleChange}
                            required
                            autoComplete='off'
                        />
                        <Button variant="outlined" color="primary" className={classes.button} type='submit'>
                            Add Note
                        </Button>
                    </Grid>
                </form>
            </Paper>
        );
    }
}



export default compose(
    withStyles(styles),
    connect(null, mapDispatchToProps)
)(AddNoteForm);