import './MaterialIcon.css';
import React, { Component, PropTypes } from 'react';
import shallowCompare from 'react-addons-shallow-compare';

class MaterialIcon extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return shallowCompare(this, nextProps, nextState);
    }

    render() {
        const { id, className, ...props } = this.props;

        return (
            <i
                className={ `material-icons ${className || ''}` }
                { ...props }>
                { id }
            </i>
        );
    }
}

MaterialIcon.propTypes = {
    id: PropTypes.string.isRequired,
    className: PropTypes.string,
};

export default MaterialIcon;
