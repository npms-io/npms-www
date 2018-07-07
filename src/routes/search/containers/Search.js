import './Search.css';
import config from 'config';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import isEqual from 'lodash/isEqual';
import Header from 'shared/containers/header/Header';
import ResultsList from '../components/ResultsList';
import ScrollToTop from 'shared/components/scroll-to-top/ScrollToTop';
import { run, updateParams, scroll, reset, moveResultsFocus } from 'shared/state/search/actions';

import keymap from './moveResultsFocus.keymap.json';
import { ShortcutManager, Shortcuts } from 'react-shortcuts';
const shortcutManager = new ShortcutManager(keymap);

class Search extends Component {
    constructor() {
        super();
        this._handleShortcuts = this._handleShortcuts.bind(this);
    }

    getChildContext() {
        return { shortcuts: shortcutManager };
    }

    componentWillMount() {
        this.props.dispatch(updateParams({ q: '', ...this.props.location.query }));
        this.props.dispatch(run());
    }

    componentWillReceiveProps(nextProps) {
        if (!isEqual(this.props.location.query, nextProps.location.query)) {
            this.props.dispatch(updateParams({ q: '', ...nextProps.location.query }));
            this.props.dispatch(run());
        }
    }

    componentWillUnmount() {
        this.props.dispatch(reset());
    }

    render() {
        return (
            <div className="page page-search">
                <Header showSearch />

                <div className="scroll-to-top header-component-with-logo-align-with-search-box-floated">
                    <ScrollToTop showUnder={ 200 } />
                </div>

                <Shortcuts
                    global
                    targetNodeSelector="body"
                    name="Search"
                    // eslint-disable-next-line react/jsx-handler-names
                    handler={ this._handleShortcuts } >
                    <ResultsList
                        results={ this.props.search.results }
                        error={ this.props.search.error }
                        onLoadMore={ () => this.props.dispatch(scroll()) }
                        apiUrl={ config.api.url } />
                </Shortcuts>
            </div>
        );
    }

    _handleShortcuts(action) {
        switch (action) {
        case 'MOVE_UP':
            this.props.dispatch(moveResultsFocus(this.props.search.focusedResultsItem - 1));
            break;
        case 'MOVE_DOWN':
            this.props.dispatch(moveResultsFocus(this.props.search.focusedResultsItem + 1));
            break;
        case 'ENTER':
            console.log('enter!');
            break;
        default:
            break;
        }
    }
}

Search.childContextTypes = {
    shortcuts: PropTypes.object.isRequired,
};

Search.propTypes = {
    dispatch: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    search: PropTypes.object.isRequired,
};

export default connect((state) => ({
    search: state.search,
}))(Search);
