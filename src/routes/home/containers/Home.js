import './Home.css';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Header from 'shared/containers/header/Header';
import SearchBox from 'shared/containers/search-box/SearchBox';
import { markAsLoading, unmarkAsLoading } from 'shared/state/app/actions';

class Home extends Component {
    componentWillMount() {
        this.props.dispatch(markAsLoading());
        setTimeout(() => this.props.dispatch(unmarkAsLoading()), 10);
    }

    render() {
        return (
            <div className="page page-home">
                <Header appearance="menu-only" />

                <div className="upper-half">
                    <div className="upper-half-centered">
                        <div className="logo">npms</div>
                        <div className="moto">A better and <strong>open source search</strong> for node modules</div>

                        <SearchBox />
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
