import './Search.css';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { run, updateQuery, scroll } from 'shared/state/search/actions';
import Header from 'shared/components/header/Header';
import ResultsList from '../components/ResultsList';

class Search extends Component {
    componentWillMount() {
        this.props.dispatch(updateQuery(this.props.location.query));
        this.props.dispatch(run());
    }

    render() {
        return (
            <div className="page page-search">
                <Header query={ this.props.search.query } />

                { this.props.search.results ?
                    <ResultsList
                        results={ this.props.search.results }
                        onLoadMore={ () => this.props.dispatch(scroll()) } /> :
                    '' }
            </div>
        );
    }
}

Search.propTypes = {
    dispatch: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    search: PropTypes.object.isRequired,
};

export default connect((state) => {
    return { search: state.search };
})(Search);
