import './Menu.css';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link, IndexLink } from 'react-router';
import shallowCompare from 'react-addons-shallow-compare';
import { closeMenu } from 'shared/state/app/actions';
import MaterialIcon from 'shared/components/icon/MaterialIcon';
import Snap from 'snapsvg';

const svgMorthDuration = 400;
const svgMorthPaths = {
    initial: 'M-1,0h101c0,0-97.833,153.603-97.833,396.167C2.167,627.579,100,800,100,800H-1V0z',
    final: 'M-1,0h101c0,0,0-1,0,395c0,404,0,405,0,405H-1V0z',
};

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

    componentDidUpdate(prevProps) {
        if (prevProps.isOpen !== this.props.isOpen) {
            this._handleIsOpenChange();
        }
    }

    componentWillUnmount() {
        document.body.removeEventListener('click', this._handleOutsideClickOrTap);
        document.body.removeEventListener('touchend', this._handleOutsideClickOrTap);

        if (this._resetSvgMorphPathTimeout) {
            clearTimeout(this._resetSvgMorphPathTimeout);
            this._resetSvgMorphPathTimeout = null;
        }
    }

    render() {
        return (
            <div
                className={ `menu-component ${this.props.isOpen ? 'is-open' : ''}` }
                ref={ (ref) => { this._el = ref; } }>

                <MaterialIcon id="close" className="close" onClick={ () => this._handleCloseClick() } />

                <div className="svg-morph" ref={ (ref) => { this._svgMorphEl = ref; } }>
                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 100 800" preserveAspectRatio="none">
                        <path d={ svgMorthPaths.initial }/>
                    </svg>
                </div>

                <nav>
                    <div className="nav-content">
                        <div className="section">Menu</div>
                        <ul>
                            <li>
                                <IndexLink to={ '/' } activeClassName="is-active"
                                    onClick={ () => this._handlePageLinkClick() }>Home</IndexLink>
                            </li>
                            <li>
                                <Link to={ '/search' } activeClassName="is-active"
                                    onClick={ () => this._handlePageLinkClick() }>Search</Link>
                            </li>
                            <li>
                                <Link to={ '/about' } activeClassName="is-active"
                                    onClick={ () => this._handlePageLinkClick() }>About</Link>
                            </li>
                            <li>
                                <Link to={ '/privacy' } activeClassName="is-active"
                                    onClick={ () => this._handlePageLinkClick() }>Privacy</Link>
                            </li>
                            <li>
                                <Link to={ '/terms' } activeClassName="is-active"
                                    onClick={ () => this._handlePageLinkClick() }>Terms</Link>
                            </li>
                        </ul>

                        <div className="section">External</div>
                        <ul>
                            <li><a className="social-link" href="https://twitter.com/npms_io" target="_blank">Twitter</a></li>
                            <li><a className="social-link" href="https://github.com/npms-io" target="_blank">Github</a></li>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }

    _handleOutsideClickOrTap(e) {
        if (this.props.isOpen && !this._el.contains(e.target)) {
            this.props.dispatch(closeMenu());
        }
    }

    _handleCloseClick() {
        this.props.dispatch(closeMenu());
    }

    _handlePageLinkClick() {
        this.props.dispatch(closeMenu());
    }

    _handleIsOpenChange() {
        // Add global class to body
        document.body.classList.toggle('is-menu-open', this.props.isOpen);

        // Animate / reset svg morph path
        const path = new Snap(this._svgMorphEl).select('path');

        if (this._resetSvgMorphPathTimeout) {
            clearTimeout(this._resetSvgMorphPathTimeout);
            this._resetSvgMorphPathTimeout = null;
        }

        if (this.props.isOpen) {
            path.animate({ path: svgMorthPaths.final }, svgMorthDuration, window.mina.easeinout);
        } else {
            this._resetSvgMorphPathTimeout = setTimeout(() => {
                this._resetSvgMorphPathTimeout = null;
                path.attr({ path: svgMorthPaths.initial });
            }, 400);
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
