import './MaterialIcon.css';
import React, { Component, PropTypes } from 'react';

class MaterialIcon extends Component {
    shouldComponentUpdate() {
        return false;
    }

    render() {
        const { id, onClick, className, ...props } = this.props;

        return (
            <i
                className={ `material-icons ${className || ''}` }
                onClick={ () => onClick && onClick() }
                { ...props }>
                { id }
            </i>
        );
    }
}

MaterialIcon.propTypes = {
    id: PropTypes.string.isRequired,
    className: PropTypes.string,
    onClick: PropTypes.func,
};

export default MaterialIcon;
