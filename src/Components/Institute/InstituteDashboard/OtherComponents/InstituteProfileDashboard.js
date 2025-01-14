import React, { useState, useEffect } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
// import axios from "axios";
// import { ApiURL } from "../../../../Utils/ApiURL";
import "../DashboardCSS/InstituteProfileDashboard.css";
import "swiper/css";
import "swiper/css/navigation";

const InstituteProfileDashboard = () => {
  //Demo data
  const Data = {
    success: {
      instituteName: "Indian Institute of Management (IIM) Lucknow",
      studentRegistered: 600,
      mentorSessionsCompleted: 235,
      guestLecturesCompleted: 108,
      upcomingSessions: 37,
      barChartData: {
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apl",
          "May",
          "Jun",
          "July",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        datasets: [
          {
            label: "Mentor",
            data: [200, 300, 400, 100, 200, 300, 400, 100, 200, 300, 400, 100],
            backgroundColor: "#0255ca",
            borderWidth: 1,
          },
          {
            label: "session Completed",
            data: [250, 200, 300, 500, 100, 200, 300, 400, 100, 200, 300, 400],
            backgroundColor: "#00ccce",
            borderWidth: 1,
          },
          {
            label: "Next session",
            data: [350, 500, 800, 100, 200, 300, 400, 100, 200, 300, 400, 100],
            backgroundColor: "#244e8a",
            borderWidth: 1,
          },
        ],
      },
      alumniData: [
        { name: "Tushar Khanagwal", role: "Software Engineer", avatar: "TK" },
        { name: "Aman Choudhary", role: "Software Engineer", avatar: "AC" },
        { name: "Gagan Verma", role: "Data Scientist", avatar: "GV" },
        { name: "Ankit Singh", role: "Product Manager", avatar: "AS" },
        { name: "Raghv Verma", role: "Software Engineer", avatar: "RV" },
      ],
      pieChartData: {
        labels: ["Alumni", "Students"],
        datasets: [
          {
            label: "Total Percentage Alumni",
            data: [75, 25],
            backgroundColor: ["#00ccce", "#f0f0f0"],
            hoverBackgroundColor: ["#00ccce", "#f0f0f0"],
            borderWidth: 1,
          },
        ],
      },
    },
  };

  const [dashboardData, setDashboardData] = useState({});

  useEffect(() => {
    setDashboardData(Data.success); // Simulate fetching data from API
  }, []);

  if (
    !dashboardData.instituteName ||
    !dashboardData.studentRegistered ||
    !dashboardData.mentorSessionsCompleted ||
    !dashboardData.guestLecturesCompleted ||
    !dashboardData.upcomingSessions ||
    !dashboardData.barChartData ||
    !dashboardData.alumniData ||
    !dashboardData.pieChartData
  ) {
    return <div>Loading...</div>;
  }

  // Data for bar chart and pie chart
  const barChartData = dashboardData.barChartData || { datasets: [] };
  const pieChartData = dashboardData.pieChartData || { datasets: [] };

  // Calculate max y value for bar chart
  const allData = barChartData.datasets.flatMap((dataset) => dataset.data);
  const maxValue = Math.max(...allData);
  const yMax = maxValue + 100;

  const barChartOptions = {
    plugins: {
      legend: { position: "top" },
      tooltip: { enabled: true },
    },
    responsive: true,
    maintainAspectRatio: false,
    devicePixelRatio: 2,
    scales: {
      x: { beginAtZero: true },
      y: { beginAtZero: true, suggestedMax: yMax },
    },
  };

  const pieChartOptions = {
    cutout: "70%",
    plugins: {
      legend: { display: false },
    },
  };

  return (
    <>
      <div className="col-lg-10 ps-0">
        <div className="difuhtre_content">
          <div className="container-fluid px-5">
            <div className="gtyfdgfgf">
              <h2 className="institute-name">{dashboardData.instituteName}</h2>

              <div className="institute-main-content">
                <div className="institute-left-side">
                  <div className="institute-summary-cards">
                    <div className="institute-card">
                      <div className="institute-card-info">
                        <h2>{dashboardData.studentRegistered}</h2>
                        <p>students Registered</p>
                      </div>
                      <div className="institute-card-icon">
                        <i className="fa-solid fa-graduation-cap"></i>
                      </div>
                    </div>

                    <div className="institute-card">
                      <div className="institute-card-info">
                        <h2>{dashboardData.mentorSessionsCompleted}</h2>
                        <p>Mentor sessions completed</p>
                      </div>
                      <div className="institute-card-icon">
                        <i className="fa-solid fa-list-check"></i>
                      </div>
                    </div>

                    <div className="institute-card">
                      <div className="institute-card-info">
                        <h2>{dashboardData.guestLecturesCompleted}</h2>
                        <p>Guest Lectures Completed</p>
                      </div>
                      <div className="institute-card-icon">
                        <i className="fa-solid fa-chalkboard-teacher"></i>
                      </div>
                    </div>

                    <div className="institute-card">
                      <div className="institute-card-info">
                        <h2>{dashboardData.upcomingSessions}</h2>
                        <p>Upcoming sessions next week</p>
                      </div>
                      <div className="institute-card-icon">
                        <i className="fa-solid fa-calendar-week"></i>
                      </div>
                    </div>
                  </div>

                  <div className="institute-bar-chart">
                    <h3>Mentorship Sessions Overview</h3>
                    <div className="institute-chart-container">
                      <Bar
                        className="institute-bar-chart-canva"
                        data={barChartData}
                        options={barChartOptions}
                      />
                    </div>
                  </div>
                </div>

                <div className="institute-right-side">
                  <div className="institute-top-alumni">
                    <h3>Top 5 Alumni</h3>
                    <ul>
                      {dashboardData.alumniData.map((alumnus, index) => (
                        <li key={index}>
                          <div className="intitute-alumni-avatar">
                            {alumnus.avatar}
                          </div>
                          <div className="institute-alumni-names">
                            <span className="institute-alumni-name">
                              {alumnus.name}
                            </span>
                            <span className="institute-alumni-designation">
                              {alumnus.role}
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="institute-percentage-alumni">
                    <h3>Total Percentage Alumni</h3>
                    <div className="institute-circle-chart">
                      <Doughnut data={pieChartData} options={pieChartOptions} />
                      <div className="institute-percentage">75%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
    // <>
    //   <div className="col-lg-10 ps-0">
    //     <div className="difuhtre_content">
    //       {/* <div className="dfknhguyfdgf"> */}
    //       <div className="container-fluid px-5">
    //         <div className="gtyfdgfgf">
    //           <div className="col-lg-8">
    //             <div className="ndfhjvdfv">
    //               <h2> Indian Institute of Management (IIM) Lucknow</h2>

    //               {/* <div className="fhghgdgg">
    //                 <h3>
    //                   <i className="fa-solid me-2 fa-sign-hanging"></i> Est. 2006
    //                 </h3>
    //               </div> */}
    //             </div>
    //           </div>
    //           <div className="container_intdashboard">
    //             <div className="item_intdashboard bg-img bg1">
    //               <i className="fa-solid fa-graduation-cap iconsize"></i>
    //               <h3 className="text-1"> students Registered</h3>
    //               <div className="valuedash text-1">600</div>
    //             </div>
    //             <div className="item_intdashboard bg-img bg2">
    //               <i className="fa-solid fa-list-check iconsize"></i>
    //               <h3 className="text-1 "> Mentor sessions completed</h3>{" "}
    //               <div className="valuedash text-1">235</div>
    //             </div>
    //             <div className="item_intdashboard bg-img bg3">
    //               <i className="fa-solid fa-calendar-week iconsize"></i>
    //               <h3 className="text-1"> Upcoming sessions in next week</h3>
    //               <div className="valuedash text-1">37</div>
    //             </div>
    //           </div>

    //           <div className="container_intdashboard">
    //             <div className="item_intdashboard bg-img bg1">
    //               <i className="fa-solid fa-graduation-cap iconsize"></i>
    //               <h3 className="text-1"> Top 5 Alumns</h3>
    //               <div style={{ fontSize: "1rem" }}>
    //                 <div className="text-2">Aman Choudhary</div>
    //                 <div className="text-2">Gagan Verma</div>
    //                 <div className="text-2">Ankit Singh</div>
    //                 <div className="text-2">Raghv Verma</div>
    //                 <div className="text-2">Govind Raj</div>
    //               </div>
    //             </div>
    //             <div className="item_intdashboard bg-img bg2">
    //               <i className="fa-solid fa-percent iconsize"></i>
    //               <h3 className="text-1 "> Percentage Of Total Alumns</h3>{" "}
    //               <div className="valuedash text-1">75%</div>
    //             </div>
    //             <div className="item_intdashboard bg-img bg3">
    //               <i className="fa-solid fa-calendar-week iconsize"></i>
    //               <h3 className="text-1"> Guest Lectures Completed</h3>
    //               <div className="valuedash text-1">108</div>
    //             </div>
    //           </div>
    //           <br />
    //           <br />

    //           <div className="animation">
    //             <Bar
    //               data={{
    //                 labels: [
    //                   "Jan",
    //                   "Feb",
    //                   "Mar",
    //                   "Apl",
    //                   "May",
    //                   "Jun",
    //                   "July",
    //                   "Aug",
    //                   "Sep",
    //                   "Oct",
    //                   "Nov",
    //                   "Dec",
    //                 ],
    //                 datasets: [
    //                   {
    //                     label: "Mentor",
    //                     data: [200, 300, 400],
    //                   },
    //                   {
    //                     label: "session Completed",
    //                     data: [250, 200, 300],
    //                   },
    //                   {
    //                     label: "Next session",
    //                     data: [350, 500, 800],
    //                   },
    //                 ],
    //               }}
    //             />
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </>
  );
};

export default InstituteProfileDashboard;
