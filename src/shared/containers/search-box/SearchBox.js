import './SearchBox.css';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import shallowCompare from 'react-addons-shallow-compare';
import { updateQuery, navigate } from 'shared/state/search/actions';

class SearchBox extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return shallowCompare(this, nextProps, nextState);
    }

    render() {
        return (
            <form className="search-box-component" onSubmit={ (e) => this._handleSubmit(e) }>
                <div className="search-input">
                    <input type="text" placeholder="Search modules"
                        value={ this.props.query.term }
                        ref={ (ref) => { this._inputEl = ref; } }
                        onChange={ () => this._handleInputChange() } />
                    <button><i className="material-icons">search</i></button>
                </div>
            </form>
        );
    }

    // ---------------------------------------------

    _handleInputChange() {
        const query = { term: this._inputEl.value };

        this.props.dispatch(updateQuery(query));
    }

    _handleSubmit(e) {
        e.preventDefault();
        this._inputEl.blur();
        this.props.dispatch(navigate());
    }
}

SearchBox.propTypes = {
    dispatch: PropTypes.func.isRequired,
    query: PropTypes.object.isRequired,
};

export default connect((state) => ({
    query: state.search.query,
}))(SearchBox);
