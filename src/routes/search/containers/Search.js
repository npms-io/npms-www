import './Search.css';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import shallowCompare from 'react-addons-shallow-compare';
import isEqual from 'lodash/isEqual';
import { run, updateQuery, scroll, reset } from 'shared/state/search/actions';
import Header from 'shared/containers/header/Header';
import ResultsList from '../components/ResultsList';

class Search extends Component {
    componentWillMount() {
        this.props.dispatch(updateQuery(this.props.location.query));
        this.props.dispatch(run());
    }

    componentWillReceiveProps(nextProps) {
        if (!isEqual(this.props.location.query, nextProps.location.query)) {
            this.props.dispatch(updateQuery(nextProps.location.query));
            this.props.dispatch(run());
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return shallowCompare(this, nextProps, nextState);
    }

    componentWillUnmount() {
        this.props.dispatch(reset());
    }

    render() {
        // TODO: errors

        return (
            <div className="page page-search">
                <Header />

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
