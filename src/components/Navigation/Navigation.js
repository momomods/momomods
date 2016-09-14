import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {Tabs, Tab} from 'material-ui/Tabs';
import Link from '../Link';

import s from './Navigation.css';

class Navigation extends Component {

    render() {
        return (
            <Tabs>
                <Tab label="Main" containerElement={<Link to="/" className="tab"/>}>
                </Tab>
                <Tab label="Mods" containerElement={<Link to="/module" style={{'background-color': '#00bcd4'}}/>}>
                </Tab>
                <Tab label="Meet" containerElement={<Link to="/group" style={{'background-color': '#00bcd4'}}/>}>
                </Tab>
            </Tabs>
        );
    }
}

export default withStyles(s)(Navigation);
