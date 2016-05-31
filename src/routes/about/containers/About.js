import './About.css';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Header from 'shared/containers/header/Header';

class About extends Component {
    render() {
        return (
            <div className="page page-about">
                <Header />

                <div className="page-header">About</div>

                <div className="page-content">To be done..</div>
            </div>
        );
    }
}

About.propTypes = {
    dispatch: PropTypes.func.isRequired,
};


export default connect()(About);
