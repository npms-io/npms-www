import './ScoreBage.css';
import React, { Component, PropTypes } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import warna from 'warna';
import Tooltip from 'shared/components/tooltip/Tooltip';

const gradient = new warna.Gradient('#ce3833', '#5b9e4d');

class ScoreBadge extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return shallowCompare(this, nextProps, nextState);
    }

    render() {
        return (
            <Tooltip
                overlayClassName="score-badge-tooltip-component"
                placement="top"
                destroyTooltipOnHide
                getTooltipContainer={ () => document.body }
                overlay={ this._renderTooltip() }>
                <div className="score-badge-component"
                    style={ { backgroundColor: gradient.getPosition(this.props.score.final).hex } }>
                { this._getScoreText(this.props.score.final) }
                </div>
            </Tooltip>

        );
    }

    // ---------------------------------------------------------

    _renderTooltip() {
        return (
            <div>
                <div className="final-score">
                    { this._renderTooltipScore('Final', this.props.score.final) }
                </div>

                <ul className="detailed-score">
                    <li>{ this._renderTooltipScore('Quality', this.props.score.detail.quality) }</li>
                    <li>{ this._renderTooltipScore('Maintenance', this.props.score.detail.maintenance) }</li>
                    <li>{ this._renderTooltipScore('Popularity', this.props.score.detail.popularity) }</li>
                </ul>
            </div>
        );
    }

    _renderTooltipScore(label, score) {
        return (
            <div>
                <span className="score-label">{ label }:</span>
                <span className="score-value" style={ { color: gradient.getPosition(score).hex } }>
                { this._getScoreText(score) }
                </span>
            </div>
        );
    }

    _getScoreText(score) {
        return Math.round(score * 100);
    }
}

ScoreBadge.propTypes = {
    score: PropTypes.object.isRequired,
};

export default ScoreBadge;
