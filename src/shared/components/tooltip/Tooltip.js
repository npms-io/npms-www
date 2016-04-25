import './Tooltip.css';
import './themes/default.css';
import './animations/zoom.css';
import React, { Component, PropTypes } from 'react';
import RcTooltip from 'rc-tooltip';

const validPlacements = ['top', 'right', 'bottom', 'left'];

class Tooltip extends Component {
    render() {
        const { overlayClassName, theme, animation, ...props } = this.props;
        const finalOverlayClassName = theme ? `${overlayClassName} tooltip-component-theme-${theme}` : overlayClassName;
        const finalAnimation = animation ? `animation-${animation}` : animation;

        if (props.placement && validPlacements.indexOf(props.placement) === -1) {
            throw new Error(`Invalid placement: ${props.placement}`);
        }

        return (
            <RcTooltip
                prefixCls="tooltip-component"
                overlayClassName={ finalOverlayClassName }
                animation={ finalAnimation }
                { ...props }>
                { this.props.children }
            </RcTooltip>

        );
    }
}

Tooltip.defaultProps = {
    animation: 'zoom',
    theme: 'default',
};

Tooltip.propTypes = Object.assign({
    theme: PropTypes.string,
}, RcTooltip.propTypes);

export default Tooltip;
