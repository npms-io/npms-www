import './SvgIcon.css';
import React, { Component, PropTypes } from 'react';

class SvgIcon extends Component {
    shouldComponentUpdate() {
        return false;
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
    tonic: require('./svgs/tonic.svg'),
});

export default SvgIcon;
