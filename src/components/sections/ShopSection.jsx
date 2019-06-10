import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    Grid,
    Typography,
    withStyles,
} from '@material-ui/core';
import {
    retrieveSubscriptionPlans,
} from '../../actions/subscriptions';

import Subscription from '../misc/Subscription';

const styles = theme => ({
    paperHeading: theme.paperHeading,
});

const mapStateToProps = ({ subscriptions }) => ({
    subscriptionPlans: subscriptions.subscriptionPlans,
});

const ShopSection = props => {
    useEffect(() => props.dispatch(retrieveSubscriptionPlans()), []);

    return (
        <React.Fragment>
            <Typography variant="h5" className={ props.classes.paperHeading }>
                Available subscriptions
            </Typography>
            <Grid container spacing={ 3 }
                alignItems="flex-end">
                { props.subscriptionPlans.map(s => {
                    return (
                        <React.Fragment key={ s.id }>
                            <Grid item xs={ 12 } sm={ 4 }>
                                    <Subscription data={ s }/>
                            </Grid>
                        </React.Fragment>
                    );
                })}
            </Grid>
        </React.Fragment>
    );
};

ShopSection.propTypes = {
    classes: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    subscriptionPlans: PropTypes.array.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(ShopSection));
