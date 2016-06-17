import './Home.css';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Header from 'shared/containers/header/Header';
import SearchBox from 'shared/containers/search-box/SearchBox';

class Home extends Component {
    render() {
        return (
            <div className="page page-home">
                <Header showLogo={ false } />

                <div className="upper-half">
                    <div className="upper-half-centered">
                        <div className="logo">
                            <span>
                                npms
                                <span className="beta">beta</span>
                            </span>
                        </div>
                        <div className="moto">A better and <strong>open source search</strong> for node modules</div>

                        <SearchBox initiallyEmpty focusOnKeyDown />
                    </div>
                </div>
            </div>
        );
    }
}

Home.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

export default connect()(Home);
