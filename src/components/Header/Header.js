/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

import Navigation from '../Navigation';

import s from './Header.css';
import logoUrl from './logo-small.png';

class Header extends Component {
    render() {
       return (
           <div>
               <div style={{position: 'fixed', width: '100%', 'zIndex': 10}}>
                   <AppBar
                       title="mods+"
                       showMenuIconButton={false}
                       iconElementRight={<FlatButton label="Login" />}
                       zDepth={0}
                   />
                   <Navigation />
               </div>
              <div style={{height: '112px', width: '100%'}}></div>
          </div>
        );
    }
}

export default withStyles(s)(Header);
