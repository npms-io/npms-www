import './ResultsListItem.css';
import React, { Component, PropTypes } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import { Link } from 'react-router';
import ago from 's-ago';
import uniq from 'lodash/uniq';
import Gravatar from 'react-gravatar';
import PackageScore from 'shared/components/package-score/PackageScore';
import PackageFlags from 'shared/components/package-flags/PackageFlags';
import Tooltip from 'shared/components/tooltip/Tooltip';
import MaterialIcon from 'shared/components/icon/MaterialIcon';
import SvgIcon from 'shared/components/icon/SvgIcon';

class ResultsListItem extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return shallowCompare(this, nextProps, nextState);
    }

    render() {
        return (
            <li className="results-list-item">
                { /* Headline */ }
                <div className="headline">
                    <a href={ this.props.package.links.repository || this.props.package.links.npm } target="_blank"
                        className="name ellipsis">{ this.props.package.name }</a>
                    <span className="version ellipsis">({ this.props.package.version })</span>

                    <PackageScore score={ this.props.score } />
                </div>

                { /* Flags */ }
                { this.props.flags ? <PackageFlags package={ this.props.package } flags={ this.props.flags } /> : '' }

                { /* Description */ }
                { this.props.package.description ?
                    <div className="description ellipsis">{ this.props.package.description }</div> :
                    '' }

                { /* Keywords */ }
                { this._renderKeywords() }

                { /* Updated by.. */ }
                { this._renderPublisherInfo() }

                { /* Useful links */ }
                { this._renderLinks() }

            </li>
        );
    }

    _renderKeywords() {
        const keywords = uniq(this.props.package.keywords);  // Remove duplicates because we use keywords as React keys
        const keywordsCount = keywords && keywords.length;

        if (!keywordsCount) {
            return '';
        }

        return (
            <div className="keywords ellipsis">
                <MaterialIcon id="local_offer" />
                { keywords.map((keyword, index) =>
                    <span className="keyword" key={ keyword }>
                        <Link to={ `/search?q=${encodeURIComponent(keyword)}` }>{ keyword }</Link>
                        { index < keywordsCount - 1 ? ', ' : '' }
                    </span>
                ) }
            </div>
        );
    }

    _renderPublisherInfo() {
        const hasPublisher = !!(this.props.package.publisher && this.props.package.publisher.username);
        const hasDate = !!(this.props.package.date);

        if (!hasPublisher && !hasDate) {
            return '';
        }

        return (
            <div className="publish-info">
                <span>updated </span>
                { hasDate ? <span className="date">{ ago(new Date(this.props.package.date)) }</span> : '' }

                { hasPublisher ? <span> by </span> : '' }
                { hasPublisher ? <a href={ `https://npmjs.com/~${encodeURIComponent(this.props.package.publisher.username)}` }
                    target="_blank" className="publisher-name">{ this.props.package.publisher.username }</a> : '' }
                { hasPublisher ? <span className="publisher-avatar">
                    <Gravatar size={ 20 } email={ this.props.package.publisher.email || 'n/a' } https
                        onLoad={ (e) => this._onGravatarLoad(e) } /></span> : '' }
            </div>
        );
    }

    _renderLinks() {
        return (
            <div className="links">
                <Tooltip placement="top" trigger={ ['hover'] } destroyTooltipOnHide overlay="View this package analysis">
                    <a className="analysis-link" href={ `${this.props.apiUrl}/package/${encodeURIComponent(this.props.package.name)}` }
                        target="_blank">
                        <MaterialIcon id="timeline" />
                    </a>
                </Tooltip>

                <Tooltip placement="top" trigger={ ['hover'] } destroyTooltipOnHide overlay="Try this package in RunKit">
                    <a className="runkit-link" href={ `https://runkit.com/npm/${encodeURIComponent(this.props.package.name)}` }
                        target="_blank">
                        <SvgIcon id={ SvgIcon.runkit } />
                    </a>
                </Tooltip>

                <Tooltip placement="top" trigger={ ['hover'] } destroyTooltipOnHide overlay="View this package in npmjs.org">
                    <a className="npm-link" href={ this.props.package.links.npm } target="_blank" title="View this package in npmjs.org">
                        <SvgIcon id={ SvgIcon.npm } />
                    </a>
                </Tooltip>
            </div>
        );
    }

    _onGravatarLoad(e) {
        e.target.style.opacity = '1';
    }
}

ResultsListItem.propTypes = {
    package: PropTypes.object.isRequired,
    flags: PropTypes.object,
    score: PropTypes.object.isRequired,
    apiUrl: PropTypes.string,
};

ResultsListItem.defaultProps = {
    apiUrl: 'https://api.npms.io',
};

export default ResultsListItem;
