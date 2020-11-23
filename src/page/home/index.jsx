import React from "react";
import "./index.css";
import PageTitle from "component/pageTitle";

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="page-wrapper">
        <div id="page-inner">
          <PageTitle title="首页">
            <button className="btn btn-warning">test</button>
          </PageTitle>
        </div>
      </div>
    );
  }
}

export default Home;
