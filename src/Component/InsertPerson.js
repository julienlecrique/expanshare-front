import React, {Component} from 'react';
import {FormGroup, Input, Button, Form} from "reactstrap";

class InsertPerson extends Component {


    constructor(props) {
        super(props);
        this.state = { firstname: "", lastname: ""};
    }

    handleChange(event) {
        event.preventDefault();
        const column = event.target.name;

        this.setState({
            [column]: event.target.value});

    }

    handleCreate(event) {
        event.preventDefault();
        fetch('http://localhost:8888/dcdev/expanseshare/expanshare-back/public/person/', {
            method: 'POST',
            body: JSON.stringify({ firstname: this.state.firstname, lastname: this.state.lastname, slug: this.props.slug })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                alert('Nouvelle personne créé avec succès !');
                    this.props.callBack(JSON.parse(data));
            })
            .catch(err => alert('Erreur lors de l\'ajout d\'une personne'))
        ;
    }

    render() {
        return (
            <div>
                <Form className=''>
                    <FormGroup className='mb-3'>
                        <Input className='mb-5 text-center w-50 inputt' type="text" name="lastname" value={this.state.value} onChange={e => this.handleChange(e)} placeholder="Nom">
                        </Input>
                        <Input className='mb-5 text-center w-50 inputt' type="text" name="firstname" value={this.state.value} onChange={e => this.handleChange(e)} placeholder="Prenom">
                        </Input>
                        <div className=' '>
                            <Button color="primary" size="lg" className="mr-3 butt1" onClick={e => this.handleCreate(e)}>Créer</Button>{' '}
                        </div>
                    </FormGroup>
                </Form>
            </div>
        );
    }
}

export default InsertPerson;