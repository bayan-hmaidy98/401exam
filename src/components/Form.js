import React, { Component } from 'react';
import { Form, Button, Modal } from 'react-bootstrap'

export class updatingForm extends Component {
    render() {
        return (
            <div>

                <Modal show = {this.props.show} onHide = {this.props.showingForm}>
                    <Modal.Header>
                        <Modal.Title>Modal title</Modal.Title>

                        <Form onSubmit={(event) => this.props.updateFruit(event)}> 
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Title</Form.Label>
                                <Form.Control type="text" name='title' defaultValue={this.props.updateObj.title} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Image</Form.Label>
                                <Form.Control type="text" name = 'image' defaultValue={this.props.updateObj.image} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Price</Form.Label>
                                <Form.Control type="number" name = 'price' defaultValue={this.props.updateObj.price} />
                            </Form.Group>

                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>

                    </Modal.Header>
                    <Modal.Footer>
                        <Button variant="primary" type = 'submit'>Update</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default updatingForm;
