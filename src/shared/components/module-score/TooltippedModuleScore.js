import './ModuleScore.css';
import React, { Component, PropTypes } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import Tooltip from 'shared/components/tooltip/Tooltip';
import { getColor, getText } from './util/transformer';
import ModuleScore from './ModuleScore';

class TooltippedModuleScore extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return shallowCompare(this, nextProps, nextState);
    }

    render() {
        return (
            <Tooltip
                overlayClassName="module-score-tooltip-component"
                placement="right"
                destroyTooltipOnHide
                getTooltipContainer={ () => document.body }
                overlay={ this._renderTooltip() }>
                <ModuleScore { ...this.props } />
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
                <span className="score-value" style={ { color: getColor(score) } }>
                { getText(score) }
                </span>
            </div>
        );
    }
}

TooltippedModuleScore.propTypes = {
    score: PropTypes.object.isRequired,
};

export default TooltippedModuleScore;
