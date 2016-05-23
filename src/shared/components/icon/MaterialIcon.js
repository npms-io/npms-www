import './MaterialIcon.css';
import React, { Component, PropTypes } from 'react';

class MaterialIcon extends Component {
    shouldComponentUpdate() {
        return false;
    }

    render() {
        return (
            <i
                className={ `material-icons ${this.props.className || ''}` }
                onClick={ () => this.props.onClick && this.props.onClick() }>
                { this.props.id }
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
