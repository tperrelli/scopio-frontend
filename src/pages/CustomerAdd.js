import React, { useState } from 'react';
import { Container, Button, Form, Row, Col } from 'react-bootstrap';
import SearchCustomer from '../components/SearchCustomer';
import { useQuery, gql } from "@apollo/client";

const ALL_CUSTOMERS = gql`
query {
  allCustomers {
    firstName
    lastName
    email
    role
  }
}`;

const CustomerAdd = () => {

  const [values, setValues] = useState('');
  const [firstName, setFisrtName] = useState('');
  const [lastName, setLastName] = useState('');
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [plan, setPlan] = useState('');

  const { loading, error, data } = useQuery(ALL_CUSTOMERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const customerOptions = data.allCustomers.map(function(item) {
      return { label: item.firstName + ' ' + item.lastName };
  });

  const handleChangeValues = (value) => {

      setValues(prevValue => ({
          ...prevValue,
          [value.target.name]: value.target.value,
      }));
  };

  const onChange = (event, selected) => {

    if (selected !== null) {

      let selectedObject = data.allCustomers.find(c => c.firstName + ' ' + c.lastName === selected.label);

      if (selectedObject !== null) {
        setFisrtName(selectedObject.firstName);
        setLastName(selectedObject.lastName);
        setEmail(selectedObject.email);
        setRole(selectedObject.role);
        setPlan(selectedObject.plan);
      }
    }
  }

  const handleSubmit = async e => {
      e.preventDefault();
      // submit customer   
  };

  return (
    <Container className="container">
      <Row>
        <Col className="mt-5 mb-3">
          <Form.Label>Search</Form.Label>
          <SearchCustomer options={customerOptions} onChange={onChange} />
        </Col>
      </Row>

      <Form onSubmit={ handleSubmit }>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="formFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                name="firstName"
                placeholder="First Name" 
                value={firstName}
                onChange={handleChangeValues}
              />
            </Form.Group>  
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="formLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control 
                name="lastName"
                placeholder="Last Name"
                value={lastName}
                onChange={handleChangeValues}
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group className="mb-3" controlId="formRole">
          <Form.Label>Role</Form.Label>
          <Form.Control 
            name="role"
            placeholder="Role" 
            value={role}
            onChange={handleChangeValues}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>E-mail</Form.Label>
          <Form.Control 
            name="email"
            placeholder="E-mail"
            value={email}
            onChange={handleChangeValues}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formSubscriptionPlan">
          <Form.Label>Subscription Plan</Form.Label>
          <Form.Select 
            name="plan"
            placeholder="Subscription Plan"
            value={plan}
            onChange={handleChangeValues}
          >
            <option>SELECT</option>
          </Form.Select>
        </Form.Group>

        <Form.Group controlId="formButton">
          <Button 
            type="submit" 
            variant="primary"
            >
            Add Customer
          </Button>
        </Form.Group>
      </Form>
    </Container>
  )
}

export default CustomerAdd;