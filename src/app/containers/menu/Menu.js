import './Menu.css';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { closeMenu } from 'shared/state/app/actions';
import shallowCompare from 'react-addons-shallow-compare';

class Menu extends Component {
    constructor(props) {
        super(props);
        this._handleOutsideClickOrTap = this._handleOutsideClickOrTap.bind(this);
    }

    componentDidMount() {
        document.body.addEventListener('click', this._handleOutsideClickOrTap);
        document.body.addEventListener('touchend', this._handleOutsideClickOrTap);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return shallowCompare(this, nextProps, nextState);
    }

    componentWillUnmount() {
        document.body.removeEventListener('click', this._handleOutsideClickOrTap);
        document.body.removeEventListener('touchend', this._handleOutsideClickOrTap);
    }

    render() {
        return (
            <div
                className={ `menu-component ${this.props.isOpen ? 'is-open' : ''}` }
                ref={ (ref) => { this._el = ref; } }>
            </div>
        );
    }

    _handleOutsideClickOrTap(e) {
        if (this.props.isOpen && !this._el.contains(e.target)) {
            this.props.dispatch(closeMenu());
        }
    }
}

Menu.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
};

export default connect((state) => ({
    isOpen: state.app.isMenuOpen,
}))(Menu);
