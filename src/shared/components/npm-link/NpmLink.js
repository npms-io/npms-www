import React, { Component, PropTypes } from 'react';
import shallowCompare from 'react-addons-shallow-compare';

class NpmLink extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return shallowCompare(this, nextProps, nextState);
    }

    render() {
        // Build the URL using encodeURIComponent because of @namespaces
        const { name, ...props } = this.props;
        const url = `http://npmjs.org/package/${encodeURIComponent(name)}`;

        return (
            <a { ...props } href={ url } target="_blank">
                { this.props.children }
            </a>
        );
    }
}

NpmLink.propTypes = {
    name: PropTypes.string.isRequired,
    children: PropTypes.string,
};

export default NpmLink;
