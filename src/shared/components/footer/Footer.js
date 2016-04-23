import './Footer.css';
import React, { Component } from 'react';
import { Link } from 'react-router';

class Footer extends Component {
    shouldComponentUpdate() {
        return false;
    }

    render() {
        return (
            <div className="footer-component">
                <ul className="pages">
                    <li><Link to={ '/about' } activeClassName="is-active">About</Link></li>
                    <li><Link to={ '/privacy' } activeClassName="is-active">Privacy</Link></li>
                    <li><Link to={ '/terms' } activeClassName="is-active">Terms</Link></li>
                </ul>
                <ul className="social-links">
                    <li><a href="http://twitter.com/npms_io">Twitter</a></li>
                    <li><a href="http://github.com/npms-io">GitHub</a></li>
                </ul>
            </div>
        );
    }
}

export default Footer;
