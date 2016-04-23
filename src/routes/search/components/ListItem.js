import './ListItem.css';
import React, { Component, PropTypes } from 'react';
import shallowCompare from 'react-addons-shallow-compare';

class ListItem extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return shallowCompare(this, nextProps, nextState);
    }

    render() {
        return (
            <li>{ this.props.item.name }</li>
        );
    }
}

ListItem.propTypes = {
    item: PropTypes.object.isRequired,
};

export default ListItem;
