import './SvgIcon.css';
import React, { Component, PropTypes } from 'react';

class SvgIcon extends Component {
    shouldComponentUpdate() {
        return false;
    }

    render() {
        return (
            <svg
                className={ `svg-icon ${this.props.className || ''}` }
                onClick={ () => this.props.onClick && this.props.onClick() }>
                <use xlinkHref={ this.props.id }></use>
            </svg>
        );
    }
}

SvgIcon.propTypes = {
    id: PropTypes.string.isRequired,
    className: PropTypes.string,
    onClick: PropTypes.func,
};

Object.assign(SvgIcon, {
    github: require('./svgs/github.svg'),
    twitter: require('./svgs/twitter.svg'),
    npm: require('./svgs/npm.svg'),
});

export default SvgIcon;
