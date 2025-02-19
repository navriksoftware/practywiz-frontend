import React from "react";
import "./TNCandPrivacy.css";

const TermsConditions = () => {
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
          <h1 className="practywiz-tnc-title">Terms & Conditions</h1>
        </div>
      </div>

      <main className="practywiz-tnc-main">
        <section className="practywiz-tnc-section">
          <div className="practywiz-tnc-content">
            <p>
              Welcome to{" "}
              <a href="https://practywiz.com" className="practywiz-tnc-link">
                https://practywiz.com
              </a>
              . These terms and conditions outline the rules and regulations for
              the use of Practywiz's services, accessible via both the website -
              <a href="https://practywiz.com" className="practywiz-tnc-link">
                https://practywiz.com
              </a>{" "}
              and mobile/web applications - https://app.practywiz.com/,
              including organization-specific subdomains (e.g.,
              https://xyz.practywiz.com/, https://abc.practywiz.com/).
            </p>
            <p>
              By accessing this website, we assume you accept these terms and
              conditions. Do not continue to use{" "}
              <a href="https://practywiz.com" className="practywiz-tnc-link">
                https://practywiz.com
              </a>{" "}
              if you do not agree to take all of the terms and conditions stated
              on this page.
            </p>
            <p>
              By using our services, you acknowledge and agree that your calls,
              whether audio or video, may be recorded for quality assurance,
              training, and monitoring purposes. These recordings may also be
              used to resolve disputes or for any legal compliance as required.
            </p>
          </div>
        </section>

        <section className="practywiz-tnc-section">
          <h2 className="practywiz-tnc-section-title">Terminology</h2>
          <div className="practywiz-tnc-content">
            <p>
              The following terminology applies to these Terms and Conditions,
              Privacy Statement, and Disclaimer Notice and all Agreements:
              "Client", "You" and "Your" refers to you, the person logging onto
              this website and compliant with the Company's terms and
              conditions. "The Company", "Ourselves", "We", "Our", and "Us"
              refers to our Company. "Party", "Parties", or "Us" refers to both
              the Client and ourselves. All terms refer to the offer,
              acceptance, and consideration of payment necessary to undertake
              the process of our assistance to the Client in the most
              appropriate manner for the express purpose of meeting the Client's
              needs in respect of the provision of the Company's stated
              services, in accordance with and subject to the prevailing law of
              India.
            </p>
          </div>
        </section>

        <section className="practywiz-tnc-section">
          <h2 className="practywiz-tnc-section-title">Cookies</h2>
          <div className="practywiz-tnc-content">
            <p>
              We employ the use of cookies. By accessing{" "}
              <a href="https://practywiz.com" className="practywiz-tnc-link">
                https://practywiz.com
              </a>
              , you agree to use cookies in agreement with Practywiz's Privacy
              Policy.
            </p>
            <p>
              Most interactive websites use cookies to retrieve user details for
              each visit. Cookies are used by our website to enable
              functionality in certain areas, making it easier for visitors.
              Some of our affiliate/advertising partners may also use cookies.
            </p>
          </div>
        </section>

        <section className="practywiz-tnc-section">
          <h2 className="practywiz-tnc-section-title">License</h2>
          <div className="practywiz-tnc-content">
            <p>
              Unless otherwise stated, Practywiz and/or its licensors own the
              intellectual property rights for all material on
              https://practywiz.com. All intellectual property rights are
              reserved. You may access this from https://practywiz.com for your
              own personal use, subject to restrictions set in these terms and
              conditions.
            </p>
            <p>You must not:</p>
            <ul className="practywiz-tnc-list">
              <li className="practywiz-tnc-list-item">
                Republish material from https://practywiz.com/
              </li>
              <li className="practywiz-tnc-list-item">
                Sell, rent, or sub-license material from https://practywiz.com/
              </li>
              <li className="practywiz-tnc-list-item">
                Reproduce, duplicate, or copy material from
                https://practywiz.com/
              </li>
              <li className="practywiz-tnc-list-item">
                Redistribute content from https://practywiz.com/
              </li>
            </ul>
            <p>This Agreement shall begin on the date hereof.</p>
          </div>
        </section>

        <section className="practywiz-tnc-section">
          <h2 className="practywiz-tnc-section-title">
            User-Generated Content
          </h2>
          <div className="practywiz-tnc-content">
            <p>
              Parts of this website may offer users the opportunity to post and
              exchange opinions and information. Practywiz does not filter,
              edit, publish, or review comments before their presence on the
              website. Comments do not reflect the views and opinions of
              Practywiz, its agents, or affiliates. To the extent permitted by
              applicable laws, Practywiz shall not be liable for the comments or
              any liability, damages, or expenses caused by any use of and/or
              appearance of the comments on this website.
            </p>
            <p>
              Practywiz reserves the right to monitor and remove comments deemed
              inappropriate, offensive, or in breach of these Terms and
              Conditions.
            </p>
            <p>You warrant and represent that:</p>
            <ul className="practywiz-tnc-list">
              <li className="practywiz-tnc-list-item">
                You are entitled to post comments on our website and have all
                necessary licenses and consents to do so.
              </li>
              <li className="practywiz-tnc-list-item">
                The comments do not invade any intellectual property rights,
                including but not limited to copyright, patent, or trademark of
                any third party.
              </li>
              <li className="practywiz-tnc-list-item">
                The comments do not contain defamatory, libelous, offensive,
                indecent, or otherwise unlawful material.
              </li>
              <li className="practywiz-tnc-list-item">
                The comments will not be used for solicitation, business
                promotion, or unlawful activity.
              </li>
            </ul>
          </div>
        </section>

        <section className="practywiz-tnc-section">
          <h2 className="practywiz-tnc-section-title">
            Hyperlinking to Our Content
          </h2>
          <div className="practywiz-tnc-content">
            <p>
              The following organizations may link to our website without prior
              written approval:
            </p>
            <ul className="practywiz-tnc-list">
              <li className="practywiz-tnc-list-item">Government agencies</li>
              <li className="practywiz-tnc-list-item">Search engines</li>
              <li className="practywiz-tnc-list-item">News organizations</li>
              <li className="practywiz-tnc-list-item">
                Online directory distributors linking similarly to other
                businesses
              </li>
              <li className="practywiz-tnc-list-item">
                System-wide Accredited Businesses (excluding soliciting
                non-profits, charity shopping malls, and fundraising groups)
              </li>
            </ul>
            <p>
              Other organizations may request to link to our website under
              certain conditions:
            </p>
            <ul className="practywiz-tnc-list">
              <li className="practywiz-tnc-list-item">
                The link must not be deceptive.
              </li>
              <li className="practywiz-tnc-list-item">
                The link must not falsely imply sponsorship, endorsement, or
                approval.
              </li>
              <li className="practywiz-tnc-list-item">
                The link should fit within the context of the linking party’s
                site.
              </li>
            </ul>
            <p>
              We approve link requests from these organizations if we determine
              that:
            </p>
            <ul className="practywiz-tnc-list">
              <li className="practywiz-tnc-list-item">
                The link would not make us look unfavorably to ourselves or to
                our accredited businesses.
              </li>
              <li className="practywiz-tnc-list-item">
                The organization does not have any negative records with us.
              </li>
              <li className="practywiz-tnc-list-item">
                The benefit to us from the visibility of the hyperlink
                compensates the absence of Practywiz.
              </li>
            </ul>
            <p>
              No use of Practywiz’s logo or other artwork is allowed for linking
              without a trademark license agreement.
            </p>
          </div>
        </section>

        <section className="practywiz-tnc-section">
          <h2 className="practywiz-tnc-section-title">iFrames</h2>
          <div className="practywiz-tnc-content">
            <p>
              Without prior approval and written permission, you may not create
              frames around our webpages that alter the visual presentation or
              appearance in any way.
            </p>
          </div>
        </section>

        <section className="practywiz-tnc-section">
          <h2 className="practywiz-tnc-section-title">Content Liability</h2>
          <div className="practywiz-tnc-content">
            <p>
              We shall not be held responsible for any content that appears on
              your website. You agree to protect and defend us against all
              claims that are rising on your website. No link(s) should appear
              on any website that may be interpreted as libelous, obscene, or
              criminal, or which infringes, otherwise violates, or advocates the
              infringement or other violation of any third-party rights.
            </p>
          </div>
        </section>

        <section className="practywiz-tnc-section">
          <h2 className="practywiz-tnc-section-title">Privacy Policy</h2>
          <p>
            Please read our Privacy Policy at
            <a href="/legal/privacy-policy" className="practywiz-tnc-link">
              {" "}
              Privacy Policy
            </a>
          </p>
        </section>

        <section className="practywiz-tnc-section">
          <h2 className="practywiz-tnc-section-title">Reservation of Rights</h2>
          <div className="practywiz-tnc-content">
            <p>
              We reserve the right to request that you remove all links or any
              particular link to our website. You approve to immediately remove
              all links to our website upon request. We also reserve the right
              to amend these terms and conditions and its linking policy at any
              time. By continuously linking to our website, you agree to be
              bound to and follow these linking terms and conditions.
            </p>
          </div>
        </section>

        <section className="practywiz-tnc-section">
          <h2 className="practywiz-tnc-section-title">Removal of Links</h2>
          <div className="practywiz-tnc-content">
            <p>
              If you find any link on our website that is offensive for any
              reason, you are free to contact and inform us at any moment. We
              will consider requests to remove links but we are not obligated to
              do so or to respond to you directly.
            </p>
            <p>
              We do not ensure that the information on this website is correct,
              we do not warrant its completeness or accuracy; nor do we promise
              to ensure that the website remains available or that the material
              on the website is kept up to date.
            </p>
          </div>
        </section>

        <section className="practywiz-tnc-section">
          <h2 className="practywiz-tnc-section-title">Disclaimer</h2>
          <p>
            To the maximum extent permitted by applicable law, we exclude all
            representations, warranties, and conditions relating to our website
            and the use of this website. Nothing in this disclaimer will:
          </p>
          <ul className="practywiz-tnc-list">
            <li className="practywiz-tnc-list-item">
              Limit or exclude our or your liability for death or personal
              injury.
            </li>
            <li className="practywiz-tnc-list-item">
              Limit or exclude our or your liability for fraud or fraudulent
              misrepresentation.
            </li>
            <li className="practywiz-tnc-list-item">
              Limit any of our or your liabilities in a way not permitted under
              applicable law.
            </li>
            <li className="practywiz-tnc-list-item">
              Exclude any liabilities that cannot be excluded under applicable
              law.
            </li>
          </ul>
        </section>

        <section className="practywiz-tnc-section">
          <h2 className="practywiz-tnc-section-title">Contact Us</h2>
          <div className="practywiz-tnc-content">
            <p>
              For any questions about these Terms & Conditions, please contact
              us at{" "}
              <a
                href="mailto:wecare@practywiz.com"
                className="practywiz-tnc-link"
              >
                wecare@practywiz.com
              </a>
              .{" "}
            </p>
            <p>All Rights Reserved. Copyright Practywiz.</p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default TermsConditions;
