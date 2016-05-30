import './About.css';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Header from 'shared/containers/header/Header';

class About extends Component {
    render() {
        return (
            <div className="page page-about">
                <Header />

                This will be the about page.
            </div>
        );
    }
}

About.propTypes = {
    dispatch: PropTypes.func.isRequired,
};


export default connect()(About);
