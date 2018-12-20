import React, {Component} from 'react';
import {FormGroup, Input, Button} from "reactstrap";



class Form extends Component {


    constructor(props) {
        super(props);
        this.state = { title:"", amount:"", categories: [], persons: [], category:null, person: null };
    }

    componentDidMount() {
        fetch('http://localhost:8888/dcdev/expanseshare/expanshare-back/public/category', {
            method: 'GET',
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        })
            .then(response => response.json())
            .then(data => this.setState({ categories: data}))

        fetch('http://localhost:8888/dcdev/expanseshare/expanshare-back/public/person/group/' + this.props.slug , {
            method: 'GET',
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        })
            .then(response => response.json())
            .then(data => this.setState({ persons: data}))
    }



    handleChange(event) {
        event.preventDefault();
        const column = event.target.name;

        this.setState({ [column]: event.target.value });
    }

    handleCreate(event) {
        event.preventDefault();
        fetch('http://localhost:8888/dcdev/expanseshare/expanshare-back/public/expense/', {
            method: 'POST',
            body: JSON.stringify({ title: this.state.title, amount: this.state.amount, category: this.state.category, person: this.state.person })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                alert('Nouvelle dépense créée avec succès !');
            })
            .catch(err => alert('Erreur lors de l\'ajout de la dépense'))
        ;
    }




    render() {

        const cat = this.state.categories.map(category =>

                <option key={category.id} value={category.id}>{category.label} </option>
        );
        const pers = this.state.persons.map(person=>

                <option key={person.id} value={person.id}>{person.firstname} {person.lastname}</option>
        );

        return (
            <div>
                <form className=''>
                    <FormGroup className='mb-3'>
                        <Input className='' type="text" name="title" value={this.state.title} onChange={e => this.handleChange(e)} placeholder="Saisissez le titre de la dépense">
                        </Input>
                        <Input className='' type="text" name="amount" value={this.state.amount} onChange={e => this.handleChange(e)} placeholder="Sélectionner le montant">
                        </Input>

                        <Input className='' type="select" name="category"  onChange={e => this.handleChange(e)} id="CategorySelect">
                            <option value="">Sélectionner la catégorie</option>
                        {cat}
                        </Input>
                        <Input className='' type="select" name="person"  onChange={e => this.handleChange(e)} id="PersonSelect">
                            <option value="">Sélectionner une personne</option>
                            {pers}
                        </Input>
                        <div className=' '>
                            <Button color="primary" size="lg" className="mr-3 mt-3 butt1" onClick={e => this.handleCreate(e)}>Créer</Button>{' '}
                        </div>
                    </FormGroup>
                </form>
            </div>
        );
    }
}

export default Form;