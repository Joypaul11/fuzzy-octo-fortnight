import React, { useEffect, useState } from 'react'
import { ListGroup, ListGroupItem, Button } from 'react-bootstrap'
import axios from 'axios';
import { Link, useHistory } from "react-router-dom"

export default function OrderList(props) {
    const [orders, setOrders] = useState([])
    const history = useHistory()
    useEffect(() => {
        const fetchData = async() => {
            let result = await axios.get(
                'http://localhost:5000/orders',
              );
            let allOrders = [];
            for (let x in result.data) {
                if (typeof result.data[x] === 'object' && result.data[x].title) {
                
                    allOrders.push(
                    <ListGroupItem action onClick={() => showOrder(x, result.data[x])} key={x}>
                        <strong>Title: </strong>{result.data[x].title} <br/>
                        <strong>Booking Date: </strong> {result.data[x].bookingDate} <br/>
                        
                    </ListGroupItem>
                    )
                }
            }
            setOrders(allOrders);
        }
        fetchData();
    }, [])

    function goHome() {
        history.push('/');
    }

    function showOrder(orderId, orderDetails) {
        console.log(orderId, orderDetails);
        history.push({pathname: `/order/${orderId}`, orderId: orderId, orderDetails: orderDetails});
    }

    return (
        <>
        <h1>Orders</h1>
        <ListGroup>
            {orders}
        </ListGroup>
        <Button variant="link" onClick={goHome}>
        Go home
        </Button>
        </>
    )
}
