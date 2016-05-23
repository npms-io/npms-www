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
        if (!this.props.results) {
            return this._renderEmpty();
        }

        if (!this.props.results.total) {
            return this._renderNoResults();
        }

        return (
            <div className="results-list has-results">
                <div className="summary">
                    <div className="header-component-align-with-search-box ellipsis">
                        <span className="nr-results">{ this.props.results.total }</span> results for <span className="term">
                        { this.props.results.term }</span>
                    </div>
                </div>

                <ul className="items header-component-align-with-search-box">
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

    _renderEmpty() {
        return (
            <div className="results-list is-empty header-component-align-with-search-box">
            </div>
        );
    }

    _renderNoResults() {
        return (
            <div className="results-list has-no-results header-component-align-with-search-box">
                Sorry no results for <span className="term">{ this.props.results.term }</span>.
            </div>
        );
    }
}

List.propTypes = {
    results: PropTypes.object,
    onLoadMore: PropTypes.func.isRequired,
};

export default List;
