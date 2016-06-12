import './SearchBox.css';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { updateQuery, navigate } from 'shared/state/search/actions';

class SearchBox extends Component {
    componentWillMount() {
        this._suggestion = this._getRandomSuggestion();
        this._inputValue = this.props.initiallyEmpty ? '' : this.props.query.term;
    }

    componentWillUpdate(nextProps) {
        if (nextProps.query.term !== this._inputValue) {
            this._inputValue = nextProps.query.term;
        }
    }

    render() {
        return (
            <form className="search-box-component" onSubmit={ (e) => this._handleSubmit(e) }>
                <div className="search-input">
                    <input type="text" placeholder={ `Search modules, like "${this._suggestion}"` }
                        value={ this._inputValue }
                        ref={ (ref) => { this._inputEl = ref; } }
                        onChange={ () => this._handleInputChange() } />
                    <button><i className="material-icons">search</i></button>
                </div>
            </form>
        );
    }

    // ---------------------------------------------

    _getRandomSuggestion() {
        const suggestions = [
            'test',
            'couchdb',
            'test framework',
            'socket',
            'promises',
        ];

        return suggestions[Math.floor(Math.random() * suggestions.length)];
    }

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
    initiallyEmpty: PropTypes.bool,
};

SearchBox.defaultProps = {
    initiallyEmpty: false,
};

export default connect((state, ownProps) => ({
    query: state.search.query,
    initiallyEmpty: ownProps.initiallyEmpty,
}))(SearchBox);
