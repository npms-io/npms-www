import './Search.css';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { runQuery } from 'shared/state/search/actions';
import Header from 'shared/components/header/Header';
import List from '../components/List';

class Search extends Component {
    componentWillMount() {
        this.props.dispatch(runQuery(this.props.location.query));
    }

    render() {
        return (
            <div className="page page-search">
                <Header query={ this.props.search.query } />

                { this.props.search.results ?
                    <List results={ this.props.search.results } /> :
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
