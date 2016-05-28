import './Application.css';
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import LoadingBar from '../../components/loading-bar/LoadingBar';
import Animation from 'rc-animate';
import Menu from '../menu/Menu';

class Application extends Component {
    componentWillUpdate(prevProps) {
        prevProps.location.pathname !== this.props.location.pathname && this._toggleAnimationClass(true);
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
                    <Animation component="div" transitionName="page-transition"
                        ref={ (ref) => { this._animationComponent = ref; } }
                        onEnter={ () => this._toggleAnimationClass(false) }>
                      { React.cloneElement(this.props.children, { key: this.props.location.pathname }) }
                    </Animation>
                </div>
            </div>
        );
    }

    _toggleAnimationClass(active) {
        ReactDOM.findDOMNode(this._animationComponent).classList.toggle('page-transition', active);
    }
}

Application.propTypes = {
    children: PropTypes.element.isRequired,
    location: PropTypes.object.isRequired,
    loadingCount: PropTypes.number.isRequired,
};

export default connect((state) => ({
    loadingCount: state.app.loadingCount,
}))(Application);
