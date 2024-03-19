import React from "react";
import { Row } from "reactstrap";

//Import Image
import thubLogo from "../../assets/images/th-logo.png";

const Dashboard = () => {
  return (
    <React.Fragment>
      <div className="page-content">
        <Row>
          <div className="col-12">
            <div className="page-title-box d-flex align-items-center justify-content-between">
              <h4 className="page-title mb-0 font-size-18">Dashboard</h4>

              <div className="page-title-right">
                <ol className="breadcrumb m-0">
                  <li className="breadcrumb-item active">
                    Welcome to Technical Hub Expenditure Dashboard
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </Row>
        <Row
          className="justify-content-center align-items-center"
          style={{
            height: "60vh",
            backgroundImage: `url(${thubLogo})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            opacity: 0.3
          }}
        ></Row>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
