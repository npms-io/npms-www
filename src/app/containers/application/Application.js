import './Application.css';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import LoadingBar from '../../components/loading-bar/LoadingBar';
import { canSmoothScroll } from './util/smoothScroll';

let Menu;  // Menu component will be lazy loaded here

class Application extends Component {
    componentDidMount() {
        // Lazy load the Menu because it's too heavy due to snapsvg
        require.ensure([], (require) => {
            Menu = require('../menu/Menu').default;
            this.forceUpdate();
        }, 'menu');
    }

    render() {
        return (
            <div id="application">
                <div id="loading-bar">
                    <LoadingBar running={ this.props.isLoading } />
                </div>

                <div id="menu">
                    { Menu ? <Menu /> : '' }
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
