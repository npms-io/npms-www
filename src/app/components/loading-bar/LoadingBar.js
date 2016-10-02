/* eslint react/no-set-state:0 */

import './LoadingBar.css';
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import shallowCompare from 'react-addons-shallow-compare';

const autoUpdateInterval = 250;
const firstPercentage = 0.55;

class LoadingBar extends Component {
    constructor(props) {
        super(props);
        this.state = { percentage: 0 };
    }

    componentWillMount() {
        this._update(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this._update(nextProps);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return shallowCompare(this, nextProps, nextState);
    }

    componentWillUnmount() {
        if (this._interval) {
            clearInterval(this._interval);
            this._interval = null;
        }
    }

    render() {
        const style = {
            transform: `scaleX(${this.state.percentage})`,
            opacity: this.state.percentage === 1 ? '0' : '1',
        };

        return (
            <div className={ `loading-bar-component ${this.state.instant ? 'disable-transition' : ''}` } style={ style } />
        );
    }

    // ------------------------------------------------------

    _update(props) {
        if (props.running) {
            this._start();
        } else {
            this._finish();
        }
    }

    _start() {
        if (this._interval) {
            return;
        }

        this._interval = setInterval(() => this._autoIncrement(), autoUpdateInterval);

        this.setState({ percentage: 0, instant: true }, () => {
            if (!this.props.running) {
                return;
            }

            // Reflow, so that the disable-transition has been applied
            ReactDOM.findDOMNode(this).offsetHeight;  // eslint-disable-line no-unused-expressions
            this.setState({ percentage: firstPercentage, instant: false });
        });
    }

    _finish() {
        if (!this._interval) {
            return;
        }

        clearInterval(this._interval);
        this._interval = null;

        this.setState({ percentage: 1, instant: false });
    }

    _autoIncrement() {
        let percentage = this.state.percentage + Math.min(0.8, (1 - this.state.percentage) / 10);

        if (percentage > 0.95) {
            percentage = 0.95;
            clearInterval(this._interval);
        }

        this.setState({ percentage, instant: false });
    }
}

LoadingBar.propTypes = {
    running: PropTypes.bool.isRequired,
};

export default LoadingBar;
