import './Header.css';
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import shallowCompare from 'react-addons-shallow-compare';
import SearchBox from '../../containers/search-box/SearchBox';

class Header extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return shallowCompare(this, nextProps, nextState);
    }

    render() {
        return (
            <div className="header-component">
                <Link to={ '/' } className="logo" />
                <div className="search-box">
                    <SearchBox />
                </div>
            </div>
        );
    }
}

Header.propTypes = {
    query: PropTypes.object,
};

export default Header;
