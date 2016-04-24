import './SearchBox.css';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import shallowCompare from 'react-addons-shallow-compare';
import { updateQuery, run } from 'shared/state/search/actions';

class SearchBox extends Component {
    componentDidMount() {
        this._input.focus();
    }

    shouldComponentUpdate(nextProps, nextState) {
        return shallowCompare(this, nextProps, nextState);
    }

    render() {
        return (
            <form className="search-box-component" onSubmit={ (e) => this._handleSubmit(e) }>
                <div className="search-input">
                    <input type="text" placeholder="Search modules"
                        value={ this.props.query ? this.props.query.term : '' }
                        ref={ (el) => { this._input = el; } }
                        onChange={ () => this._handleInputChange() } />
                    <button><i className="material-icons">search</i></button>
                </div>
            </form>
        );
    }

    // ---------------------------------------------

    _handleInputChange() {
        const query = { term: this._input.value };

        this.props.dispatch(updateQuery(query));
    }

    _handleSubmit(e) {
        e.preventDefault();
        this.props.dispatch(run());
    }
}

SearchBox.propTypes = {
    dispatch: PropTypes.func.isRequired,
    query: PropTypes.object,
};

export default connect((state) => {
    return { query: state.search.query };
})(SearchBox);
