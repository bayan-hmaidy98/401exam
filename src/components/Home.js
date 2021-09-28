import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

import { withAuth0 } from "@auth0/auth0-react";
import {Row, Button, Card} from 'react-bootstrap';

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      fruits: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:3030/api').then(res => this.setState({ fruits: res.data.fruits })).catch(err => { alert(err) });
  }

  addToFav = (index) => { 
    const body = {
      title: this.state.fruits[index].title,
      image: this.state.fruits[index].image,
      price: this.state.fruits[index].price,
      email: this.props.auth0.user.email
    };
    axios.post('http://localhost:3030/addFruit', body).then(res => {})
  }

  render() {
    return (
      <>
        <h1>API Fruits</h1>

        <Row xs={2} md={3}>

          {this.state.fruits.length > 0 && this.state.fruits.map((fruit, idx) => {
            return (
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={fruit.image} />
                <Card.Body>
                  <Card.Title>{fruit.title}</Card.Title>
                  <Card.Text>
                    {fruit.price}
                  </Card.Text>
                  <Button onClick={() => this.addToFav(idx)} variant="primary">Add to favorites</Button>
                </Card.Body>
              </Card>
            )
          })}

        </Row>
      </>
    )
  }
}

export default withAuth0(Home);
