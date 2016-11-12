import './SvgIcon.css';
import React, { Component, PropTypes } from 'react';
import shallowCompare from 'react-addons-shallow-compare';

class SvgIcon extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return shallowCompare(this, nextProps, nextState);
    }

    render() {
        const { id, className, ...props } = this.props;

        return (
            <svg
                className={ `svg-icon ${className || ''}` }
                { ...props }>
                <use xlinkHref={ id } />
            </svg>
        );
    }
}

SvgIcon.propTypes = {
    id: PropTypes.string.isRequired,
    className: PropTypes.string,
};

Object.assign(SvgIcon, {
    github: require('./svgs/github.svg'),
    twitter: require('./svgs/twitter.svg'),
    npm: require('./svgs/npm.svg'),
    runkit: require('./svgs/runkit.svg'),
});

export default SvgIcon;
