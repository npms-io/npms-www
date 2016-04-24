import './Privacy.css';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { markAsLoading, unmarkAsLoading } from 'shared/state/app/actions';

class Privacy extends Component {
    componentWillMount() {
        this.props.dispatch(markAsLoading());
        setTimeout(() => this.props.dispatch(unmarkAsLoading()), 300);
    }

    render() {
        return (
            <div className="page page-privacy">
                This will be the privacy page.
            </div>
        );
    }
}

Privacy.propTypes = {
    dispatch: PropTypes.func.isRequired,
};


export default connect()(Privacy);
