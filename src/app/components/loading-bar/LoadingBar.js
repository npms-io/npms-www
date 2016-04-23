/* eslint react/no-set-state:0 */

import './LoadingBar.css';
import React, { Component, PropTypes } from 'react';
import shallowCompare from 'react-addons-shallow-compare';

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
        return (
            <div className={ `loading-bar-component ${this.state.instant ? 'disable-transition' : ''}` }
                ref={ (el) => { this._loadingBar = el; } }
                style={ { transform: `scaleX(${this.state.percentage})` } }></div>
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

        this._interval = setInterval(() => this._autoIncrement(), 190);

        this.setState({ percentage: 0, instant: true }, () => {
            setTimeout(() => this.setState({ percentage: 0.1, instant: false }), 0);
        });
    }

    _finish() {
        if (!this._interval) {
            return;
        }

        this.setState({ percentage: 1 });

        clearInterval(this._interval);
        this._interval = null;
    }

    _autoIncrement() {
        let percentage = this.state.percentage + Math.min(0.8, (1 - this.state.percentage) / 15);

        if (percentage > 0.8) {
            percentage = 0.8;
            clearInterval(this._interval);
        }

        this.setState({ percentage, instant: false });
    }
}

LoadingBar.propTypes = {
    running: PropTypes.bool.isRequired,
};


export default LoadingBar;
