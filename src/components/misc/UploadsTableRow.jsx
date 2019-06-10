import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import {
    ClickAwayListener,
    Hidden,
    IconButton,
    Link,
    TableCell,
    TableRow,
    Tooltip,
    withStyles,
} from '@material-ui/core';
import {
    FileCopy,
} from '@material-ui/icons';
import formatBytes from '../../utils/formatBytes';

const styles = theme => ({
    copyIcon: {
        padding: 3,
        marginLeft: 5,
        fontSize: theme.typography.fontSize,
    },
});

const UploadsTableRow = props => {
    const { upload, classes } = props;
    const [tooltipOpen, setTooltipOpen] = useState(false);

    return (
        <TableRow key={ upload.name }>
            <TableCell component="th" scope="row">
                { upload.name }
            </TableCell>
            <TableCell align="right">{ upload.type }</TableCell>
            <TableCell align="right">{ formatBytes(upload.size) }</TableCell>
            <TableCell align="right">{ upload.timeOfUpload }</TableCell>
            <TableCell align="right">{ upload.timeOfExpire }</TableCell>
            <TableCell align="right">
                <Link href={ upload.link }
                    target="_blank"
                    color="secondary">
                    { upload.link }
                </Link>
                <Hidden xsDown>
                    <ClickAwayListener onClickAway={ () => setTooltipOpen(false) }>
                        <CopyToClipboard text={ upload.link } onCopy={ () => setTooltipOpen(true) }>
                            <Tooltip open={ tooltipOpen }
                                onClose={ () => setTooltipOpen(false) }
                                disableFocusListener
                                disableHoverListener
                                disableTouchListener
                                title="Copied!">
                                    <IconButton className={ classes.copyIcon }>
                                        <FileCopy fontSize="inherit"/>
                                    </IconButton>
                            </Tooltip>
                        </CopyToClipboard>
                    </ClickAwayListener>
                </Hidden>
            </TableCell>
        </TableRow>
    );
};

UploadsTableRow.propTypes = {
    classes: PropTypes.object,
    upload: PropTypes.shape({
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        size: PropTypes.number.isRequired,
        timeOfUpload: PropTypes.string.isRequired,
        timeOfExpire: PropTypes.string.isRequired,
        link: PropTypes.string.isRequired,
    }),
};

export default withStyles(styles)(UploadsTableRow);
