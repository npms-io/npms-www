import './ResultsListItem.css';
import React, { Component, PropTypes } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import { Link } from 'react-router';
import ago from 's-ago';
import { uniq } from 'lodash';
import Gravatar from 'react-gravatar';
import ModuleScore from 'shared/components/module-score/ModuleScore';
import MaterialIcon from 'shared/components/icon/MaterialIcon';
import SvgIcon from 'shared/components/icon/SvgIcon';

class ListItem extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return shallowCompare(this, nextProps, nextState);
    }

    render() {
        const isDeprecated = !!this.props.module.deprecated;

        return (
            <li className={ `results-list-item ${isDeprecated ? 'is-deprecated' : ''}` }>
                <div className="headline">
                    <a href={ this.props.module.links.repository || this.props.module.links.npm } target="_blank"
                        className="name ellipsis">{ this.props.module.name }</a>
                    <span className="version ellipsis">({ this.props.module.version })</span>

                    { isDeprecated ? <span className="deprecated">deprecated</span> : '' }

                    <ModuleScore score={ this.props.score } />
                </div>

                { this.props.module.description ?
                    <div className="description ellipsis">{ this.props.module.description }</div> :
                    '' }

                { this._renderKeywords() }

                { this._renderPublisherInfo() }

                <div className="links">
                    <a className="tonic-link" href={ `https://tonicdev.com/npm/${encodeURIComponent(this.props.module.name)}` }
                        target="_blank" title="Try this module in Tonic">
                        <SvgIcon id={ SvgIcon.tonic } />
                    </a>
                    <a className="npm-link" href={ this.props.module.links.npm } target="_blank" title="View this module in npmjs.org">
                        <SvgIcon id={ SvgIcon.npm } />
                    </a>
                </div>

            </li>
        );
    }

    _renderKeywords() {
        const keywords = uniq(this.props.module.keywords);  // Remove duplicates because we use keywords as React keys
        const keywordsCount = keywords && keywords.length;

        if (!keywordsCount) {
            return '';
        }

        return (
            <div className="keywords ellipsis">
                <MaterialIcon id="local_offer" />
                { keywords.map((keyword, index) =>
                    <span className="keyword" key={ keyword }>
                        <Link to={ `/search?term=${encodeURIComponent(keyword)}` }>{ keyword }</Link>
                        { index < keywordsCount - 1 ? ', ' : '' }
                    </span>
                ) }
            </div>
        );
    }

    _renderPublisherInfo() {
        const hasPublisher = !!(this.props.module.publisher && this.props.module.publisher.username);
        const hasDate = !!(this.props.module.date);

        if (!hasPublisher && !hasDate) {
            return '';
        }

        return (
            <div className="publish-info">
                <span>updated </span>
                { hasDate ? <span className="date">{ ago(new Date(this.props.module.date)) }</span> : '' }

                { hasPublisher ? <span> by </span> : '' }
                { hasPublisher ? <a href={ `https://npmjs.com/~${encodeURIComponent(this.props.module.publisher.username)}` }
                    target="_blank" className="publisher-name ellipsis">{ this.props.module.publisher.username }</a> : '' }
                { hasPublisher ? <span className="publisher-avatar">
                    <Gravatar size={ 20 } email={ this.props.module.publisher.email || 'n/a' } https
                        onLoad={ (e) => this._onGravatarLoad(e) } /></span> : '' }
            </div>
        );
    }

    _onGravatarLoad(e) {
        e.target.style.opacity = '1';
    }
}

ListItem.propTypes = {
    module: PropTypes.object.isRequired,
    score: PropTypes.object.isRequired,
};

export default ListItem;
