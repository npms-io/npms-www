import './Terms.css';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Header from 'shared/containers/header/Header';

class Terms extends Component {
    render() {
        return (
            <div className="page page-terms">
                <Header />

                <div className="page-header">Terms of Service</div>

                <div className="page-content">
                    <div className="last-update"><strong>Last updated:</strong> April 27, 2016</div>

                    <p>
                        Please read these Terms of Service ("Terms", "Terms of Service") carefully before using
                        the <a href="https://npms.io">https://npms.io</a> website (the "Service") operated by <span className="npms">npms
                        </span> ("us", "we", or "our").
                    </p>
                    <p>
                        Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms.
                        These Terms apply to all visitors, users and others who access or use the Service.
                    </p>
                    <p>
                        By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms
                        then you may not access the Service.
                    </p>

                    <h1>Links To Other Web Sites</h1>
                    <p>
                        Our Service may contain links to third-party web sites or services that are not owned or
                        controlled by <span className="npms">npms</span>.
                    </p>
                    <p>
                        <span className="npms">npms</span> has no control over, and assumes no responsibility for, the content, privacy
                        policies, or practices of any third party web sites or services. You further acknowledge and agree
                        that <span className="npms">npms</span> shall not be responsible or liable, directly or indirectly, for any damage
                        or loss caused or alleged to be caused by or in connection with use of or reliance on any such content, goods or
                        services available on or through any such web sites or services.
                    </p>
                    <p>
                        We strongly advise you to read the terms and conditions and privacy policies of any third-party web sites or
                        services that you visit.
                    </p>

                    <h1>Termination</h1>
                    <p>
                        We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason
                        whatsoever, including without limitation if you breach the Terms.
                    </p>
                    <p>
                        All provisions of the Terms which by their nature should survive termination shall survive termination, including,
                        without limitation, ownership provisions, warranty disclaimers, indemnity and limitations of liability.
                    </p>

                    <h1>Governing Law</h1>
                    <p>
                        These Terms shall be governed and construed in accordance with the laws of Portugal, without regard to its conflict
                        of law provisions.
                    </p>
                    <p>
                        Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
                        If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these
                        Terms will remain in effect. These Terms constitute the entire agreement between us regarding our Service, and
                        supersede and replace any prior agreements we might have between us regarding the Service.
                    </p>

                    <h1>Changes to this terms of service</h1>
                    <p>
                        <span className="npms">npms</span> has the discretion to update this terms of service at any time. When we do, we
                        will post a notification on the main page of our Site and revise the updated date at the top of this page.
                        We encourage Users to frequently check this page for any changes to stay informed about service terms.
                        You acknowledge and agree that it is your responsibility to review this terms of service periodically and become
                        aware of modifications.
                    </p>
                    <p>
                        By continuing to access or use our Service after those changes become effective, you agree to be bound by the
                        revised terms. If you do not agree to the new terms, please stop using the Service.
                    </p>

                    <h1>Contacting us</h1>
                    <p>
                        If you have any questions about this Terms of Service, the practices of this site, or your dealings with this site,
                        please contact us.
                    </p>
                </div>
            </div>
        );
    }
}

Terms.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

export default connect()(Terms);
