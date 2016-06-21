import './Menu.css';
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Link, IndexLink } from 'react-router';
import arrival from 'arrival';
import { closeMenu } from 'shared/state/app/actions';
import MaterialIcon from 'shared/components/icon/MaterialIcon';
import Snap from 'snapsvg';

const svgMorphDurations = {
    open: 400,
    closed: 300,
};
const svgMorphPaths = {
    open: 'M-1,0h101c0,0,0-1,0,395c0,404,0,405,0,405H-1V0z',
    closed: 'M-1,0h101c0,0-97.833,153.603-97.833,396.167C2.167,627.579,100,800,100,800H-1V0z',
};

class Menu extends Component {
    constructor(props) {
        super(props);

        this._handleOutsideClickOrTap = this._handleOutsideClickOrTap.bind(this);
        this._firstSvgMorphPath = this.props.isOpen ? svgMorphPaths.open : svgMorphPaths.closed;
    }

    componentDidMount() {
        this._pageEl = document.getElementById('page');
        this._menuEl = document.getElementById('menu');

        document.body.addEventListener('click', this._handleOutsideClickOrTap);
        document.body.addEventListener('touchend', this._handleOutsideClickOrTap);

        this._updateAppOnMount();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.isOpen !== this.props.isOpen) {
            this._updateAppOnOpenChange();
            this._updateSvgMorphOnOpenChange();
        }
    }

    componentWillUnmount() {
        document.body.removeEventListener('click', this._handleOutsideClickOrTap);
        document.body.removeEventListener('touchend', this._handleOutsideClickOrTap);

        document.body.classList.remove('is-menu-mounted is-menu-open');
        this._pageEl.style.transform = '';

        this._resetSvgMorphPathTimeout && clearTimeout(this._resetSvgMorphPathTimeout);
    }

    render() {
        return (
            <div
                className={ `menu-component ${this.props.isOpen ? 'is-open' : ''}` }>

                <MaterialIcon id="close" className="close" onClick={ () => this._handleCloseClick() } />

                <div className="svg-morph" ref={ (ref) => { this._svgMorphEl = ref; } }>
                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 100 800" preserveAspectRatio="none">
                        <path d={ this._firstSvgMorphPath } />
                    </svg>
                </div>

                <nav>
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
                        <li><a className="social-link" href="https://github.com/npms-io" target="_blank">GitHub</a></li>
                    </ul>
                </nav>
            </div>
        );
    }

    _updateAppOnMount() {
        // Need to set transform to 'none' so that fixed positioned inside pages work correctly
        // See: https://bugs.chromium.org/p/chromium/issues/detail?id=20574
        this._pageEl.style.transform = !this.props.isOpen ? 'none' : '';

        document.body.classList.add('is-menu-mounted');
        document.body.classList.toggle('is-menu-open', this.props.isOpen);
    }

    _updateAppOnOpenChange() {
        // Need to set transform to 'none' so that fixed positioned inside pages work correctly
        // See: https://bugs.chromium.org/p/chromium/issues/detail?id=20574
        if (!this.props.isOpen) {
            arrival(document.body, () => {
                // Need to check if we are still mounted & open because the transition takes time
                if (!this.props.isOpen && document.body.classList.contains('is-menu-mounted')) {
                    this._pageEl.style.transform = 'none';
                }
            }, '#page');
        } else {
            this._pageEl.style.transform = '';
        }

        document.body.classList.toggle('is-menu-open', this.props.isOpen);
    }

    _updateSvgMorphOnOpenChange() {
        const svgMorphPathSnap = new Snap(this._svgMorphEl).select('path');

        this._resetSvgMorphPathTimeout && clearTimeout(this._resetSvgMorphPathTimeout);

        if (this.props.isOpen) {
            this._resetSvgMorphPathTimeout = null;
            svgMorphPathSnap.animate({ path: svgMorphPaths.open }, svgMorphDurations.open, window.mina.easeinout);
        } else {
            this._resetSvgMorphPathTimeout = setTimeout(() => {
                this._resetSvgMorphPathTimeout = null;
                svgMorphPathSnap.attr({ path: svgMorphPaths.closed });
            }, svgMorphDurations.closed);
        }
    }

    _handleOutsideClickOrTap(e) {
        if (this.props.isOpen && !ReactDOM.findDOMNode(this).contains(e.target)) {
            this.props.dispatch(closeMenu());
        }
    }

    _handleCloseClick() {
        this.props.dispatch(closeMenu());
    }

    _handlePageLinkClick() {
        this.props.dispatch(closeMenu());
    }
}

Menu.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
};

export default connect((state) => ({
    isOpen: state.app.isMenuOpen,
}))(Menu);
