import './ResultsList.css';
import React, { Component, PropTypes } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import Waypoint from 'react-waypoint';
import ResultsListItem from './ResultsListItem';

// TODO: Add animation to list

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

        return this._renderHasResults();
    }

    _renderEmpty() {
        return (
            <div className="results-list is-empty header-component-with-logo-align-with-search-box" />
        );
    }

    _renderNoResults() {
        return (
            <div className="results-list has-no-results header-component-with-logo-align-with-search-box">
                Sorry no results for <span className="term">{ this.props.results.term }</span>.
            </div>
        );
    }
    _renderHasResults() {
        return (
            <div className="results-list has-results">
                <div className="summary">
                    <div className="header-component-with-logo-align-with-search-box ellipsis">
                        <span className="nr-results">{ this.props.results.total }</span> results for <span className="term">
                        { this.props.results.term }</span>
                    </div>
                </div>

                <ul className="items header-component-with-logo-align-with-search-box">
                    { this.props.results.items.map((item) =>
                        <ResultsListItem key={ item.module.name } module={ item.module } score={ item.score } />
                    ) }
                </ul>

                <Waypoint
                    onEnter={ (props) => this.props.onLoadMore(props) }
                    scrollableAncestor={ window }
                    threshold={ 0.2 } />
            </div>
        );
    }
}

List.propTypes = {
    results: PropTypes.object,
    onLoadMore: PropTypes.func.isRequired,
};

export default List;
