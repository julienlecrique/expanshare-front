import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Col, Container} from "reactstrap";
import GroupForm from "./Component/GroupForm";
import {Route} from "react-router";
import DashBoard from "./Component/DashBoard";
import './App.css';
import Menu from "./Component/Menu";
import Depenses from "./Component/Depenses";
import Personnes from "./Component/Personnes";
import { library } from '@fortawesome/fontawesome-svg-core'
import {faCoffee, faBed, faBicycle, faPlane, faPlus, faCross, faCrosshairs} from '@fortawesome/free-solid-svg-icons'

library.add(faCoffee, faBed, faBicycle, faPlane, faPlus, faCrosshairs);



class App extends Component {
  render() {
    return (

      <Container>
        <Route path="/"  exact component={GroupForm} />
        <Route path="/group/:slug"   component={DashBoard} />
      </Container>
    );
  }
}

export default App;
