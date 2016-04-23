import './List.css';
import React, { Component, PropTypes } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import ListItem from './ListItem';

class List extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return shallowCompare(this, nextProps, nextState);
    }

    render() {
        return (
            <ul className="results">
                { this.props.results.items.map((item) =>
                    <ListItem key={ item.name } item={ item } />
                ) }
            </ul>
        );
    }
}

List.propTypes = {
    results: PropTypes.object.isRequired,
};

export default List;
