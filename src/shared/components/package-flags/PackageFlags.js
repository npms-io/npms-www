import './PackageFlags.css';
import React, { Component, PropTypes } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import Tooltip from 'shared/components/tooltip/Tooltip';

class PackageFlags extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return shallowCompare(this, nextProps, nextState);
    }

    render() {
        const flags = this.props.flags;

        return (
            <div className="package-flags-component">
                { flags.deprecated ? this._renderDeprecated() : '' }
                { flags.insecure ? this._renderInsecure() : '' }
                { flags.unstable ? this._renderUnstable() : '' }
            </div>
        );
    }

    // ---------------------------------------------------------

    _renderDeprecated() {
        return (
            <div className="package-flag package-flag-deprecated">
                <Tooltip overlayClassName="package-flags-component-tooltip" placement="top" destroyTooltipOnHide
                    overlay={ this.props.flags.deprecated }>
                    <span>deprecated</span>
                </Tooltip>
            </div>
        );
    }

    _renderInsecure() {
        const overlay = (
            <div>
                <p>
                    Package <code>{ this.props.package.name}@{ this.props.package.version}</code> has { ' ' }
                    <strong>{ this.props.flags.insecure }</strong> { this.props.flags.insecure > 1 ? 'vulnerabilities' : 'vulnerability' }.
                </p>
                <p>For more details, check against <a href={ `https://api.nodesecurity.io/check/${this.props.package.name}` } target="_blank">nodesecurity.io</a>.</p>
            </div>
        );

        return (
            <div className="package-flag package-flag-insecure">
                <Tooltip overlayClassName="package-flags-component-tooltip" placement="top" destroyTooltipOnHide overlay={ overlay }>
                    <span>insecure</span>
                </Tooltip>
            </div>
        );
    }

    _renderUnstable() {
        const overlay = (
            <div>
                <p><code>{ this.props.package.name }@{ this.props.package.version}</code> has not reached <code>v1.0.0</code> yet.</p>
            </div>
        );

        return (
            <div className="package-flag package-flag-unstable">
                <Tooltip overlayClassName="package-flags-component-tooltip" placement="top" destroyTooltipOnHide overlay={ overlay }>
                    <span>unstable</span>
                </Tooltip>
            </div>
        );
    }
}

PackageFlags.propTypes = {
    package: PropTypes.object.isRequired,
    flags: PropTypes.object.isRequired,
};

export default PackageFlags;
