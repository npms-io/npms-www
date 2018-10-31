import './PackageScore.css';
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import shallowCompare from 'react-addons-shallow-compare';
import ColourMeLife from 'colour-me-life';
import range from 'lodash/range';
import capitalize from 'lodash/capitalize';
import CircularProgressbar from 'react-circular-progressbar';
import Tooltip from 'shared/components/tooltip/Tooltip';
import scoreBadgeSvg from './svgs/score-badge.svg';

const gradient = new ColourMeLife()
.setSpectrum('#6e4b46', '#9e6b64', '#1ac391')
.setNumberRange(0, 1);

const colors = range(101).map((index) => gradient.colourAt(index / 100));

class PackageScore extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return shallowCompare(this, nextProps, nextState);
    }

    render() {
        return (
            <div className="package-score-component clearfix">
                { this._renderDetailedScore('quality') }
                { this._renderDetailedScore('popularity') }
                { this._renderDetailedScore('maintenance') }
                { this._renderFinalScore() }
            </div>
        );
    }

    // ---------------------------------------------------------

    _renderFinalScore() {
        const tooltip = (
            <div>
                <ul>
                    <li>{ this._renderTooltipScore('Quality', this.props.score.detail.quality) }</li>
                    <li>{ this._renderTooltipScore('Popularity', this.props.score.detail.popularity) }</li>
                    <li>{ this._renderTooltipScore('Maintenance', this.props.score.detail.maintenance) }</li>
                </ul>

                <p><Link to={ '/about' } target="_blank">How are scores calculated?</Link></p>
            </div>
        );

        return (
            <Tooltip overlayClassName="package-score-tooltip-component" placement="top" overlay={ tooltip }>
                <div className="score-full">
                    <svg className="score-badge" style={ { fill: this._getScoreColor(this.props.score.final) } }>
                        <use xlinkHref={ scoreBadgeSvg } />
                    </svg>
                    <div className="score-value">{ this._getScoreText(this.props.score.final) }</div>
                </div>
            </Tooltip>
        );
    }

    _renderDetailedScore(property) {
        const tooltip = this._renderTooltipScore(capitalize(property), this.props.score.detail[property]);

        return (
            <Tooltip overlayClassName="package-score-tooltip-component" placement="top" overlay={ tooltip }>
                <div className="score-detailed">
                    <CircularProgressbar classForPercentage={ () => 'score-circular-progessbar' }
                        percentage={ this.props.score.detail[property] * 100 }
                        textForPercentage={ () => '' } />
                    <div className="score-text">{ property[0].toUpperCase() }</div>
                </div>
            </Tooltip>

        );
    }

    _renderTooltipScore(label, score) {
        return (
            <div>
                <span className="score-label">{ label }:</span>
                <span className="score-value" style={ { color: this._getScoreColor(score) } }>{ this._getScoreText(score) }%</span>
            </div>
        );
    }

    _getScoreText(score) {
        return Math.round(score * 100);
    }

    _getScoreColor(score) {
        return `#${colors[Math.round(score * 100)]}`;
    }
}

PackageScore.propTypes = {
    score: PropTypes.object.isRequired,
};

export default PackageScore;
