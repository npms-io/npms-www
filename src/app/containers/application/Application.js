import './Application.css';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import LoadingBar from '../../components/loading-bar/LoadingBar';

class Application extends Component {
    render() {
        return (
            <div id="application">
                <LoadingBar running={ this.props.app.loadingCount > 0 } />

                <div id="page">
                    { this.props.children }
                </div>
            </div>
        );
    }
}

Application.propTypes = {
    children: PropTypes.element.isRequired,
    location: PropTypes.object.isRequired,
    app: PropTypes.object.isRequired,
};

export default connect((state) => state)(Application);
