import './SearchBoxSettings.css';
import React, { Component } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import MaterialIcon from 'shared/components/icon/MaterialIcon';
import Tooltip from 'shared/components/tooltip/Tooltip';
import Slider from 'rc-slider';

const marks0to10 = { 0: '', 2.5: '', 5: '', 7.5: '', 10: '' };

export default class SearchBoxSettings extends Component {
    constructor(props) {
        super(props);
        this.state = { isOpen: false };
    }

    shouldComponentUpdate(nextProps, nextState) {
        return shallowCompare(this, nextProps, nextState);
    }

    render() {
        return (
            <Tooltip trigger="click" overlayClassName="search-box-settings-component-tooltip" placement="bottom"
                overlay={ this._renderOverlay() } onVisibleChange={ (visible) => this._onVisibleChange(visible) } >
                <div className="search-box-settings-component">
                    <MaterialIcon id="settings" className={ this.state.isOpen ? 'hover' : '' }/>
                </div>
            </Tooltip>
        );
    }

    _renderOverlay() {
        return (
            <div className="clearfix">
                <div className="row row-quality-weight">
                    <div className="label">Quality weight</div>
                    <Slider defaultValue={ 8 } marks={ marks0to10 } tipFormatter={ null } step={ 0.1 } min={ 0 } max={ 10 } />
                </div>
                <div className="row row-maintenance-weight">
                    <div className="label">Maintenance weight</div>
                    <Slider defaultValue={ 8 } marks={ marks0to10 } tipFormatter={ null } step={ 0.1 } min={ 0 } max={ 10 } />
                </div>
                <div className="row row-popularity-weight">
                    <div className="label">Popularity weight</div>
                    <Slider defaultValue={ 8 } marks={ marks0to10 } tipFormatter={ null } step={ 0.1 } min={ 0 } max={ 10 } />
                </div>

                <div className="row row-boost-exact">
                    <label>
                        <input type="checkbox" name="boost-exact" />
                        <span>Make exact matches appear first</span>
                    </label>
                </div>

                <div className="reset-settings">Reset settings</div>
            </div>
        );
    }

    _onVisibleChange(visible) {
        this.setState({ isOpen: visible });  // eslint-disable-line react/no-set-state
    }
}
