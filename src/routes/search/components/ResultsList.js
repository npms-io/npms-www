import './ResultsList.css';
import React, { Component, PropTypes } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import Waypoint from 'react-waypoint';
import ResultsListItem from './ResultsListItem';

class List extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return shallowCompare(this, nextProps, nextState);
    }

    render() {
        if (!this.props.results.total) {
            return (
                <div className="results-list no-results">
                    Sorry no results for "<span className="term">{ this.props.results.term }".</span>
                </div>
            );
        }

        return (
            <div className="results-list">
                <ul className="items">
                    { this.props.results.items.map((item) =>
                        <ResultsListItem key={ item.name } item={ item } />
                    ) }
                </ul>

                <Waypoint
                    onEnter={ (props) => this.props.onLoadMore(props) }
                    threshold={ 0.2 } />
            </div>
        );
    }
}

List.propTypes = {
    results: PropTypes.object.isRequired,
    onLoadMore: PropTypes.func.isRequired,
};

export default List;
