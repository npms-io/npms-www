import './NotFound.css';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { markAsLoading, unmarkAsLoading } from 'shared/state/app/actions';

class NotFound extends Component {
    componentWillMount() {
        this.props.dispatch(markAsLoading());
        setTimeout(() => this.props.dispatch(unmarkAsLoading()), 300);
    }

    render() {
        return (
            <div className="page page-not-found">
                This will be the 404 page.
            </div>
        );
    }
}

NotFound.propTypes = {
    dispatch: PropTypes.func.isRequired,
};


export default connect()(NotFound);
