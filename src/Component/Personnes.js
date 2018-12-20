import React, {Component} from 'react';
import './Personnes.css'
import {Button, Table} from "reactstrap";
import {Route} from "react-router";
import Form from "./Form";
import {NavLink} from "react-router-dom";
import InsertPerson from "./InsertPerson";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Moment from "react-moment";


class Personnes extends Component {

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

    handleDelete(id) {
        fetch('http://localhost:8888/dcdev/expanseshare/expanshare-back/public/person/', {
            method: 'DELETE',
            body: JSON.stringify({id: id})
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);

                alert('personne supprimée avec succès !');
            })
            .catch(err => alert('Erreur lors de la suppression d\'une personne'))
        ;
    }

    handleNewPerson(person) {
        let persons = this.state.persons;
        persons.push(person);
        console.log('after :', persons);
        this.setState({ persons: persons });
    }


    render() {

        const persons = this.state.persons.map(person => (


            <tr key={person.id}>
                <th scope="row">{person.lastname}</th>
                <td>{person.firstname}</td>
                <td>{person.expenses.length}</td>
                <td>{person.expenses.reduce((accumulator, expense) => accumulator + parseFloat(expense.amount), 0)}</td>
                <td>
                    <button onClick={e=>this.handleDelete(person.id)}> <FontAwesomeIcon icon="crosshairs"/> Kill</button>
                </td>
            </tr>



        ));


        return (
            <React.Fragment>

                <h2 className="titre">Liste des personnes</h2>
                <NavLink color="" size="lg" className="mt-2 btn btn-light" to={this.props.match.url + '/add'}><FontAwesomeIcon icon="plus"/>  Ajouter une personne</NavLink>{' '}
                <Route path={this.props.match.url + '/add'}  render={props => <InsertPerson {...props} callBack={this.handleNewPerson.bind(this)} slug={this.props.slug} /> }/>

                <Table light className="mt-1 text-center ">
                    <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Prénom</th>
                        <th>Nombre de dépenses</th>
                        <th>Total des dépenses</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {persons}
                    </tbody>
                </Table>

            </React.Fragment>
        );
    }
}

export default Personnes;