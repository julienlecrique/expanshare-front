import React, {Component} from 'react';
import {Navbar, NavbarBrand, Nav, NavItem, Collapse} from "reactstrap";
import { NavLink} from "react-router-dom";
import './Menu.css';

import Container from "reactstrap";

class Menu extends Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }


    render() {
        return (
            <Navbar expand="md" className="header">
                <NavbarBrand>
                    <NavLink to="/" className="nav-link" ><img src={require('./../ES2.png')} alt="l" className="image" /></NavLink>

                </NavbarBrand>





                <Collapse isOpen={true} navbar>
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <NavLink to={this.props.url} className="nav-link">Dashboard</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink to={this.props.url + '/expenses'} className="nav-link">Dépenses</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink to={this.props.url + '/persons'} className="nav-link">Personnes</NavLink>
                    </NavItem>
                </Nav>
            </Collapse>
            </Navbar>
        );
    }
}

export default Menu;