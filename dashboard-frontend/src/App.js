import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import {
 AreaChart,
 Area,
 XAxis,
 YAxis,
 Tooltip,
 ResponsiveContainer,
 Legend,
 BarChart,
 Bar
} from "recharts";
import moment from "moment";
import numeral from "numeral";
import cubejs from "@cubejs-client/core";
import Chart from "./Chart.js";
import Sidebar from "./Sidebar.js";

const cubejsApi = cubejs(process.env.REACT_APP_CUBEJS_TOKEN, {
 apiUrl: process.env.REACT_APP_API_URL
});

const numberFormatter = item => numeral(item).format("0,0");
const dateFormatter = item => moment(item).format("MMM YY");

const renderSingleValue = (resultSet, key) => (
 <h1 height={300}>{numberFormatter(resultSet.chartPivot()[0][key])}</h1>
);

class App extends Component {

constructor() {
  super();
  this.dashboardLinks = [
    {
      "text": "Link One",
      "href": "#"
    },
    {
      "text": "Link Two",
      "href": "#"
    }
  ]
}

 render() {
   return (
     <Container fluid className="dashboard">
      <Row className="dashboard__row">
        <Col sm="2" className="dashboard__sidebar">
         <Sidebar title="Dashboard" linkList={this.dashboardLinks}></Sidebar>
        </Col>
        <Col sm="10" className="dashboard__main">
          <Container fluid>
            <Row>
              <h1 className="dashboard-title">MaveJira Dashboard</h1>
            </Row>
            <Row>
              <Col sm="4">
                <Chart
                  cubejsApi={cubejsApi}
                  title="Total Projects"
                  query={{ measures: ["Projects.count"] }}
                  render={resultSet => renderSingleValue(resultSet, "Projects.count")}
                />
              </Col>
              <Col sm="4">
                <Chart
                  cubejsApi={cubejsApi}
                  title="Active Projects"
                   query={{ dimensions: ["Projects.name"] }}
                   render={resultSet => renderSingleValue(resultSet, "Projects.name")}
                />
              </Col>
            </Row>
            <br />
            <br />
            <Row>
              <Col sm="6">
                <Chart
                  cubejsApi={cubejsApi}
                  title="New Users Over Time"
                  query={{
                    measures: ["Users.count"],
                    timeDimensions: [
                      {
                        dimension: "Users.createdAt",
                        dateRange: ["2017-01-01", "2018-12-31"],
                        granularity: "month"
                      }
                    ]
                  }}
                  render={resultSet => (
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={resultSet.chartPivot()}>
                        <XAxis dataKey="category" tickFormatter={dateFormatter} />
                        <YAxis tickFormatter={numberFormatter} />
                        <Tooltip labelFormatter={dateFormatter} />
                        <Area
                          type="monotone"
                          dataKey="Users.count"
                          name="Users"
                          stroke="rgb(106, 110, 229)"
                          fill="rgba(106, 110, 229, .16)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  )}
                />
              </Col>
              <Col sm="6">
                <Chart
                  cubejsApi={cubejsApi}
                  title="Orders by Status Over time"
                  query={{
                    measures: ["Orders.count"],
                    dimensions: ["Orders.status"],
                    timeDimensions: [
                      {
                        dimension: "Orders.createdAt",
                        dateRange: ["2017-01-01", "2018-12-31"],
                        granularity: "month"
                      }
                    ]
                  }}
                  render={resultSet => {
                    return (
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={resultSet.chartPivot()}>
                          <XAxis tickFormatter={dateFormatter} dataKey="x" />
                          <YAxis tickFormatter={numberFormatter} />
                          <Bar
                            stackId="a"
                            dataKey="shipped, Orders.count"
                            name="Shipped"
                            fill="#7DB3FF"
                          />
                          <Bar
                            stackId="a"
                            dataKey="processing, Orders.count"
                            name="Processing"
                            fill="#49457B"
                          />
                          <Bar
                            stackId="a"
                            dataKey="completed, Orders.count"
                            name="Completed"
                            fill="#FF7C78"
                          />
                          <Legend />
                          <Tooltip />
                        </BarChart>
                      </ResponsiveContainer>
                    );
                  }}
                />
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
   );
 }
}
export default App;