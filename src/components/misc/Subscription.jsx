import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Fade,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Typography,
    withStyles,
} from '@material-ui/core';
import {
    AccessTime,
    AddShoppingCart,
    GetApp,
    Storage,
} from '@material-ui/icons';
import {
    upgradeSubscription,
} from '../../actions/subscriptions';

const LIST_ITEM_ICONS = {
    available_space: {
        icon: <Storage/>,
    },
    expiry_time: {
        icon: <AccessTime/>,
    },
    downloads: {
        icon: <GetApp/>,
    },
};

const styles = theme => ({
    cardContent: {
        backgroundColor: '#4d4d4d',
    },
    cardHeader: {
        backgroundColor: '#424242',
    },
    cardPricing: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'baseline',
        marginBottom: theme.spacing(2),
    },
    upgradeButtonIcon: {
        marginRight: theme.spacing(1),
    },
});

const mapStateToProps = ({ user }) => ({
    currentUser: user.currentUser,
});

const Subscription = props => {
    const { data, classes, currentUser, dispatch } = props;
    const currentPlan = currentUser.active_subscription.name == data.name;

    const onUpgradeButtonClick = () => {
        dispatch(upgradeSubscription());
    };

    return (
        <Fade in>
            <Card>
                <CardHeader title={ data.name }
                    subheader={ currentPlan? 'Current plan' : null}
                    titleTypographyProps={{ align: 'center' }}
                    subheaderTypographyProps={{ align: 'center' }}
                    className={ classes.cardHeader }/>
                <CardContent className={ classes.cardContent } >
                    <div className={ classes.cardPricing }>
                        <Typography variant="h3">
                            ${ data.price }
                        </Typography>
                        <Typography variant="h6">
                            /month
                        </Typography>
                    </div>
                    <List>
                        { Object.keys(data).map(spec => {
                            if (!Object.keys(LIST_ITEM_ICONS).includes(spec)) return null;
                            return (
                                <ListItem key={ spec }>
                                    <ListItemIcon>
                                        { LIST_ITEM_ICONS[spec].icon }
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={ data[spec] }
                                    />
                                </ListItem>
                            );
                        })}
                    </List>
                    <Typography paragraph>{ data.desc }</Typography>
                </CardContent>
                <CardActions className={ classes.cardContent }>
                    <Button fullWidth variant="contained"
                        color="secondary"
                        onClick={ onUpgradeButtonClick }
                        disabled={ currentPlan }>
                            <AddShoppingCart className={ classes.upgradeButtonIcon }/>
                            { `Upgrade to ${ data.name }` }
                    </Button>
                </CardActions>
            </Card>
        </Fade>
    );
};

Subscription.propTypes = {
    data: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        availableSpace: PropTypes.string.isRequired,
        expiryTime: PropTypes.string.isRequired,
        downloads: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        desc: PropTypes.string.isRequired,
    }).isRequired,
    dispatch: PropTypes.func.isRequired,
    classes: PropTypes.object,
    currentUser: PropTypes.shape({
        id: PropTypes.number.isRequired,
        first_name: PropTypes.string.isRequired,
        last_name: PropTypes.string.isRequired,
        avatar: PropTypes.string,
        active_subscription: PropTypes.object,
    }),
};

export default connect(mapStateToProps)(withStyles(styles)(Subscription));
