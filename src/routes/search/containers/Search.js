import './Search.css';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import isEqual from 'lodash/isEqual';
import Header from 'shared/containers/header/Header';
import ResultsList from '../components/ResultsList';
import ScrollToTop from 'shared/components/scroll-to-top/ScrollToTop';
import { run, updateQuery, scroll, reset } from 'shared/state/search/actions';

class Search extends Component {
    componentWillMount() {
        if (this.props.location.query.term) {
            this.props.dispatch(updateQuery(this.props.location.query));
            this.props.dispatch(run());
        }
    }

    componentWillReceiveProps(nextProps) {
        if (!isEqual(this.props.location.query, nextProps.location.query)) {
            this.props.dispatch(updateQuery(nextProps.location.query));
            this.props.dispatch(run());
        }
    }

    componentWillUnmount() {
        this.props.dispatch(reset());
    }

    render() {
        // TODO: errors

        return (
            <div className="page page-search">
                <Header showSearch />

                <div className="scroll-to-top header-component-align-with-search-box-floated">
                    <ScrollToTop showUnder={ 200 }/>
                </div>

                <ResultsList
                    results={ this.props.search.results }
                    onLoadMore={ () => this.props.dispatch(scroll()) } />
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
