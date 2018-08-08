import React from "react";

import { withStyles } from '@material-ui/core/styles';

// Material UI components
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = () => ({
    grid: {
        height: 50,
        flex: 1,
        display: 'flex',
        justifyContent: 'center'
    }
});

function LoadStatus(props) {
    
    let content = null;
    if (props.status === 'inProgress') {
        content = <CircularProgress />
    } else if (props.status === 'error') {
        content = <div>There's been an error</div>
    }

    return (
        <Grid item className={props.classes.grid}>
            {content}
        </Grid>
    )
}

export default withStyles(styles)(LoadStatus);