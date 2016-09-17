import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Tabs, Tab } from 'material-ui/Tabs';
import Link from '../Link';

import s from './Navigation.css';

class Navigation extends Component {
  render() {
    return (
      <Tabs value={this.props.activeTab}>
        <Tab
          label="Main"
          containerElement={<Link to="/" className="tab" />}
          value="Main"
        />
        <Tab
          label="Mods"
          containerElement={<Link to="/module" style={{ 'background-color': '#00bcd4' }} />}
          value="Mods"
        />
        <Tab
          label="Meet"
          containerElement={<Link to="/group" style={{ 'background-color': '#00bcd4' }} />}
          value="Meet"
        />
      </Tabs>
    );
  }
}

export default withStyles(s)(Navigation);
