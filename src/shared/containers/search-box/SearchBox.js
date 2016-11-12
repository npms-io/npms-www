import './SearchBox.css';
import React, { Component, PropTypes } from 'react';
import Autosuggest from 'react-autosuggest';
import { connect } from 'react-redux';
import MaterialIcon from 'shared/components/icon/MaterialIcon';
import { updateQuery, navigate } from 'shared/state/search/main/actions';
import { fetch as fetchSuggestions, reset as resetSuggestions } from 'shared/state/search/suggestions/actions';
import SearchBoxHelp from './SearchBoxHelp';
import SearchBoxSettings from './SearchBoxSettings';

const placeholderSuggestions = [
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
        this._placeholder = `Search packages, like "${placeholderSuggestions[Math.floor(Math.random() * placeholderSuggestions.length)]}"`;
        this._inputValue = this.props.initiallyEmpty ? '' : this.props.q;
    }

    componentDidMount() {
        window.addEventListener('keydown', this._handleWindowKeyDown);

        // Focus on desktop devices automatically
        // The non-mobile device detecting below is pretty naive but works for most cases
        // Adding a 20kb library to detect mobile devices is just not worth it
        if (this.props.initiallyFocused && !('onorientationchange' in window)) {
            this._inputEl.focus();
        }
    }

    componentWillUpdate(nextProps) {
        if (nextProps.q !== this._inputValue) {
            this._inputValue = nextProps.q;
        }
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this._handleWindowKeyDown);
    }

    render() {
        return (
            <form className="search-box-component" onSubmit={ (e) => this._handleSubmit(e) }>
                <div className="search-input">
                    <Autosuggest
                        id="search-box-autosuggest"
                        suggestions={ this.props.suggestions || [] }
                        getSuggestionValue={ (suggestion) => suggestion.package.name }
                        renderSuggestion={ (suggestion) => this._renderSuggestion(suggestion) }
                        ref={ (ref) => { this._inputEl = ref && ref.input; } }
                        onSuggestionsFetchRequested={ (request) => this._handleSuggestionsFetchRequested(request) }
                        onSuggestionsClearRequested={ () => this._handleSuggestionsClearRequested() }
                        onSuggestionSelected={ (e, selected) => this._handleSuggestionSelected(e, selected) }
                        focusInputOnSuggestionClick={ false }
                        inputProps={ {
                            value: this._inputValue,
                            placeholder: this._placeholder,
                            onChange: (e, { newValue }) => this._handleInputChange(newValue),
                            autoCapitalize: 'none',
                            autoCorrect: 'off',
                        } }
                        theme={ {
                            container: 'autosuggest-component-container',
                            containerOpen: 'is-open',
                            input: 'autosuggest-component-input',
                            suggestionsContainer: 'autosuggest-component-suggestions-container',
                            suggestionsList: 'autosuggest-component-suggestions-list',
                            suggestion: 'autosuggest-component-suggestion',
                            suggestionFocused: 'is-focused',
                            sectionContainer: 'autosuggest-component-section-container',
                            sectionTitle: 'autosuggest-component-section-title',
                            sectionSuggestionsContainer: 'autosuggest-component-section-suggestions-container',
                        } } />

                    <SearchBoxHelp />
                    <SearchBoxSettings />

                    <button ref={ (ref) => { this._buttonEl = ref; } }>
                        <MaterialIcon id="search" />
                    </button>
                </div>
            </form>
        );
    }

    // ---------------------------------------------

    _renderSuggestion(suggestion) {
        return (
            <div className="suggestion">
                { suggestion.highlight
                    ? <div className="suggestion-name ellipsis" dangerouslySetInnerHTML={ { __html: suggestion.highlight } } />
                    : <div className="suggestion-name ellipsis">{ suggestion.package.name }</div>
                }
                <div className="suggestion-description ellipsis">{ suggestion.package.description }</div>
            </div>
        );
    }

    _handleInputChange(newValue) {
        this.props.dispatch(updateQuery(newValue));
    }

    _handleSubmit(e) {
        e.preventDefault();
        this._inputEl.blur();  // Ensure keyboard is hidden in mobile
        this.props.dispatch(navigate());
    }

    _handleWindowKeyDown(e) {
        // Skip if `focusOnKeyDown` is not enabled or if something else is already focused
        // Also ctrl & meta keys are ignored to allow copying to clipboard
        if (this.props.focusOnKeyDown && !e.ctrlKey && !e.metaKey && !e.target.matches('input,textarea,select')) {
            this._inputEl.focus();
        }
    }

    _handleSuggestionsFetchRequested(request) {
        // TODO: Should we throttle this?
        this.props.dispatch(fetchSuggestions(request.value));
    }

    _handleSuggestionsClearRequested() {
        this.props.dispatch(resetSuggestions());
    }

    _handleSuggestionSelected(e, selected) {
        this.props.dispatch(updateQuery(selected.suggestionValue));
        this._buttonEl.click();  // Submit the form (calling submit() was not working with react)
    }
}

SearchBox.propTypes = {
    dispatch: PropTypes.func.isRequired,
    q: PropTypes.string.isRequired,
    suggestions: PropTypes.array,

    initiallyEmpty: PropTypes.bool,
    initiallyFocused: PropTypes.bool,
    focusOnKeyDown: PropTypes.bool,
};

SearchBox.defaultProps = {
    initiallyEmpty: false,
    initiallyFocused: false,
    focusOnKeyDown: false,
};

export default connect((state, ownProps) => ({
    ...ownProps,
    q: state.search.main.params.q,
    suggestions: state.search.suggestions.results,
}))(SearchBox);
