import './ScoreBage.css';
import React, { Component, PropTypes } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import warna from 'warna';

const gradient = new warna.Gradient('#ce3833', '#5b9e4d');

class ScoreBadge extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return shallowCompare(this, nextProps, nextState);
    }

    render() {
        const style = { backgroundColor: gradient.getPosition(this.props.score).hex };

        return (
            <div className="score-badge-component" style={ style }>
            { Math.round(this.props.score * 100) }
            </div>
        );
    }
}

ScoreBadge.propTypes = {
    score: PropTypes.number.isRequired,
};

export default ScoreBadge;
