import React, {Component} from 'react';
import {Doughnut} from "react-chartjs-2";


class Dashboard2 extends Component {

    constructor(props) {
        super(props);
        this.state = { persons: [] } ;
    }

    componentDidMount() {
        fetch('http://localhost:8888/dcdev/expanseshare/expanshare-back/public/person/group/' + this.props.slug)
            .then(response => response.json())
            .then(data => this.setState({persons: data}))

        ;

    }



    render() {

        const data = {
            labels: [1, 2, 3],
            datasets: [
                {
                    label: 'Temperature',
                    data: [1, 12, 13, 213],
                    fill: false,          // Don't fill area under the line
                    borderColor: 'green'  // Line color
                }
            ]
        };



        return (
            <div>
                <Doughnut data={data}/>
            </div>
        );
    }
}

export default Dashboard2;