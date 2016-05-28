import './About.css';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Header from 'shared/containers/header/Header';
import { markAsLoading, unmarkAsLoading } from 'shared/state/app/actions';

class About extends Component {
    componentWillMount() {
        this.props.dispatch(markAsLoading());
        setTimeout(() => this.props.dispatch(unmarkAsLoading()), 10);
    }

    render() {
        return (
            <div className="page page-about">
                <Header appearance="menu-only" />

                This will be the about page.
            </div>
        );
    }
}

About.propTypes = {
    dispatch: PropTypes.func.isRequired,
};


export default connect()(About);
