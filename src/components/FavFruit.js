import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

import { withAuth0 } from "@auth0/auth0-react";
import {Row, Button, Card} from 'react-bootstrap';
import Form from './Form';

class FavFruit extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      favFruit: [],
      showingForm: false,
      updateObj: {}
    }
  }

  displayUpdateForm = (element) => {
    this.setState({
      showingForm: true,  
      updateObj: element
    })
  }

  componentDidMount() {
    axios.get(`https://exam-backend401.herokuapp.com/favFruit?email=${this.props.auth0.user.email}`).then(res => this.setState({favFruit: res.data})).catch(err => { alert(err) });
  }

  updateFruit = (event) => { 
    let fruitId = this.state.updateObj._id;

    const body = {
      title: event.target.title.value,
      image: event.target.title.image,
      price: event.target.title.price,
    }

    axios.put(`https://exam-backend401.herokuapp.com/update/${fruitId}`, body).then(res => {
      const fruitArr = this.state.favFruit.map(f => {
        if(f._id === fruitId) {
          f.title = res.data.title;
          f.image = res.data.image;
          f.price = res.data.price;
          return f;
        }
        return f;
      })
      this.setState({
        showingForm: false,
        updateObj: {},
        favFruit: fruitArr
      })
    })
  }

  deleteFruit = (id) => {
    axios.delete(`https://exam-backend401.herokuapp.com/delete/${id}`).then((response) => {this.setState({favFruit: response.data})})
  }

  render() {
    return(
      <>
      <Form>
        show = {this.state.showingForm}
        showingForm = {this.displayUpdateForm}

        updateFruit = {this.updateFruit}
        updateObj = {this.state.updateObj}
      </Form>
        <h1>My Favorite Fruits</h1>

        <Row xs={2} md={3}>

          {this.state.favFruit.length > 0 && this.state.favFruit.map((fruit) => {
            return (
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={fruit.image} />
                <Card.Body>
                  <Card.Title>{fruit.title}</Card.Title>
                  <Card.Text>
                    {fruit.price}
                  </Card.Text>
                  <Button onClick={() => this.displayUpdateForm(fruit)} variant="primary">Update</Button>
                  <Button onClick={() => this.deleteFruit(fruit._id)} variant="danger">Delete</Button>
                </Card.Body>
              </Card>
            )
          })}

        </Row>
      </>
    )
  }
}

export default withAuth0(FavFruit);
