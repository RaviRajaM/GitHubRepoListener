import './App.css';
import React, { Fragment } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from "@material-ui/core/Button";
import NavBarComponent from "../src/NavBar/index"
class App extends React.Component {

  render() {
    return (
      <Fragment>
        <div className="container" lg="12" sm="12" md="12">
          <NavBarComponent />
        </div>
      </Fragment>
    )
  }
}

export default App;
