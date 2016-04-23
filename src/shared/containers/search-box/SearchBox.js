import './SearchBox.css';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import shallowCompare from 'react-addons-shallow-compare';
import { updateQuery, runQuery } from 'shared/state/search/actions';

class SearchBar extends Component {
    componentDidMount() {
        this._input.focus();
    }

    shouldComponentUpdate(nextProps, nextState) {
        return shallowCompare(this, nextProps, nextState);
    }

    render() {
        return (
            <form className="search-box-component" onSubmit={ (e) => this._handleSubmit(e) }>
                <div className="search-input">
                    <input type="text" placeholder="Search modules"
                        value={ this.props.query && this.props.query.term }
                        ref={ (el) => { this._input = el; } }
                        onChange={ () => this._handleInputChange() } />
                    <button><i className="material-icons">search</i></button>
                </div>
            </form>
        );
    }

    // ---------------------------------------------

    _getQuery() {
        return { term: this._input.value };
    }

    _handleInputChange() {
        this.props.dispatch(updateQuery(this._getQuery()));
    }

    _handleSubmit(e) {
        e.preventDefault();

        const query = this._getQuery();

        query.term = query.term.trim();
        query.term && this.props.dispatch(runQuery(query));
    }
}

SearchBar.propTypes = {
    dispatch: PropTypes.func.isRequired,
    query: PropTypes.object.isRequired,
};

export default connect((state) => {
    return { query: state.search.query };
})(SearchBar);
