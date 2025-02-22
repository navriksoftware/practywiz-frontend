// import React from "react";

// const PrivacyPolicy = () => {
//   return <div>PrivacyPolicy</div>;
// };

// export default PrivacyPolicy;

import React from "react";
import "./TNCandPrivacy.css";

const PrivacyPolicy = () => {
  return (
    <div
      className="practywiz-tnc-container"
      onCopy={(e) => {
        if (!e.target.closest("a")) {
          e.preventDefault();
        }
      }}
    >
      <div className="practywiz-tnc-header">
        <div className="practywiz-tnc-header-text">
          <h1 className="practywiz-tnc-title">Privacy Policy</h1>
        </div>
      </div>

      <main className="practywiz-tnc-main">
        <section className="practywiz-tnc-section">
          <div className="practywiz-tnc-content">
            <p>
              This Privacy Policy sets forth the reasonable security practices
              and procedures adopted by Practywiz (“Company,” “we,” “our,” or
              “us”) and shall apply to the use, disclosure, and sharing of
              sensitive personal data or information (“Personal Information”)
              provided by the registered users of the Practywiz Website and Web
              Application ("Website/Web Application"). This policy is equally
              applicable to visitors/users accessing the Website/Web
              Application.
            </p>
            <p>
              We value the trust you have placed in us. To provide you with a
              convenient and secure online experience, we have implemented
              measures to protect the confidentiality, integrity, and security
              of your Personal Information during storage and transmission over
              the internet. This Privacy Policy explains how we collect, store,
              use, and protect your personal information while delivering our
              services.
            </p>
            <p>
              By accessing our Website/Web Application and providing personal
              information, you expressly agree to this Privacy Policy. Your
              continued use of the Website/Web Application shall be treated as
              your consent to the processing of your Personal Information in
              accordance with this Privacy Policy.
            </p>
            <p>
              This Privacy Policy is in compliance with applicable laws and
              regulations but may be updated periodically. We encourage you to
              review this policy from time to time. This Privacy Policy is
              incorporated into and subject to the Terms of Use of the
              Website/Web Application.
            </p>
          </div>
        </section>

        <section className="practywiz-tnc-section">
          <h2 className="practywiz-tnc-section-title">Personal Information</h2>
          <div className="practywiz-tnc-content">
            <p>
              Personal Information refers to any information that relates to a
              natural person and can be used, directly or indirectly, to
              identify that person.
            </p>
            <p>
              The Personal Information collected from you may include but is not
              limited to your{" "}
              <strong>
                full name, address, email address, phone number, payment
                details, and other necessary information
              </strong>{" "}
              as required under applicable laws. You have the right to update or
              modify your Personal Information stored with us at any time.
            </p>
          </div>
        </section>

        <section className="practywiz-tnc-section">
          <h2 className="practywiz-tnc-section-title">
            Collection of Personal Information
          </h2>
          <div className="practywiz-tnc-content">
            <p>
              Certain features of the Website/Web Application require user
              registration, during which we may collect details such as your
              email address, password, phone number, and other information.
            </p>
            <p>
              If you avail of any online services through Practywiz, we may
              require additional Personal Information, such as bank account
              details or other financial information, in order to facilitate
              transactions securely. Such data is encrypted and stored securely
              in compliance with data protection regulations
            </p>
            <p>
              We may also request additional personal details for enhanced
              service benefits, and you will always have the option to provide
              or decline such information.
            </p>
            <p>
              In order to optimize your experience, we may also collect
              aggregated data, account credentials, and usage information to
              provide personalized services.
            </p>
          </div>
        </section>
        <section className="practywiz-tnc-section">
          <h2 className="practywiz-tnc-section-title">
            Cookies & Privacy Policy
          </h2>
          <div className="practywiz-tnc-content">
            <p>
              We use cookies to track user behavior on our website. This helps
              us understand how users interact with our platform and enables us
              to improve user experience.
            </p>
            <h3 className="practywiz-tnc-subtitle">Types of Cookies</h3>
            <ul className="practywiz-tnc-list">
              <li className="practywiz-tnc-list-item">
                {" "}
                <strong>Essential Cookies:</strong> These cookies are necessary
                for the website to function properly. They enable basic
                functions like page navigation and access to secure areas of the
                website.
              </li>
              <li className="practywiz-tnc-list-item">
                {" "}
                <strong>Session cookies:</strong> Temporary cookies stored until
                you close your browser.
              </li>
              <li className="practywiz-tnc-list-item">
                {" "}
                <strong>Persistent cookies:</strong> Cookies stored on your
                device for a longer period.
              </li>
              <li className="practywiz-tnc-list-item">
                {" "}
                <strong>Performance Cookies:</strong> These cookies help us
                understand how visitors interact with the website by collecting
                and reporting information anonymously.
              </li>
            </ul>
            <p>
              Information collected through cookies includes IP address, browser
              type, pages visited, links clicked, etc. This data is used for
              analytics and website improvement. You can control cookie settings
              in your browser preferences.
            </p>
          </div>
        </section>
        <section className="practywiz-tnc-section">
          <h2 className="practywiz-tnc-section-title">
            Use of Personal Information
          </h2>
          <div className="practywiz-tnc-content">
            <p>
              We use and disclose your Personal Information only for the
              following purposes:
            </p>
            <ul className="practywiz-tnc-list">
              <li className="practywiz-tnc-list-item">
                To provide and manage the services offered on the Website/Web
                Application.
              </li>
              <li className="practywiz-tnc-list-item">
                To process payments and prevent fraud
              </li>
              <li className="practywiz-tnc-list-item">
                To communicate important notifications, alerts, or
                service-related updates.
              </li>
              <li className="practywiz-tnc-list-item">
                To comply with regulatory authorities or applicable legal
                requirements.
              </li>
              <li className="practywiz-tnc-list-item">
                To facilitate payment processing through third-party payment
                providers.
              </li>
              <li className="practywiz-tnc-list-item">
                To enhance and customize your user experience.
              </li>
              <li className="practywiz-tnc-list-item">
                To analyze usage patterns, detect fraud, and protect against
                cyber threats.
              </li>
              <li className="practywiz-tnc-list-item">
                To carry out research and market analysis for service
                improvement.
              </li>
            </ul>
            <p>
              To fulfill these objectives, we may share your data with
              affiliated companies, third-party vendors, payment gateways, and
              authorized service providers under strict data privacy agreements.
            </p>
          </div>
        </section>
        <section className="practywiz-tnc-section">
          <h2 className="practywiz-tnc-section-title">Security of Your Data</h2>
          <div className="practywiz-tnc-content">
            <p>
              We take extensive measures to ensure the security of your Personal
              Information. Our security practices include:
            </p>
            <ul className="practywiz-tnc-list">
              <li className="practywiz-tnc-list-item">
                Secure Socket Layer (SSL) encryption for data transmission
              </li>
              <li className="practywiz-tnc-list-item">
                Regular security audits and vulnerability assessments
              </li>
              <li className="practywiz-tnc-list-item">
                Access controls and data encryption
              </li>
              <li className="practywiz-tnc-list-item">
                Secure storage and backup protocols
              </li>
              <li className="practywiz-tnc-list-item">
                Compliance with industry standards and data protection laws
              </li>
            </ul>
            <p>
              Despite our best efforts, Practywiz cannot guarantee complete
              security of data transmitted over the internet. Users are advised
              to exercise caution and safeguard their credentials.
            </p>
          </div>
        </section>
        <section className="practywiz-tnc-section">
          <h2 className="practywiz-tnc-section-title">
            Data Retention & Account Deactivation
          </h2>
          <div className="practywiz-tnc-content">
            <p>
              Your Personal Information will be retained as long as necessary to
              provide services or comply with legal obligations. If you choose
              to deactivate your account, your data will be deactivated and
              accessible only to authorized personnel for compliance purposes.
              Upon reactivation, you can regain access to your account and
              associated data.
            </p>
          </div>
        </section>
        <section className="practywiz-tnc-section">
          <h2 className="practywiz-tnc-section-title">
            Changes to This Privacy Policy
          </h2>
          <div className="practywiz-tnc-content">
            <p>
              We reserve the right to update this Privacy Policy at any time.
              Any changes will be posted on this page, and users will be
              notified of significant updates. We encourage you to review this
              policy periodically.
            </p>
            <p>
              <strong>Last Updated:</strong> 1st January 2025
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default PrivacyPolicy;
