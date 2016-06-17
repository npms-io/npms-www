import './SearchBox.css';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { updateQuery, navigate } from 'shared/state/search/actions';

const suggestions = [
    'test',
    'couchdb',
    'test framework',
    'socket',
    'promises',
];

class SearchBox extends Component {
    constructor(props) {
        super(props);
        this._handleWindowKeyDown = this._handleWindowKeyDown.bind(this);
    }

    componentWillMount() {
        this._suggestion = this._getRandomSuggestion();
        this._inputValue = this.props.initiallyEmpty ? '' : this.props.query.term;

        window.addEventListener('keydown', this._handleWindowKeyDown);
    }

    componentWillUpdate(nextProps) {
        if (nextProps.query.term !== this._inputValue) {
            this._inputValue = nextProps.query.term;
        }
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this._handleWindowKeyDown);
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

    _handleWindowKeyDown(e) {
        // Skip if not `focusOnKeyDown` is not enabled or if something else is already focused
        if (this.props.focusOnKeyDown && !e.target.matches('input,textarea,select')) {
            this._inputEl.focus();
        }
    }
}

SearchBox.propTypes = {
    dispatch: PropTypes.func.isRequired,
    query: PropTypes.object.isRequired,
    initiallyEmpty: PropTypes.bool,
    focusOnKeyDown: PropTypes.bool,
};

SearchBox.defaultProps = {
    initiallyEmpty: false,
    focusOnKeyDown: false,
};

export default connect((state, ownProps) => ({
    query: state.search.query,
    initiallyEmpty: ownProps.initiallyEmpty,
}))(SearchBox);
