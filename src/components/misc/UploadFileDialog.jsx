import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Input,
    Link,
} from '@material-ui/core';
import {
    uploadFile,
} from '../../actions/uploads';

const mapStateToProps = ({ user }) => ({
    expiryTime: user.currentUser.active_subscription.expiryTime,
});

const UploadFileDialog = props => {
    const [file, setFile] = useState(null);

    const onClose = () => {
        setFile(null);
        props.onClose();
    };

    const onSubmitUpload = () => {
        props.dispatch(uploadFile(file, props.expiryTime));
        onClose();
    };

    const onChangeFile = ev => {
        setFile(ev.target.files[0]);
    };

    return (
        <Dialog open={ props.open } onClose={ onClose }>
            <DialogTitle>Upload a file</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    File upload using&nbsp;
                    <Link href="https://www.file.io/"
                        target="_blank"
                        color="secondary">
                            file.io
                    </Link>.
                </DialogContentText>
                <Input type="file" onChange={ onChangeFile }/>
            </DialogContent>
            <DialogActions>
                <Button onClick={ onClose }>
                    Cancel
                </Button>
                <Button disabled={ file == null }
                    onClick={ onSubmitUpload }>
                    Upload
                </Button>
            </DialogActions>
        </Dialog>
    );
};

UploadFileDialog.propTypes = {
    dispatch: PropTypes.func.isRequired,
    expiryTime: PropTypes.number.isRequired,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(UploadFileDialog);
