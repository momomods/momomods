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

import s from './Header.css';
import logoUrl from './logo-small.png';

class Header extends Component {
    render() {
       return (
           <div>
               <AppBar title="mods+" iconClassNameRight="muidocs-icon-navigation-expand-more"/>

           </div>
        );
    }
}

export default withStyles(s)(Header);
