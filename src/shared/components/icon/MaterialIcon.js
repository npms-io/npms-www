import './MaterialIcon.css';
import React, { Component, PropTypes } from 'react';

class MaterialIcon extends Component {
    shouldComponentUpdate() {
        return false;
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
