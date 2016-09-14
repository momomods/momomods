import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import {List, ListItem} from 'material-ui/List';
import {lightGreen500} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import ContentAddBox from 'material-ui/svg-icons/content/add-box';

import s from './ModuleList.css';

class ModuleList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rah: '',
            modules: [
                {
                    code: 'CS1010',
                    name: 'Programming Something'
                },
                {
                    code: 'CS1010',
                    name: 'Programming Something'
                },
                {
                    code: 'CS1010',
                    name: 'Programming Something'
                },
                {
                    code: 'CS1010',
                    name: 'Programming Something'
                }
            ]
        };
    }

    render() {

        const rightIconButton = (
            <IconButton><ContentAddBox color={lightGreen500} /></IconButton>
        );

        var listItems = this.state.modules.map(function(module, i) {
            return (
                <ListItem
                key={i}
                primaryText={module.code}
                secondaryText={module.name}
                rightIconButton={rightIconButton}
                />
            );
        });

        return (
            <List>
            {listItems}
            </List>
        );
    }
}

export default withStyles(s)(ModuleList);
