import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import {List, ListItem} from 'material-ui/List';
import {lightGreen500} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import ContentAddBox from 'material-ui/svg-icons/content/add-box';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar'
import AutoComplete from 'material-ui/AutoComplete';

import s from './ModuleList.css';

class ModuleList extends Component {

    handleUpdateInput = (value) => {
        this.setState({
          dataSource: [
            value,
            value + value,
            value + value + value,
          ],
        });
     };

    render() {
        const rightIconButton = (
            <IconButton><ContentAddBox color={lightGreen500} /></IconButton>
        );

        var listItems = this.props.modules.map(function(module, i) {
            return (
                <ListItem
                key={i}
                primaryText={module.code + i}
                secondaryText={module.name}
                rightIconButton={rightIconButton}
                />
            );
        });

        return (
            <div>
                <div style={{position: 'fixed', 'zIndex': 10, left: '15px', right: '15px'}}>
                    <AutoComplete
                      hintText="Search for modules..."
                      dataSource={this.props.modules}
                      onUpdateInput={this.handleUpdateInput}
                      floatingLabelText="Module Search"
                      fullWidth={true}
                    />
                </div>
                <div style={{height: '70px'}}></div>
                <List style={{position: 'fixed', width: '100%', height: '80%', overflow: 'scroll'}}>
                    {listItems}
                </List>
            </div>
        );
    }
}

export default withStyles(s)(ModuleList);
