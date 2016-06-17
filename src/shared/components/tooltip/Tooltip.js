import './Tooltip.css';
import './themes/default.css';
import './animations/zoom.css';
import React, { Component, PropTypes } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import RcTooltip from 'rc-tooltip';

const validPlacements = ['top', 'right', 'bottom', 'left'];

class Tooltip extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return shallowCompare(this, nextProps, nextState);
    }

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
    trigger: ['hover', 'click'],
    getTooltipContainer: () => document.body,
    mouseLeaveDelay: 0.1,
    mouseEnterDelay: 0.1,
};

Tooltip.propTypes = {
    ...RcTooltip.propTypes,
    theme: PropTypes.string,
};

export default Tooltip;
