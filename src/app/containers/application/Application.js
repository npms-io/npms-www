import './Application.css';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import LoadingBar from '../../components/loading-bar/LoadingBar';
import Menu from '../menu/Menu';
import { canSmoothScroll } from './util/smoothScroll';

class Application extends Component {
    render() {
        return (
            <div id="application">
                <div id="loading-bar">
                    <LoadingBar running={ this.props.isLoading } />
                </div>

                <div id="menu">
                    <Menu />
                </div>

                <div id="page">
                    { canSmoothScroll ?
                        <ReactCSSTransitionGroup component="div" transitionName="page-transition"
                            transitionEnterTimeout={ 250 } transitionLeaveTimeout={ 250 }>
                            { React.cloneElement(this.props.children, { key: this.props.location.pathname }) }
                        </ReactCSSTransitionGroup> :
                        this.props.children
                    }
                </div>
            </div>
        );
    }
}

Application.propTypes = {
    children: PropTypes.element.isRequired,
    location: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
};

export default connect((state) => ({
    isLoading: state.app.loadingCount > 0,
}))(Application);
