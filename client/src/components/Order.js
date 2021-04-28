import React, {useRef, useState} from 'react';
import { Card, Button, Form, ListGroup, ListGroupItem } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import moment from 'moment';

export default function Order({location }) {
    const ordertitle = useRef();
    const orderdate = useRef();
    const history = useHistory();
    const [editState, setEditState] = useState(false);
    const [isFormDirty, setIsFormDirty] = useState(false);
    const orderId = location.orderId;
    let order = location.orderDetails;
    if (!order) history.push('/orders');

    async function handleSubmit(e) {
        e.preventDefault();
        let newOrder = await axios.put('http://localhost:5000/orders/' + orderId, {bookingDate: orderdate.current.value, orderTitle: ordertitle.current.value});
        newOrder = newOrder.data;
        order = newOrder;
        history.push('/orders');
    }

    function handleFormChange() {
        if (ordertitle.current.value !== order.title || orderdate.current.value !== order.bookingDate) setIsFormDirty(true);
        if (ordertitle.current.value === order.title && orderdate.current.value === order.bookingDate) setIsFormDirty(false);
    }


    if (editState) {
        return (
            <>
            <h2 className="mb-4">Edit Order</h2>
            <Card>
                <Card.Body>
                    <Form onSubmit={handleSubmit} onChange={handleFormChange}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Order Title</Form.Label>
                            <Form.Control type="text" ref={ordertitle} defaultValue={order.title}/>
                            
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Booking Date</Form.Label>
                            <Form.Control type="date" ref={orderdate} defaultValue={moment.utc(order.bookingDate).format('YYYY-MM-DD')}/>
                        </Form.Group>
                        <Button variant="outline-primary" type="submit" style={{'marginRight': '10px'}} disabled={!isFormDirty}>
                            Submit
                        </Button>
                        <Button onClick={() => setEditState(!editState)} variant="outline-danger">Cancel</Button>
                    </Form>
                </Card.Body>
            
            </Card>
            
            </>
        )
    } else if (order){
        return (
            
            <div>
                <h2 className="mb-4">Order</h2>
                <Card style={{  }}>
                    <Card.Header><strong>Title: </strong>{order.title}</Card.Header>
                    <Card.Body>
                        {/* <Card.Title><strong>Title: </strong>{order.title}</Card.Title> */}
                        <Card.Text><strong>Booking Date: </strong>{order.bookingDate}</Card.Text>
                        <Card.Text><strong>Address: </strong>{order.formattedAddress}</Card.Text>
                        <Card.Text><strong>Customer: </strong></Card.Text>
                        <ListGroup className="list-group-flush">
                            <ListGroupItem><strong>Name: </strong>{order?.customer?.name}</ListGroupItem>
                            <ListGroupItem><strong>Email: </strong>{order?.customer?.email}</ListGroupItem>
                            <ListGroupItem><strong>Phone: </strong>{order?.customer?.phone}</ListGroupItem>
                        </ListGroup>
                        <Button onClick={() => setEditState(!editState)} className="float-right" variant="outline-primary">Edit</Button>
                    </Card.Body>

                </Card>
            </div>
        )
    } else {
        return(
            <h1>No orders</h1>
        )
    }
    
}
