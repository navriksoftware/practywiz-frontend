import React from "react";
import "../InternshipCss/EmployerProfile.css";

const EmployerProfile = ({ data, employerDtlsId }) => {
  return (
    <>
      {data?.map((employer) => {
        console.log("This is emp data:", employer);
        return (
          <>
            <div className="emp-profile" key={employer.employer_user_dtls_id}>
              {/* Information Cards */}
              <div className="emp-profile_main">
                {/* Stats Section */}
                <div className="emp-profile_stats_section">
                  <h2 className="emp-profile_card-title">Quick Stats</h2>
                  <div className="emp-profile_stats">
                    <div className="emp-profile_stat-card">
                      <p className="emp-profile_stat-number">
                        {employer.total_active_internships_posts_count}
                      </p>
                      <p className="emp-profile_stat-label">Active Listing</p>
                    </div>
                    <div className="emp-profile_stat-card">
                      <p className="emp-profile_stat-number">
                        {employer.total_inactive_internships_posts_count}
                      </p>
                      <p className="emp-profile_stat-label">
                        In-Active Listing
                      </p>
                    </div>
                    <div className="emp-profile_stat-card">
                      <p className="emp-profile_stat-number">0</p>
                      <p className="emp-profile_stat-label">Hired</p>
                    </div>
                    <div className="emp-profile_stat-card">
                      <p className="emp-profile_stat-number">
                        {employer.total_internships_posts_count}
                      </p>
                      <p className="emp-profile_stat-label">Total Postings</p>
                    </div>
                  </div>
                </div>

                <div className="emp-profile_info-grid">
                  {/* Company Information */}
                  <div className="emp-profile_card">
                    <div className="orgFlex">
                      {" "}
                      <h2 className="emp-profile_card-title">
                        {employer.employer_organization_name}
                      </h2>
                      {employer.employer_organization_logo && (
                        <img
                          className="orgImageLogo"
                          src={employer.employer_organization_logo}
                          alt="company logo"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.style.display = "none";
                          }}
                        />
                      )}
                      {!employer.employer_organization_logo && (
                        <div className="emp-profile_orgLogo-fallback">
                          {employer.employer_organization_name
                            ?.charAt(0)
                            .toUpperCase()}
                        </div>
                      )}
                    </div>

                    <div className="emp-profile_card-content">
                      <div className="emp-profile_about">
                        <h3 className="emp-profile_subtitle">About Company</h3>
                        <p>{employer.employer_organization_desc}</p>
                      </div>
                      <div className="emp-profile_detail">
                        <i className="fas fa-building"></i>
                        <span>{employer.employer_organization_name}</span>
                      </div>
                      <div className="emp-profile_detail">
                        <i className="fas fa-globe"></i>
                        <span>{employer.employer_organization_website}</span>
                      </div>
                      <div className="emp-profile_detail">
                        <i className="fas fa-users"></i>
                        <span>{employer.employer_organization_no_of_emp}</span>
                      </div>
                      <div className="emp-profile_detail">
                        <i className="fas fa-map-marker-alt"></i>
                        <span>
                          {employer.employer_organization_location +
                            ", " +
                            employer.employer_organization_complete_address}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Personal Information */}
                  <div className="emp-profile_card">
                    <h2 className="emp-profile_card-title">
                      Personal Information
                    </h2>
                    <div className="emp-profile_card-content">
                      <div className="emp-profile_detail">
                        <i className="fas fa-address-book"></i>
                        <span>
                          {`${employer.employer_firstname} ${employer.employer_lastname}`}
                        </span>
                      </div>
                      <div className="emp-profile_detail">
                        <i className="fas fa-briefcase"></i>
                        <span>
                          {employer.employer_organization_designation}
                        </span>
                      </div>
                      <div className="emp-profile_detail">
                        <i className="fas fa-building"></i>
                        <span>{employer.employer_organization_name}</span>
                      </div>
                      <div className="emp-profile_detail">
                        <i className="fas fa-envelope"></i>
                        <span>{employer.employer_email}</span>
                      </div>
                      <div className="emp-profile_detail">
                        <i className="fas fa-phone"></i>
                        <span>{employer.employer_phone_number}</span>
                      </div>

                      <div className="emp-profile_detail">
                        <i className="fas fa-map-marker-alt"></i>
                        <span>
                          {employer.employer_organization_location +
                            ", " +
                            employer.employer_organization_complete_address}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      })}
    </>
  );
};

export default EmployerProfile;
