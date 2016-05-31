import './ScrollToTop.css';
import React, { Component, PropTypes } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import MaterialIcon from 'shared/components/icon/MaterialIcon';

class ScrollToTop extends Component {
    constructor(props) {
        super(props);
        this._handleScroll = this._handleScroll.bind(this);
    }

    componentDidMount() {
        window.addEventListener('scroll', this._handleScroll);
        setTimeout(() => this._handleScroll(), 50);  // Do not cause a reflow syncronously
    }

    shouldComponentUpdate(nextProps, nextState) {
        return shallowCompare(this, nextProps, nextState);
    }

    componentDidUpdate() {
        this._handleScroll();
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this._handleScroll);
    }

    render() {
        return (
            <div className="scroll-to-top-component" ref={ (ref) => { this._el = ref; } }>
                <MaterialIcon id="keyboard_arrow_up" onClick={ () => this._handleScrollToTopIconClick() }/>
            </div>
        );
    }

    _handleScroll() {
        this._el && this._el.classList.toggle('is-visible', (window.pageYOffset || document.body.scrollTop) > this.props.showUnder);
    }

    _handleScrollToTopIconClick() {
        window.scrollTo({ left: 0, behavior: 'smooth' });
    }
}

ScrollToTop.propTypes = {
    showUnder: PropTypes.number.isRequired,
};

export default ScrollToTop;
