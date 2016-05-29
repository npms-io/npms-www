import './Application.css';
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import Animation from 'rc-animate';
import LoadingBar from '../../components/loading-bar/LoadingBar';
import Menu from '../menu/Menu';
import { canSmoothScroll } from './util/smoothScroll';

class Application extends Component {
    componentWillUpdate(prevProps) {
        if (canSmoothScroll && prevProps.location.pathname !== this.props.location.pathname) {
            this._startPageTransition(true);
        }
    }

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
                        <Animation component="div" transitionName="page-transition"
                            ref={ (ref) => { this._animationComponent = ref; } }
                            onEnter={ () => this._endPageTransition() }>
                          { React.cloneElement(this.props.children, { key: this.props.location.pathname }) }
                        </Animation> :
                        this.props.children
                    }
                </div>
            </div>
        );
    }

    _startPageTransition() {
        const animationComponentEl = ReactDOM.findDOMNode(this._animationComponent);

        animationComponentEl.classList.add('page-transition');

        Array.prototype.forEach.call(animationComponentEl.childNodes, (pageEl) => {
            pageEl.classList.add('page-transition-leave');
        });
    }

    _endPageTransition() {
        ReactDOM.findDOMNode(this._animationComponent).classList.remove('page-transition');
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
