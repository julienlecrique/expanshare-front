import React, {Component} from 'react';
import {Button, Form, FormGroup, Input, Label, Row} from "reactstrap";
import './GroupForm.css'
import {Redirect, Route} from "react-router";

class GroupForm extends Component {

    constructor(props) {
        super(props);
        this.state = { slug: "", sharegroup: null };
    }

    handleChange(event) {
        event.preventDefault();
        this.setState({ slug: event.target.value });
    }

    handleCreate(event) {
        event.preventDefault();
        fetch('http://localhost:8888/dcdev/expanseshare/expanshare-back/public/sharegroup/', {
            method: 'POST',
            body: JSON.stringify({ slug: this.state.slug })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                alert('Nouveau groupe créé avec succès !');
            })
            .catch(err => alert('Erreur lors de la création du groupe'))
        ;
    }

    handleOpen(event) {
        event.preventDefault();
        fetch('http://localhost:8888/dcdev/expanseshare/expanshare-back/public/sharegroup/' + this.state.slug)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.setState({ sharegroup: JSON.parse(data) });
            })
            .catch(err => alert('Ce groupe n\'existe pas !'))
        ;
    }

    render() {

        if (this.state.sharegroup) {
            return <Redirect to={'/group/' + this.state.sharegroup.slug}/>
        }

        return (

        <div className="home-banner">
            <div className='hb'>
                <h1 className="mt-3 titrees">Bienvenue sur €xpen$hare</h1>
                <h2 className='mb-3 mt-3'>Saisissez le nom de votre groupe</h2>
                <Form className=''>
                    <FormGroup className='mb-3'>
                        <Input className='mb-5 text-center w-50 inputt' type="text" name="groupId" value={this.state.slug} onChange={e => this.handleChange(e)} placeholder="Exemple: VacanceLondres...">
                        </Input>
                        <div className=' '>
                        <Button color="primary" size="lg" className="mr-3 butt1" onClick={e => this.handleCreate(e)}>Créer</Button>{' '}
                        <Button color="secondary" size="lg" className="butt2" onClick={e => this.handleOpen(e)}>Ouvrir</Button>{' '}
                        </div>
                        </FormGroup>
                </Form>
            </div>
        </div>

        );
    }
}

export default GroupForm;