import './SearchBoxHelp.css';
import React, { Component } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import MaterialIcon from 'shared/components/icon/MaterialIcon';
import Tooltip from 'shared/components/tooltip/Tooltip';

export default class SearchBoxHelp extends Component {
    constructor(props) {
        super(props);
        this.state = { isOpen: false };
    }

    shouldComponentUpdate(nextProps, nextState) {
        return shallowCompare(this, nextProps, nextState);
    }

    render() {
        const overlay = (
            <div>
                <p>You may use search qualifiers in any combination.</p>

                <ul>
                    <li><code>author:sindresorhus</code> Show or filter results by author</li>
                    <li><code>maintainer:sindresorhus</code> Show or filter results by maintainer</li>
                    <li><code>keywords:gulpplugin</code> Show or filter results by keywords</li>
                    <li><code>not:deprecated</code> Exclude packages that are deprecated, unstable or insecure</li>
                </ul>

                <p>For the complete list of qualifiers, please read the <a href="https://api-docs.npms.io/#api-Search-ExecuteSearchQuery" target="_blank">Search API documentation</a>.</p>
            </div>
        );

        return (
            <Tooltip overlayClassName="search-box-help-component-tooltip" placement="bottom" overlay={ overlay } trigger="click"
                onVisibleChange={ (visible) => this._onVisibleChange(visible) }>
                <div className="search-box-help-component">
                    <MaterialIcon id="help_outline" className={ this.state.isOpen ? 'hover' : '' }/>
                </div>
            </Tooltip>
        );
    }

    _onVisibleChange(visible) {
        this.setState({ isOpen: visible });  // eslint-disable-line react/no-set-state
    }
}
