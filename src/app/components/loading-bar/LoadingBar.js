/* eslint react/no-set-state:0 */

import './LoadingBar.css';
import React, { Component, PropTypes } from 'react';
import shallowCompare from 'react-addons-shallow-compare';

const autoUpdateInterval = 250;
const firstPercentage = 0.55;

export default class LoadingBar extends Component {
    constructor(props) {
        super(props);
        this.state = { percentage: 0 };
    }

    componentDidMount() {
        this._update();
    }

    shouldComponentUpdate(nextProps, nextState) {
        return shallowCompare(this, nextProps, nextState);
    }

    componentDidUpdate() {
        this._update();
    }

    componentWillUnmount() {
        if (this._interval) {
            clearInterval(this._interval);
            this._interval = null;
        }
    }

    render() {
        const hasFinished = this.state.percentage === 1;
        const className = `loading-bar-component ${hasFinished ? 'is-finished' : ''} ${this.state.instant ? 'disable-transition' : ''}`;
        const style = {
            transform: `scaleX(${this.state.percentage})`,
            opacity: this.state.percentage === 1 ? '0' : '1',
        };

        return (
            <div className={ className } style={ style }></div>
        );
    }

    // ------------------------------------------------------

    _update() {
        if (this.props.running) {
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
            setTimeout(() => this.props.running && this.setState({ percentage: firstPercentage, instant: false }), 0);
        });
    }

    _finish() {
        if (!this._interval) {
            return;
        }

        this.setState({ percentage: 1, instant: false });

        clearInterval(this._interval);
        this._interval = null;
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
