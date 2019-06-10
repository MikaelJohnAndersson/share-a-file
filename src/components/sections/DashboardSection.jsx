import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Chart from 'react-apexcharts';
import {
    Link as RouterLink,
} from 'react-router-dom';
import {
    Button,
    Fab,
    Fade,
    Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Tooltip,
    Typography,
    withStyles,
    Zoom,
} from '@material-ui/core';
import {
    CloudDone,
    CloudUpload,
    DataUsage,
    Storage,
} from '@material-ui/icons';
import {
    retrieveUploads,
} from '../../actions/uploads';
import formatBytes from '../../utils/formatBytes';

import UploadFileDialog from '../misc/UploadFileDialog';
import UploadsTableRow from '../misc/UploadsTableRow';
import LoadingIndicator from '../misc/LoadingIndicator';

const styles = theme => ({
    paper: theme.paper,
    fab: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
    paperHeading: theme.paperHeading,
    premiumButton: {
        marginTop: theme.spacing(2),
    },
});

const mapStateToProps = ({ uploads, user }) => ({
    uploads: uploads.uploads,
    currentUser: user.currentUser,
});

const DashboardSection = props => {
    const { classes, currentUser, dispatch, uploads } = props;

    const [dialogOpen, setDialogOpen] = useState(false);
    useEffect(() => {
        if (currentUser) {
            dispatch(retrieveUploads(currentUser.id));
        }
    }, [currentUser]);

    if (!uploads || !currentUser ) {
        return <LoadingIndicator/>;
    }

    const onOpenDialog = () => {
        setDialogOpen(true);
    };

    const onCloseDialog = () => {
        setDialogOpen(false);
    };

    const mapChartData = uploads => {
        const data = [];
        uploads.forEach(upload => {
            const index = data.findIndex( u => u.x == upload.timeOfUpload);
            if (index != -1) {
                data[index].y++;
            }
            else {
                data.push({ x: upload.timeOfUpload, y: 1 })
            }
        });
        return data;
    };

    const series = [{
        name: 'Uploads',
        data: mapChartData(uploads),
    }];

    const maxUploadsOnSingleDay = Math.max(...series[0].data.map(u => u.y), 0);

    const chartOpts = {
        chart: {
            id: 'chart-main',
            toolbar: {
                show: false,
            },
            zoom: {
                enabled: false,
            },
            background: '#424242',
        },
        theme: {
            mode: 'dark',
        },
        xaxis: {
            type: 'datetime',
        },
        yaxis: {
            tickAmount: maxUploadsOnSingleDay < 6? maxUploadsOnSingleDay : 6,
            labels: {
                formatter: val => {
                  return Math.round(val);
                },
            }
        },
        tooltip: {
            x: {
                format: 'dd MMM yyyy',
            },
        },
        dataLabels: {
            enabled: false
        },
        colors: ['#FFFFFF'],
    };

    const activeSubscription = currentUser.active_subscription;
    const uploadedSpace = uploads.reduce((total, upload) => total + upload.size, 0);

    let remainingSpace;
    if (activeSubscription.name == 'PREMIUM'){
        remainingSpace = <span>&infin;</span>;
    }
    else {
        remainingSpace = activeSubscription.availableSpace - uploadedSpace;
    }

    let upgradeSection = null;
    if (activeSubscription != 'PREMIUM') {
        upgradeSection = (
            <Paper className={ classes.paper }>
                <Grid container>
                    <Grid item>
                        <Typography variant="h4">
                            { `You have ${ formatBytes(remainingSpace) } left.` }
                        </Typography>
                        <Typography variant="h6">
                            { `Your files will be deleted after ${ activeSubscription.downloads } download(s).` }
                        </Typography>
                        <Button
                            component={ RouterLink }
                            to="/shop"
                            variant="contained"
                            color="secondary"
                            className={ classes.premiumButton }>
                                Upgrade subscription
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        );
    }

    return (
        <React.Fragment>
            { upgradeSection }
            <Typography variant="h6" className={ classes.paperHeading }>
                My uploads
            </Typography>
            <Paper className={ classes.paper }>
                <Grid container>
                    <Grid item xs={ 12 }>
                        <Table>
                            <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell align="right">Type</TableCell>
                                <TableCell align="right">Size</TableCell>
                                <TableCell align="right">Time of upload</TableCell>
                                <TableCell align="right">Time of expire</TableCell>
                                <TableCell align="right">Link</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            { props.uploads.map(upload => (
                                <UploadsTableRow key={ upload.name } upload={ upload }/>
                            )) }
                            </TableBody>
                        </Table>
                    </Grid>
                </Grid>
            </Paper>
            <Typography variant="h6" className={ classes.paperHeading }>
                Activity
            </Typography>
            <Grid container spacing={ 3 }>
                <Grid item xs={ 12 } sm={ 8 }>
                    <Paper className={ classes.paper }>
                        <Fade in>
                            <Chart options={ chartOpts } series={ series }
                                type="bar" height={ 400 } />
                        </Fade>
                    </Paper>
                </Grid>
                <Grid item xs={ 12 } sm={ 4 }>
                    <Paper className={ classes.paper }>
                        <List>
                            <ListItem>
                                <ListItemIcon>
                                    <CloudDone/>
                                </ListItemIcon>
                                <ListItemText
                                    primary="Number of uploads"
                                    secondary={ uploads.length }
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <DataUsage/>
                                </ListItemIcon>
                                <ListItemText
                                    primary="Total file size uploaded"
                                    secondary={ formatBytes(uploadedSpace) }
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <Storage/>
                                </ListItemIcon>
                                <ListItemText
                                    primary={ `Space left on ${ activeSubscription.name } plan` }
                                    secondary={ formatBytes(remainingSpace) }
                                />
                            </ListItem>
                        </List>
                    </Paper>
                </Grid>
            </Grid>
            <Zoom in>
                <Tooltip title="Upload file">
                <Fab color="secondary"
                    onClick={ onOpenDialog }
                    className={ classes.fab }>
                    <CloudUpload/>
                </Fab>
                </Tooltip>
            </Zoom>
            <UploadFileDialog open={ dialogOpen } onClose={ onCloseDialog }/>
        </React.Fragment>
    );
};

DashboardSection.propTypes = {
    classes: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    currentUser: PropTypes.shape({
        id: PropTypes.number.isRequired,
        first_name: PropTypes.string.isRequired,
        last_name: PropTypes.string.isRequired,
        avatar: PropTypes.string,
        active_subscription: PropTypes.object,
    }).isRequired,
    uploads: PropTypes.array,
};

export default connect(mapStateToProps)(withStyles(styles)(DashboardSection));
