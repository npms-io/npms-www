import './FullModuleScore.css';
import React, { Component, PropTypes } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import Tooltip from 'shared/components/tooltip/Tooltip';
import { getColor, getText } from './util/transformer';
import ModuleScore from './ModuleScore';

class FullModuleScore extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return shallowCompare(this, nextProps, nextState);
    }

    render() {
        return (
            <div className="full-module-score-component">
                { this._renderDetailScore('Quality', this.props.score.detail.quality) }
                { this._renderDetailScore('Popularity', this.props.score.detail.popularity) }
                { this._renderDetailScore('Maintenance', this.props.score.detail.maintenance) }
                <ModuleScore { ...this.props } />
            </div>
        );
    }

    // ---------------------------------------------------------

    _renderDetailScore(title, score) {
        return (
            <Tooltip
                overlayClassName="full-module-score-tooltip-component"
                placement="top"
                destroyTooltipOnHide
                getTooltipContainer={ () => document.body }
                overlay={ title }>
                <span className="detail-score" style={ { color: getColor(score) } }>
                    { getText(score) }
                </span>
            </Tooltip>
        );
    }

}

FullModuleScore.propTypes = {
    score: PropTypes.object.isRequired,
};

export default FullModuleScore;
