import './Menu.css';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { closeMenu } from 'shared/state/app/actions';
import shallowCompare from 'react-addons-shallow-compare';

class Menu extends Component {
    constructor(props) {
        super(props);
        this._handleOutsideClick = this._handleOutsideClick.bind(this);
    }

    componentDidMount() {
        document.body.addEventListener('click', this._handleOutsideClick);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return shallowCompare(this, nextProps, nextState);
    }

    componentWillUnmount() {
        document.body.removeEventListener('click', this._handleOutsideClick);
    }

    render() {
        return (
            <div
                className={ `menu-component ${this.props.isOpen ? 'is-open' : ''}` }
                ref={ (el) => { this._element = el; } }>
            </div>
        );
    }

    _handleOutsideClick(e) {
        !this._element.contains(e.target) && this.props.dispatch(closeMenu());
    }
}

Menu.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
};

export default connect((state) => ({
    isOpen: state.app.isMenuOpen,
}))(Menu);
