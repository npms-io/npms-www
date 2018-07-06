import './ResultsList.css';
import React, { Component, PropTypes } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import Waypoint from 'react-waypoint';
import ResultsListItem from './ResultsListItem';

// TODO: Add animation to list

class ResultsList extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return shallowCompare(this, nextProps, nextState);
    }

    render() {
        if (this.props.error) {
            return this._renderError();
        }

        if (!this.props.results) {
            return this._renderEmpty();
        }

        if (!this.props.results.total) {
            return this._renderNoResults();
        }

        return this._renderHasResults();
    }

    // ---------------------------------------------------------

    _renderEmpty() {
        return (
            <div className="results-list is-empty">
                <div className="summary">
                    <div className="header-component-with-logo-align-with-search-box" />
                </div>
            </div>
        );
    }

    _renderError() {
        const data = this.props.error.response && this.props.error.response.data;
        const err = data && data.message ? data : {};

        return (
            <div className="results-list has-error">
                <div className="summary">
                    <div className="header-component-with-logo-align-with-search-box ellipsis" />
                </div>

                <div className="header-component-with-logo-align-with-search-box">
                    <p>Oops, an error ocurred while fetching the results.</p>

                    <blockquote className="error">
                        { err.code ? <div className="code">{ err.code }</div> : '' }
                        { err.message ? <div className="message">{ err.message }</div> : '' }
                    </blockquote>
                </div>
            </div>
        );
    }

    _renderNoResults() {
        return (
            <div className="results-list has-no-results">
                <div className="summary">
                    <div className="header-component-with-logo-align-with-search-box ellipsis">
                        <span className="nr-results">0</span> results for <span className="query">{ this.props.results.q }</span>
                    </div>
                </div>

                <div className="no-results header-component-with-logo-align-with-search-box">
                    <p>Sorry there are no results for your query.<br />Perhaps try searching something different?</p>
                </div>
            </div>
        );
    }

    _renderHasResults() {
        return (
            <div className="results-list has-results">
                <div className="summary">
                    <div className="header-component-with-logo-align-with-search-box ellipsis">
                        <span className="nr-results">{ this.props.results.total }</span> results for{ ' ' }
                        <span className="query">{ this.props.results.q }</span>
                    </div>
                </div>

                <ul className="items header-component-with-logo-align-with-search-box">
                    { this.props.results.items.map((item, index) =>
                        <ResultsListItem
                            itemId={ index }
                            key={ item.package.name }
                            package={ item.package }
                            score={ item.score }
                            flags={ item.flags }
                            apiUrl={ this.props.apiUrl } />
                    )) }
                </ul>

                <Waypoint
                    onEnter={ (props) => this.props.onLoadMore(props) }
                    scrollableAncestor={ window }
                    threshold={ 0.2 } />
            </div>
        );
    }
}

ResultsList.propTypes = {
    results: PropTypes.object,
    error: PropTypes.object,
    onLoadMore: PropTypes.func.isRequired,
    apiUrl: PropTypes.string,
};

ResultsListItem.defaultProps = {
    apiUrl: 'https://api.npms.io',
};

export default ResultsList;
