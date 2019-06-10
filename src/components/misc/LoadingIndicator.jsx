import React from 'react';
import {
    CircularProgress,
    Grid,
} from '@material-ui/core';

const LoadingIndicator = () => {
    return (
        <Grid container justify="center" >
            <Grid item>
                <CircularProgress color="secondary"/>
            </Grid>
        </Grid>
    );
};

export default LoadingIndicator;
