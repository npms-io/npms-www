import './Terms.css';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Header from 'shared/containers/header/Header';
import { markAsLoading, unmarkAsLoading } from 'shared/state/app/actions';

class Terms extends Component {
    componentWillMount() {
        this.props.dispatch(markAsLoading());
        setTimeout(() => this.props.dispatch(unmarkAsLoading()), 300);
    }

    render() {
        return (
            <div className="page page-terms">
                <Header appearance="menu-only" />

                This will be the terms page.
            </div>
        );
    }
}

Terms.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

export default connect()(Terms);
