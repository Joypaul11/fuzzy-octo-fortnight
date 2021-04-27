import React, {useRef, useState} from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import { Link, useHistory } from "react-router-dom";
import axios from 'axios';
import moment from 'moment';

export default function Order({location }) {
    const ordertitle = useRef();
    const orderdate = useRef();
    const history = useHistory();
    const [editState, setEditState] = useState(false);
    console.log(location);
    const orderId = location.orderId;
    let order = location.orderDetails;
    if (!order) history.push('/orders');

    async function handleSubmit(e) {
        e.preventDefault()
        console.log(orderId, ordertitle.current.value, orderdate.current.value);
        let newOrder = await axios.put('http://localhost:5000/orders/' + orderId, {bookingDate: orderdate.current.value, orderTitle: ordertitle.current.value});
        newOrder = newOrder.data;
        order = newOrder;
        history.push('/orders');
    }


    if (editState) {
        return (
            <>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Order Title</Form.Label>
                    <Form.Control type="text" ref={ordertitle} defaultValue={order.title}/>
                    
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Booking Date</Form.Label>
                    <Form.Control type="date" ref={orderdate} defaultValue={moment.utc(order.bookingDate).format('YYYY-MM-DD')}/>
                </Form.Group>
                <Button variant="primary" type="submit" style={{'margin-right': '10px'}}>
                    Submit
                </Button>
                <Button onClick={() => setEditState(!editState)} >Cancel</Button>
            </Form>
            
            </>
        )
    } else if (order){
        return (
            
            <div>
                <h1>Order</h1>
                <Card style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title>TITLE: {order.title}</Card.Title>
                        <Card.Text>Booking Date: {order.bookingDate}</Card.Text>
                        <Button onClick={() => setEditState(!editState)} >Edit</Button>
                    </Card.Body>

                </Card>
                <div className="w-50 text-center mt-2">
                <Button variant="link" onClick={() => history.push('/orders')}>
                Orders
                </Button>
                <Button variant="link" onClick={() => history.push('/')}>
                Home
                </Button>
            </div>
            </div>
        )
    } else {
        return(
            <h1>No orders</h1>
        )
    }
    
}
