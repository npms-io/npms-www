import './Tooltip.css';
import './themes/default.css';
import './animations/fade.css';
import React, { Component, PropTypes } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import RcTooltip from 'rc-tooltip';
import placeArrow from './util/placeArrow';
import checkEdges from './util/checkEdges';

const validPlacements = ['top', 'right', 'bottom', 'left'];

class Tooltip extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return shallowCompare(this, nextProps, nextState);
    }

    render() {
        const { overlayClassName, theme, animation, ...props } = this.props;
        const finalOverlayClassName = theme ? `${overlayClassName || ''} tooltip-component-theme-${theme}`.trim() : overlayClassName;
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
    animation: 'fade',
    theme: 'default',
    trigger: ['hover', 'click'],
    getTooltipContainer: () => document.body,
    mouseEnterDelay: 0.1,
    mouseLeaveDelay: 0.1,
    onPopupAlign: function (node, align) { // eslint-disable-line object-shorthand
        checkEdges(node, align, this);  // Prevent tooltips from being too close from the edges of the browser, see https://github.com/react-component/tooltip/issues/55
        placeArrow(node, align, this);  // Properly position arrow on target, see: https://github.com/react-component/tooltip/issues/54
    },
};

Tooltip.propTypes = {
    ...RcTooltip.propTypes,
    theme: PropTypes.string,
};

export default Tooltip;
