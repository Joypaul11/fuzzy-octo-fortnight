import React, { useEffect, useState } from 'react'
import { ListGroup, ListGroupItem, Button } from 'react-bootstrap'
import axios from 'axios';
import moment from 'moment';
import { useHistory } from "react-router-dom"

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
                    <ListGroupItem action onClick={() => history.push({
                        pathname: '/orders/' + x,
                        orderId: x,
                        orderDetails: result.data[x]
                        })} key={x}>
                        <strong>Title: </strong>{result.data[x].title} <br/>
                        <strong>Booking Date: </strong> {moment.utc(result.data[x].bookingDate).format('DD-MM-YYYY')} <br/>
                        
                    </ListGroupItem>
                    )
                }
            }
            setOrders(allOrders);
        }
        fetchData();
    }, [])

    return (
        <>
        <h1>Orders</h1>
        <ListGroup>
            {orders}
        </ListGroup>
        <Button variant="link" onClick={() => history.push('/')}>
            Go home
        </Button>
        </>
    )
}
