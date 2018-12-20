import React, {Component} from 'react';
import {Bar, Doughnut, Line, Pie, Radar} from 'react-chartjs-2';
import Menu from "./Menu";
import Container from "reactstrap";
import Depenses from "./Depenses";
import {Route} from "react-router";
import Personnes from "./Personnes";
import Dashboard2 from "./Dashboard/Dashboard2";

class DashBoard extends Component {

    constructor(props) {
        super(props);
        this.state = { expenses: [] } ;
    }

    componentDidMount() {
        fetch('http://localhost:8888/dcdev/expanseshare/expanshare-back/public/expense', {
            method: 'GET',
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        })
            .then(response => response.json())
            .then(data => this.setState({ expenses: data}))
    }



    render() {



        return (

            <div>
                <Menu url={this.props.match.url}/>
                <h4 className="titregroupe">Groupe : {this.props.match.params.slug}</h4>
                <Route path={this.props.match.url} exact component={Dashboard2}/>
                <Route path={this.props.match.url + '/expenses'} render={(props) => <Depenses {...props} slug={this.props.match.params.slug} /> } />
                <Route path={this.props.match.url + '/persons'} render={props => <Personnes {...props} slug={this.props.match.params.slug} /> } />

            </div>

        );
    }
}

export default DashBoard;