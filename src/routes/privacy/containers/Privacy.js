import './Privacy.css';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Header from 'shared/containers/header/Header';
import { markAsLoading, unmarkAsLoading } from 'shared/state/app/actions';

class Privacy extends Component {
    componentWillMount() {
        this.props.dispatch(markAsLoading());
        setTimeout(() => this.props.dispatch(unmarkAsLoading()), 10);
    }

    render() {
        return (
            <div className="page page-privacy">
                <Header appearance="menu-only" />

                <div className="page-header">
                    <div className="centered">Privacy Policy</div>
                </div>

                <div className="page-content">
                    <div className="last-update"><strong>Last updated:</strong> April 27, 2016</div>

                    <p>
                        This Privacy Policy governs the manner in which <span className="npms">npms</span> collects, uses, maintains and
                        discloses information collected from users (each, a "User") of
                        the <a href="https://npms.io">https://npms.io</a> website ("Site").
                    </p>

                    <h1>Personal identification information</h1>
                    <p>
                        We may collect personal identification information from Users in a variety of ways, including, but not limited to,
                        when Users visit our site, fill out a form, and in connection with other activities, services, features or resources
                        we make available on our Site. Users may visit our Site anonymously. We will collect personal identification
                        information from Users only if they voluntarily submit such information to us. Users can always refuse to supply
                        personally identification information, except that it may prevent them from engaging in certain Site related
                        activities.
                    </p>

                    <h1>Non-personal identification information</h1>
                    <p>
                        We may collect non-personal identification information about Users whenever they interact with our Site.
                        Non-personal identification information may include the browser name, the type of computer and technical information
                        about Users means of connection to our Site, such as the operating system and the Internet service providers
                        utilized and other similar information.
                    </p>

                    <h1>Web browser cookies</h1>
                    <p>
                        Our Site may use "cookies" to enhance User experience.
                        User's web browser places cookies on their hard drive for record-keeping purposes and sometimes to track information
                        about them. User may choose to set their web browser to refuse cookies, or to alert you when cookies are being sent.
                        If they do so, note that some parts of the Site may not function properly.
                    </p>

                    <h1>How we use collected information</h1>
                    <p>
                        <span className="npms">npms</span> may collect and use Users personal information for the following purposes:
                    </p>
                    <ul>
                        <li>
                            <strong>To run and operate our Site</strong>
                            <p>We may need your information to display content on the Site correctly.</p>
                        </li>
                        <li>
                            <strong>To improve customer service</strong>
                            <p>Information you provide helps us respond to your customer service requests and support needs more
                            efficiently.</p>
                        </li>
                        <li>
                            <strong>To personalize user experience</strong>
                            <p>We may use information in the aggregate to understand how our Users as a group use the services and
                            resources provided on our Site.</p>
                        </li>
                        <li>
                            <strong>To improve our Site</strong>
                            <p>We may use feedback you provide to improve our products and services.</p>
                        </li>
                    </ul>

                    <h1>How we protect your information</h1>
                    <p>
                        We adopt appropriate data collection, storage and processing practices and security measures to protect against
                        unauthorized access, alteration, disclosure or destruction of your personal information, username, password,
                        transaction information and data stored on our Site.
                    </p>

                    <h1>Sharing your personal information</h1>
                    <p>
                        We do not sell, trade, or rent Users personal identification information to others. We may share generic aggregated
                        demographic information not linked to any personal identification information regarding visitors and users with our
                        business partners, trusted affiliates and advertisers for the purposes outlined above.
                    </p>

                    <h1>Third party websites</h1>
                    <p>
                        Users may find advertising or other content on our Site that link to the sites and services of our partners,
                        suppliers, advertisers, sponsors, licensors and other third parties. We do not control the content or links that
                        appear on these sites and are not responsible for the practices employed by websites linked to or from our Site.
                        In addition, these sites or services, including their content and links, may be constantly changing. These sites and
                        services may have their own privacy policies and customer service policies. Browsing and interaction on any other
                        website, including websites which have a link to our Site, is subject to that website's own terms and policies.
                    </p>

                    <h1>Advertising</h1>
                    <p>
                        Ads appearing on our site may be delivered to Users by advertising partners, who may set cookies. These cookies
                        allow the ad server to recognize your computer each time they send you an online advertisement to compile non
                        personal identification information about you or others who use your computer. This information allows ad networks
                        to, among other things, deliver targeted advertisements that they believe will be of most interest to you.
                        This privacy policy does not cover the use of cookies by any advertisers.
                    </p>

                    <h1>Compliance with children's online privacy protection act</h1>
                    <p>
                        Protecting the privacy of the very young is especially important. For that reason, we never collect or maintain
                        information at our Site from those we actually know are under 13, and no part of our website is structured to
                        attract anyone under 13.
                    </p>

                    <h1>Advertising</h1>
                    <p>
                        Ads appearing on our site may be delivered to Users by advertising partners, who may set cookies. These cookies
                        allow the ad server to recognize your computer each time they send you an online advertisement to compile non
                        personal identification information about you or others who use your computer. This information allows ad networks
                        to, among other things, deliver targeted advertisements that they believe will be of most interest to you.
                        This privacy policy does not cover the use of cookies by any advertisers.
                    </p>

                    <h1>Your acceptance of these terms</h1>
                    <p>
                        By using this Site, you signify your acceptance of this policy. If you do not agree to this policy, please do not
                        use our Site. Your continued use of the Site following the posting of changes to this policy will be deemed your
                        acceptance of those changes.
                    </p>

                    <h1>Changes to this privacy policy</h1>
                    <p>
                        <span className="npms">npms</span> has the discretion to update this privacy policy at any time. When we do, we will
                        post a notification on the main page of our Site and revise the updated date at the top of this page. We encourage
                        Users to frequently check this page for any changes to stay informed about how we are helping to protect the
                        personal information we collect. You acknowledge and agree that it is your responsibility to review this privacy
                        policy periodically and become aware of modifications.
                    </p>
                    <p>
                        By continuing to access or use our Service after those changes become effective, you agree to be bound by the
                        revised terms. If you do not agree to the new policy, please stop using the Service.
                    </p>

                    <h1>Contacting us</h1>
                    <p>
                        If you have any questions about this Privacy Policy, the practices of this site, or your dealings with this site,
                        please contact us.
                    </p>
                </div>
            </div>
        );
    }
}

Privacy.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

export default connect()(Privacy);
