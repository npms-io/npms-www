import './Home.css';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import SearchBox from 'shared/containers/search-box/SearchBox';
import Footer from 'shared/components/footer/Footer';
import { markAsLoading, unmarkAsLoading } from 'shared/state/app/actions';
import { reset } from 'shared/state/search/actions';

class Home extends Component {
    componentWillMount() {
        this.props.dispatch(reset());
        this.props.dispatch(markAsLoading());
        setTimeout(() => this.props.dispatch(unmarkAsLoading()), 300);
    }

    render() {
        return (
            <div className="page page-home">
                <div className="centered">
                    <div className="logo">
                        <div className="label">npms</div>
                    </div>

                    <SearchBox />
                </div>

                <Footer />
            </div>
        );
    }
}

Home.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

export default connect()(Home);
