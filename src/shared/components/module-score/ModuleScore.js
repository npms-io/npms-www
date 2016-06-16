import './ModuleScore.css';
import React, { Component, PropTypes } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import scoreBadgeSvg from './svgs/score-badge.svg';
import { getColor, getText } from './util/transformer';

class ModuleScore extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return shallowCompare(this, nextProps, nextState);
    }

    render() {
        return (
            <div className="module-score-component">
                <svg className="score-badge" style={ { fill: getColor(this.props.score.final) } }>
                    <use xlinkHref={ scoreBadgeSvg }></use>
                </svg>
                <div className="score-value">{ getText(this.props.score.final) }</div>
            </div>
        );
    }
}

ModuleScore.propTypes = {
    score: PropTypes.object.isRequired,
};

export default ModuleScore;
