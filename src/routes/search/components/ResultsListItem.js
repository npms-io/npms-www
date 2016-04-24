import './ResultsListItem.css';
import React, { Component, PropTypes } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import NpmLink from 'shared/components/npm-link/NpmLink';
import ScoreBadge from 'shared/components/score-badge/ScoreBadge';

class ListItem extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return shallowCompare(this, nextProps, nextState);
    }

    render() {
        return (
            <li className="results-list-item">
                <ScoreBadge score={ this.props.item.score.final } />
                <NpmLink className="name ellipsis" name={ this.props.item.name }>{ this.props.item.name }</NpmLink>
                <div className="description ellipsis">{ this.props.item.description }</div>
                <div className="keywords ellipsis">{ this.props.item.keywords.join(', ') }</div>
            </li>
        );
    }
}

ListItem.propTypes = {
    item: PropTypes.object.isRequired,
};

export default ListItem;
