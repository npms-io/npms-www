import './Search.css';
import config from 'config';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import isEqual from 'lodash/isEqual';
import Header from 'shared/containers/header/Header';
import ResultsList from '../components/ResultsList';
import ScrollToTop from 'shared/components/scroll-to-top/ScrollToTop';
import { run, updateParams, scroll, reset } from 'shared/state/search/actions';

class Search extends Component {
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
                    <ScrollToTop showUnder={ 200 }/>
                </div>

                <ResultsList results={ this.props.search.results } error={ this.props.search.error }
                    onLoadMore={ () => this.props.dispatch(scroll()) } apiUrl={ config.api.url } />
            </div>
        );
    }
}

Search.propTypes = {
    dispatch: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    search: PropTypes.object.isRequired,
};

export default connect((state) => ({
    search: state.search,
}))(Search);
