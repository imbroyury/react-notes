import React from 'react';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import DeleteIcon from '@material-ui/icons/Delete';

export default function Note(props) {
    return (
        <Grid item xs={12} sm={6} md={4} lg={3} >
            <Card>
                <CardContent>
                    <Typography color="textSecondary">
                    </Typography>
                    <Typography variant="headline" component="h2">
                        {props.title}
                    </Typography>
                    <Typography component="p">
                        {props.body}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button color="secondary" aria-label="Edit" onClick={props.switchMode}>
                        <Icon>edit_icon</Icon>
                    </Button>
                    <Button aria-label="Delete" onClick={props.deleteNote}>
                        <DeleteIcon />
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    );
}
