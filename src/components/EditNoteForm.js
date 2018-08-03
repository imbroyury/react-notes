import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = () => ({
    title: {
        width: '100%'
    },
    titleInput: {
        fontSize: '1.5rem',
        padding: 0
    },
    body: {
        width: '100%'
    },
    bodyInput: {
        fontSize: '0.875rem'
    }
});

class EditNoteForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: this.props.title,
            body: this.props.body,
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
        this.props.editNote(this.state.title, this.state.body);
        this.props.switchMode();
    }

    render() {
        const { classes } = this.props;
        return (
            <Grid item xs={12} sm={6} md={4} lg={3} >
                <form onSubmit={this.handleSubmit}>
                    <Card>
                        <CardContent>
                            <TextField
                                placeholder="Note title"
                                className={classes.title}
                                InputProps={{
                                    classes: {
                                        input: classes.titleInput
                                    }
                                }}
                                name='title'
                                value={this.state.title}
                                onChange={this.handleChange}
                                required
                                autoComplete='off'
                            />
                            <TextField
                                placeholder="Note description"
                                className={classes.body}
                                InputProps={{
                                    classes: {
                                        input: classes.bodyInput
                                    }
                                }}
                                multiline
                                rowsMax="20"
                                name='body'
                                value={this.state.body}
                                onChange={this.handleChange}
                                required
                                autoComplete='off'
                            />
                        </CardContent>
                        <CardActions>
                            <Button variant="outlined" color="primary" className={classes.button} type='submit'>
                                Save
                            </Button>
                            <Button variant="outlined" color="secondary" className={classes.button} onClick={this.props.switchMode}>
                                Cancel
                            </Button>
                        </CardActions>
                    </Card>
                </form>
            </Grid>
        );
    }
}

export default withStyles(styles)(EditNoteForm);