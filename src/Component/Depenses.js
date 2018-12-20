import React, {Component} from 'react';
import {Badge, Button, Table} from "reactstrap";
import {Route} from "react-router";
import {NavLink} from "react-router-dom";
import Form from "./Form";
import Personnes from "./Personnes";
import Moment from 'react-moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'



class Depenses extends Component {

    constructor(props) {
        super(props);
        this.state = { expenses: [] } ;
    }

    componentDidMount() {
        fetch('http://localhost:8888/dcdev/expanseshare/expanshare-back/public/expense/group/' + this.props.slug , {
            method: 'GET',
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        })
            .then(response => response.json())
            .then(data => this.setState({ expenses: data}))
    }

    handleDelete(id) {
        fetch('http://localhost:8888/dcdev/expanseshare/expanshare-back/public/expense/', {
            method: 'DELETE',
            body: JSON.stringify({id:id})
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                alert('dépense supprimée avec succès !');
            })
            .catch(err => alert('Erreur lors de la suppression d\'une dépense'))
        ;
    }


    render() {

        const depenses = this.state.expenses.map(expense =>


                <tr key={expense.id}>
                    <td>{expense.title}</td>
                    <td><Badge color="primary"><FontAwesomeIcon icon={expense.category.icon}/></Badge>  {expense.category.label}</td>
                    <td>{expense.person.lastname} {expense.person.firstname}</td>
                    <td>{parseFloat(expense.amount)} €</td>
                    <td><Moment format="DD/MM/YYYY">{expense.createdAt}</Moment></td>
                    <td><button onClick={e=>this.handleDelete(expense.id)}>Supprimer</button></td>
                </tr>



        );

        return (
            <div>
                <NavLink className="mt-3 mb-3 btn btn-light" to={this.props.match.url + '/expenses/add'}><FontAwesomeIcon icon="plus"/>   Ajouter une dépense</NavLink>
                <Route path={this.props.match.url + '/expenses/add'} render={props => <Form {...props} slug={this.props.slug}/>}/>
                <Table light className="mt-1 text-center">
                    <thead>
                    <tr>
                        <th>Titre</th>
                        <th>Catégorie</th>
                        <th>Nom Prénom</th>
                        <th>Montant</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                {depenses}
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default Depenses;