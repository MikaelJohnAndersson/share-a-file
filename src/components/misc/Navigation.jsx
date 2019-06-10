import React, { useState } from 'react';
import PropTypes from 'prop-types';
import logo from '../../../resources/logo.png'
import { Link, withRouter } from "react-router-dom";
import {
    AppBar,
    Divider,
    Drawer,
    Grid,
    Hidden,
    IconButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    MenuList,
    Toolbar,
    Typography,
    withStyles,
} from '@material-ui/core';
import {
    AccountCircle,
    Dashboard,
    Menu as MenuIcon,
    Shop,
} from '@material-ui/icons';

const styles = theme => ({
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: theme.drawer.width,
            flexShrink: 0,
        },
    },
    appBar: {
        marginLeft: theme.drawer.width,
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${ theme.drawer.width }px)`,
        },
    },
    drawerPaper: {
        width: theme.drawer.width,
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    toolbar: {
        height: theme.appBar.maxHeight,
    },
    logo: {
        height: '100%',
        maxWidth: '100%',
        display: 'block',
        margin: 'auto',
    },
});

const NAV_ITEMS = {
    dashboard: {
        text: 'Dashboard',
        path: '/dashboard',
        icon: <Dashboard/>,
    },
    upload: {
        text: 'Shop',
        path: '/shop',
        icon: <Shop/>,
    },
}

const Navigation = props => {
    const { classes, location } = props;
    const [mobileOpen, setMobileOpen] = useState(false);
    const [userMenuAnchorEl, setUserMenuAnchorEl] = useState(null);

    const onToggleDrawerOpen = () => {
        setMobileOpen(!mobileOpen);
    }

    const onOpenUserMenu = ev => {
        setUserMenuAnchorEl(ev.currentTarget);
    };

    const onCloseUserMenu = () => {
        setUserMenuAnchorEl(null);
    };

    const drawerContent = (
        <React.Fragment>
            <div className={ classes.toolbar }>
                <img className={ classes.logo }
                    src={ logo }
                    alt="Logo"/>
            </div>
            <Divider/>
            <MenuList>
                { Object.values(NAV_ITEMS).map((item, index) => {
                    return (
                        <MenuItem button key={ index}
                            component={ Link }
                            to={ item.path }
                            selected={ item.path == location.pathname }>
                            <ListItemIcon>
                                { item.icon }
                            </ListItemIcon>
                            <ListItemText primary={ item.text } />
                        </MenuItem>
                    );
                })}
            </MenuList>
        </React.Fragment>
    );

    const activeSection = Object.values(NAV_ITEMS).find(item => {
        return item.path == location.pathname;
    });
    const appBarTitle = activeSection? activeSection.text : 'Dashboard';

    return (
        <React.Fragment>
            <AppBar color="inherit" className={ classes.appBar } position="fixed">
            <Toolbar>
                <Grid container justify="space-between" alignItems="center">
                    <Grid item xs container alignItems="center">
                        <IconButton color="inherit"
                            edge="start"
                            onClick={ onToggleDrawerOpen }
                            className={ classes.menuButton }>
                        <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" noWrap>
                            { appBarTitle }
                        </Typography>
                    </Grid>
                    <Grid item xs={ 1 } container justify="flex-end">
                        <IconButton onClick={ onOpenUserMenu }>
                            <AccountCircle/>
                        </IconButton>
                            <Menu keepMounted
                                anchorEl={ userMenuAnchorEl }
                                open={ userMenuAnchorEl != null }
                                onClose={ onCloseUserMenu }>
                                <MenuList>
                                    <MenuItem>My Account</MenuItem>
                                    <MenuItem>Logout</MenuItem>
                                </MenuList>
                            </Menu>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
        <nav className={ classes.drawer }>
            <Hidden smUp implementation="css">
            <Drawer variant="temporary"
                open={ mobileOpen }
                onClose={ onToggleDrawerOpen }
                classes={{
                    paper: classes.drawerPaper,
                }}>
                { drawerContent }
            </Drawer>
            </Hidden>
            <Hidden xsDown implementation="css">
                <Drawer className={ classes.drawer }
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    variant="permanent"
                    anchor="left">
                    { drawerContent }
                </Drawer>
            </Hidden>
        </nav>
        </React.Fragment>
    );
}

Navigation.propTypes = {
    location: PropTypes.object,
    classes: PropTypes.object,
};

export default withRouter(withStyles(styles)(Navigation));
