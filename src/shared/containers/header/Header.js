import './Header.css';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import shallowCompare from 'react-addons-shallow-compare';
import SearchBox from 'shared/containers/search-box/SearchBox';
import MaterialIcon from 'shared/components/icon/MaterialIcon';
import SvgIcon from 'shared/components/icon/SvgIcon';
import { toggleMenu } from 'shared/state/app/actions';

class Header extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return shallowCompare(this, nextProps, nextState);
    }

    render() {
        return (
            <div className={ `header-component header-component-appearance-${this.props.appearance}` }>
                <div className="logo">
                    <Link to={ '/' }>npms</Link>
                </div>

                <div className="search-box">
                    <SearchBox />
                </div>

                <div className="other-actions">
                    <a className="social-link" href="https://twitter.com/npms_io" target="_blank">
                        <SvgIcon id={ SvgIcon.twitter } />
                    </a>
                    <a className="social-link" href="https://github.com/npms-io" target="_blank">
                        <SvgIcon id={ SvgIcon.github } />
                    </a>

                    <div className="toggle-menu">
                        <MaterialIcon id="menu" onClick={ () => this._handleToggleMenuClick() } />
                    </div>
                </div>
            </div>
        );
    }

    _handleToggleMenuClick() {
        this.props.dispatch(toggleMenu());
    }
}

Header.propTypes = {
    appearance: PropTypes.string,
    dispatch: PropTypes.func.isRequired,
};

Header.defaultProps = {
    appearance: 'default',
};

export default connect()(Header);
