import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import s from './SplashScreen.css';

class SplashScreen extends Component {
    render() {
        return (
            <div className={s.splashContainer}>
                <div className={s.logoContainer}>
                    <img src="/logo_colour_300.png" />
                </div>
                <div className={s.textContainer}>mods+</div>
            </div>
        );
    }
}

export default withStyles(s)(SplashScreen);
