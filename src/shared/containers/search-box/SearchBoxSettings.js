import './SearchBoxSettings.css';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import shallowCompare from 'react-addons-shallow-compare';
import MaterialIcon from 'shared/components/icon/MaterialIcon';
import Tooltip from 'shared/components/tooltip/Tooltip';
import Slider from 'rc-slider';
import { update, reset } from 'shared/state/search/settings/actions';

const marks0to10 = { 0: '', 2.5: '', 5: '', 7.5: '', 10: '' };

class SearchBoxSettings extends Component {
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
                <div className="row row-slider row-quality-weight">
                    <div className="label">Quality weight <span>({ this.props.qualityWeight })</span></div>
                    <Slider value={ this.props.qualityWeight } marks={ marks0to10 } tipFormatter={ null }
                        step={ 0.1 } min={ 0 } max={ 10 } onChange={ (value) => this._onSettingChange('qualityWeight', value) }/>
                </div>
                <div className="row row-slider row-popularity-weight">
                    <div className="label">Popularity weight <span>({ this.props.popularityWeight })</span></div>
                    <Slider value={ this.props.popularityWeight } marks={ marks0to10 } tipFormatter={ null }
                        step={ 0.1 } min={ 0 } max={ 10 } onChange={ (value) => this._onSettingChange('popularityWeight', value) }/>
                </div>
                <div className="row row-slider row-maintenance-weight">
                    <div className="label">Maintenance weight <span>({ this.props.maintenanceWeight })</span></div>
                    <Slider value={ this.props.maintenanceWeight } marks={ marks0to10 } tipFormatter={ null }
                        step={ 0.1 } min={ 0 } max={ 10 } onChange={ (value) => this._onSettingChange('maintenanceWeight', value) } />
                </div>

                <div className="row row-boost-exact">
                    <label>
                        <input type="checkbox" name="boost-exact" checked={ this.props.boostExact }
                            onChange={ (e) => this._onSettingChange('boostExact', e.target.checked) }/>
                        <span>Make exact matches appear first</span>
                    </label>
                </div>

                <div className="reset-settings" onClick={ () => this._onResetSettingsClick() }>Reset settings</div>
            </div>
        );
    }

    _onVisibleChange(visible) {
        this.setState({ isOpen: visible });  // eslint-disable-line react/no-set-state
    }

    _onSettingChange(name, value) {
        this.props.dispatch(update({ [name]: value }));
    }

    _onResetSettingsClick() {
        this.props.dispatch(reset());
    }
}

SearchBoxSettings.propTypes = {
    dispatch: PropTypes.func.isRequired,
    qualityWeight: PropTypes.number.isRequired,
    popularityWeight: PropTypes.number.isRequired,
    maintenanceWeight: PropTypes.number.isRequired,
    boostExact: PropTypes.bool.isRequired,
};

export default connect((state) => ({
    ...state.search.settings,
}))(SearchBoxSettings);
