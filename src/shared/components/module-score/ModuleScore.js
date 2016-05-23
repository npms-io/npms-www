import './ModuleScore.css';
import React, { Component, PropTypes } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import ColourMeLife from 'colour-me-life';
import Tooltip from 'shared/components/tooltip/Tooltip';
import scoreBadgeSvg from './svgs/score-badge.svg';

const gradient = new ColourMeLife()
    .setSpectrum('#6e4b46', '#9e6b64', '#1ac391')
    .setNumberRange(0, 1);

class ModuleScore extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return shallowCompare(this, nextProps, nextState);
    }

    render() {
        return (
            <Tooltip
                overlayClassName="module-score-tooltip-component"
                placement="top"
                destroyTooltipOnHide
                getTooltipContainer={ () => document.body }
                overlay={ this._renderTooltip() }>
                <div className="module-score-component">
                    <svg className="score-badge" style={ { fill: this._getScoreColor(this.props.score.final) } }>
                        <use xlinkHref={ scoreBadgeSvg }></use>
                    </svg>
                    <div className="score-value">{ this._getScoreText(this.props.score.final) }</div>
                </div>
            </Tooltip>

        );
    }

    // ---------------------------------------------------------

    _renderTooltip() {
        return (
            <ul>
                <li>{ this._renderTooltipScore('Quality', this.props.score.detail.quality) }</li>
                <li>{ this._renderTooltipScore('Popularity', this.props.score.detail.popularity) }</li>
                <li>{ this._renderTooltipScore('Maintenance', this.props.score.detail.maintenance) }</li>
            </ul>
        );
    }

    _renderTooltipScore(label, score) {
        return (
            <div>
                <span className="score-label">{ label }:</span>
                <span className="score-value" style={ { color: this._getScoreColor(score) } }>
                { this._getScoreText(score) }
                </span>
            </div>
        );
    }

    _getScoreText(score) {
        return Math.round(score * 100);
    }

    _getScoreColor(score) {
        return `#${gradient.colourAt(score)}`;
    }
}

ModuleScore.propTypes = {
    score: PropTypes.object.isRequired,
};

export default ModuleScore;
