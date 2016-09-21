import './About.css';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Gravatar from 'react-gravatar';
import Header from 'shared/containers/header/Header';
import MaterialIcon from 'shared/components/icon/MaterialIcon';
import SvgIcon from 'shared/components/icon/SvgIcon';
import keymetricsLogo from 'file!./logos/keymetrics.svg';

// TODO: split each section in its own component?
// TODO: add screenshots of npmjs search results

class About extends Component {
    render() {
        return (
            <div className="page page-about">
                <Header />

                <div className="page-header">About</div>

                <div className="page-content">
                    <p className="section-headline">
                        <span className="highlight">npms</span> - which stands for npm search - was built to empower the javascript
                        community by providing a better and open source search for node packages.
                    </p>

                    { /* ------------- Why ------------- */ }

                    <div className="section-why">
                        <h1>Why?</h1>
                        <p>
                            <a href="https://npmjs.com" target="_blank">npmjs.com</a> allows developers to search for node packages, but,
                            having used it for several years, I always felt that the overall experience and quality of the results were bad.
                        </p>
                        <p>
                            The official search is powered by <a href="http://elasticsearch.com" target="_blank">Elasticsearch</a> but no advanced analyzers were
                            configured. More specifically, no <a href="https://www.elastic.co/guide/en/elasticsearch/guide/current/stemming.html" target="_blank">stemming</a> nor <a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-word-delimiter-tokenfilter.html" target="_blank">split word</a> are
                            enabled. What does this mean for you? Try searching for <a href="https://www.npmjs.com/search?q=couchdb+promise" target="_blank">"couchdb promise"</a> and <a href="https://www.npmjs.com/search?q=couchdb+promises" target="_blank">"couchdb promises"</a> and see how different the search results are.
                            Imagine how many packages you lost on your previous searches because of this.
                        </p>
                        <p>
                            When a list of results is presented to you on the screen, the order of the results are simply based on the
                            relevance they have to the search terms. <a href="https://npmjs.com" target="_blank">npmjs.com</a> search does
                            not take into account the packages value to rank good packages higher. Because of this, users must manually
                            analyze the search results one by one, taking into consideration several attributes such as the package's
                            version (<code>> 1.0.0</code>?), the downloads count, the latest publish date, the number of GitHub issues,
                            stars, forks, etc. This process is tedious and slow.
                        </p>
                    </div>

                    { /* ------------- How it works ------------- */ }

                    <div className="section-how-it-works">
                        <a id="how-it-works" />

                        <h1>How it works</h1>
                        <p>
                            The <a href="https://github.com/npms-io/npms-analyzer" target="_blank">npms analyzer</a> continuously analyzes <span className="highlight">npm</span> ecosystem,
                            gathering as much information as possible from a variety of sources, including GitHub, <a href="https://david-dm.org/" target="_blank">david</a> and <a href="https://nodesecurity.io/" target="_blank">nsp</a>.

                            Using the collected information, a final score for each package is calculated based on four different aspects:
                        </p>

                        <div className="aspects">
                            <div className="aspect">
                                <MaterialIcon id="high_quality" />
                                <div className="name">Quality</div>
                                <div className="description">
                                    <p>
                                        Quality attributes are easy to calculate because they are self contained.
                                        These are the kind of attributes that a person looks first when looking at the package.
                                    </p>

                                </div>
                                <ul className="examples">
                                    <li>Has README? Has license? Has <code>.gitignore</code> and friends?</li>
                                    <li>Is the version stable (<code>&gt; 1.x.x</code>)? Is it deprecated?</li>
                                    <li>Has tests? Whats their coverage %? Is build passing?</li>
                                    <li>Has outdated dependencies? Do they have vulnerabilities?</li>
                                    <li>Has custom website? Has badges?</li>
                                    <li>Does the project have linters configured?</li>
                                </ul>
                            </div>
                            <div className="aspect">
                                <MaterialIcon id="build" />
                                <div className="name">Maintenance</div>
                                <div className="description">
                                    <p>
                                        Maintenance attributes allows us to understand if the package is active & healthy or if it is
                                        abandoned. These are typically the second kind of attributes that a person looks when looking at
                                        the package.
                                    </p>
                                </div>
                                <ul className="examples">
                                    <li>Ratio of open issues vs total issues</li>
                                    <li>The time it takes to close issues</li>
                                    <li>Most recent commit</li>
                                    <li>Commit frequency</li>
                                    <li>Release frequency</li>
                                </ul>
                            </div>
                            <div className="aspect">
                                <MaterialIcon id="star_half" />
                                <div className="name">Popularity</div>
                                <div className="description">
                                    <p>
                                        Popularity attributes allows us to understand the package adoption and community size.
                                    </p>
                                    <p>
                                        These are the kind of attributes that a person looks when they are undecided on the package choice.
                                    </p>
                                </div>
                                <ul className="examples">
                                    <li>Number of stars</li>
                                    <li>Number of forks</li>
                                    <li>Number of subscribers</li>
                                    <li>Number of contributors</li>
                                    <li>Number of dependents</li>
                                    <li>Number of downloads</li>
                                    <li>Downloads acceleration</li>
                                </ul>
                            </div>
                            <div className="aspect">
                                <MaterialIcon id="record_voice_over" />
                                <div className="name">Personalities</div>
                                <div className="description">
                                    <p>
                                        If two packages are similar, one tends to choose the one in which the author is well known in the
                                        community.
                                    </p>
                                    <p>
                                        Relationships between people are also important. When an user follows another, there's a bound
                                        between them. We can infer that people prefer packages from the users they follow.
                                    </p>
                                    <p>
                                        As of this writting the personalities attributes are not yet implemented.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <p>If you want to know more, you may look at the <a href="https://github.com/npms-io/npms-analyzer/blob/master/docs/architecture.md" target="_blank">architecture</a> document.</p>
                    </div>

                    { /* ------------- Get involved ------------- */ }

                    <div className="section-get-involved">
                        <h1>Get involved</h1>
                        <p>
                            <span className="highlight">npms</span> is open-source and we still have some work to do.
                            Any contributions, ideas or bug reports are welcome. Visit our <a href="https://github.com/npms-io" target="_blank">GitHub</a> and help us!
                        </p>
                        <p>
                            Feel free to reach us directly via email or <a href="https://twitter.com/npms_io" target="_blank">Twitter</a>.
                        </p>
                    </div>

                    { /* ------------- Sponsors ------------- */ }

                    <div className="section-sponsors">
                        <h1>Sponsors</h1>

                        <div className="sponsors-list">
                            <div className="sponsor">
                                <a href="https://keymetrics.io" className="logo" target="_blank">
                                    <img src={ keymetricsLogo } />
                                </a>
                                <div className="description">
                                    We use <a href="http://pm2.keymetrics.io/" target="_blank">PM2</a> to deploy our services
                                    and <a href="https://keymetrics.io" target="_blank">Keymetrics</a> allows us to easily manage these deployments and to monitor the production machines.
                                </div>
                            </div>
                        </div>

                        <p className="contact-us">
                            We are using money from our own pockets to provide this service to you. <a href="https://salt.bountysource.com/teams/npms" target="_blank">Donations</a> are welcome.
                            If you would like to sponsor this project, feel free to reach us.
                        </p>
                    </div>

                    { /* ------------- Authors ------------- */ }

                    <div className="section-authors">
                        <div className="core-authors">
                            <h1>Authors</h1>
                            <div className="authors-list">
                                <div className="author">
                                    <Gravatar size={ 130 } email="andremiguelcruz@msn.com" className="avatar" https />
                                    <div className="name">André Cruz</div>
                                    <div className="links">
                                        <a className="social-link" href="https://twitter.com/satazor" target="_blank">
                                            <SvgIcon id={ SvgIcon.twitter } />
                                        </a>
                                        <a className="social-link" href="https://github.com/satazor" target="_blank">
                                            <SvgIcon id={ SvgIcon.github } />
                                        </a>
                                    </div>
                                </div>

                                <div className="author">
                                    <Gravatar size={ 130 } email="mail@andreduarte.net" className="avatar" https />
                                    <div className="name">André Duarte</div>
                                    <div className="links">
                                        <a className="social-link" href="https://twitter.com/atduarte" target="_blank">
                                            <SvgIcon id={ SvgIcon.twitter } />
                                        </a>
                                        <a className="social-link" href="https://github.com/atduarte" target="_blank">
                                            <SvgIcon id={ SvgIcon.github } />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="special-thanks">
                            <h3>Special thanks</h3>
                            <ul>
                                <li><a href="http://pinxai.com" target="_blank">Cátia Santos</a> for the website design</li>
                                <li><a href="https://github.com/carsy" target="_blank">José Bateira</a> for the initial effort put into this project</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

About.propTypes = {
    dispatch: PropTypes.func.isRequired,
};


export default connect()(About);
