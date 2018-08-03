import React from 'react';

import { withStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const styles = () => ({
    flex: {
        flexGrow: 1,
    },
    search: {
        color: 'white'
    }
});

function NavBar(props) {

    const { classes } = props;

    return (
        <AppBar position="sticky">
            <Toolbar>
                <IconButton color="inherit" aria-label="Menu">
                    <MenuIcon />
                </IconButton>
                <Typography variant="title" color="inherit" className={classes.flex}>
                    Note Taking App
                </Typography>
            </Toolbar>
        </AppBar>
    );
}

export default withStyles(styles)(NavBar);
