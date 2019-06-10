import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
import {
    removeNotification,
} from '../../actions/notifications';

const mapStateToProps = ({ notifications }) => ({
    notifications: notifications.notifications,
});

const Notifier = props => {
    const [displayed, setDisplayed] = useState([]);

    useEffect(() => {
        props.notifications.forEach(n => {
            if (!displayed.includes(n.key)) {
                props.enqueueSnackbar(n.message, n.options);
                setDisplayed([...displayed, n.key]);
                props.dispatch(removeNotification(n.key));
            }
        });
    }, [props.notifications]);

    return null;
};

Notifier.propTypes = {
    enqueueSnackbar: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    notifications: PropTypes.array,
};

export default connect(mapStateToProps)(withSnackbar(Notifier));
