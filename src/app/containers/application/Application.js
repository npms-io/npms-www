import './Application.css';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import shallowCompare from 'react-addons-shallow-compare';
import LoadingBar from '../../components/loading-bar/LoadingBar';
import Menu from '../menu/Menu';

class Application extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return shallowCompare(this, nextProps, nextState);
    }

    render() {
        return (
            <div id="application">
                <div id="loading-bar">
                    <LoadingBar running={ this.props.loadingCount > 0 } />
                </div>

                <div id="menu">
                    <Menu />
                </div>

                <div id="page">
                    { this.props.children }
                </div>
            </div>
        );
    }
}

Application.propTypes = {
    children: PropTypes.element,
    loadingCount: PropTypes.number.isRequired,
};

export default connect((state) => ({
    loadingCount: state.app.loadingCount,
}))(Application);
