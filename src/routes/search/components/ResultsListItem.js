import './ResultsListItem.css';
import React, { Component, PropTypes } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import ago from 's-ago';
import Gravatar from 'react-gravatar';
import ModuleScore from 'shared/components/module-score/ModuleScore';

class ListItem extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return shallowCompare(this, nextProps, nextState);
    }

    render() {
        const publishedAgo = this.props.item.date ? ago(new Date(this.props.item.date)) : '';
        const publishedBy = this.props.item.publisher && this.props.item.publisher.username ?
            <span className="publisher">by{ ' ' }
                <a href={ `https://npmjs.com/~${encodeURIComponent(this.props.item.publisher.username)}` }
                    target="_blank" className="name ellipsis">
                    { this.props.item.publisher.username }
                </a>

                <span className="picture">
                    <Gravatar size={ 20 } email={ this.props.item.publisher.email || 'n/a' } https
                        onLoad={ (e) => this._onGravatarLoad(e) } />
                </span>
            </span> :
            '';

        return (
            <li className="results-list-item">
                <div className="headline">
                    <a href={ `https://npmjs.com/package/${encodeURIComponent(this.props.item.name)}` } target="_blank"
                        className="name ellipsis">{ this.props.item.name }</a>

                    <span className="version">(v{ this.props.item.version })</span>
                    <ModuleScore score={ this.props.item.score } />
                </div>

                { this.props.item.description ?
                    <div className="description ellipsis">{ this.props.item.description }</div> :
                    '' }

                { this.props.item.keywords ?
                    <div className="keywords ellipsis">
                        <i className="material-icons">local_offer</i>
                        { this.props.item.keywords.join(', ') }
                    </div> :
                    '' }

                { publishedAgo || publishedBy ?
                    <div className="publish-info">
                        published { publishedAgo } { publishedBy }
                    </div> :
                    '' }
            </li>
        );
    }

    _onGravatarLoad(e) {
        e.target.style.opacity = '1';
    }
}

ListItem.propTypes = {
    item: PropTypes.object.isRequired,
};

export default ListItem;
