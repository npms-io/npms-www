import './NotFound.css';
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Header from 'shared/containers/header/Header';

class NotFound extends Component {
    render() {
        return (
            <div className="page page-not-found">
                <Header />

                <div className="page-header">404</div>

                <div className="page-content">
                    <div className="headline">Oops, can't find what you are looking for.</div>
                    <p>The page you requested does not exist, go back to <Link to={ '/' }>home</Link>?</p>
                </div>
            </div>
        );
    }
}

NotFound.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

export default connect()(NotFound);
