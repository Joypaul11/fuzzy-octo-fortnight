import React, { useEffect, useState } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import axios from 'axios';
import moment from 'moment';
import { useHistory } from "react-router-dom";

export default function OrderList(props) {
    const [orders, setOrders] = useState([]);
    const history = useHistory();
    useEffect(() => {
        const fetchData = async() => {
            let result = await axios.get(
                'http://localhost:5000/orders',
              );
            let allOrders = [];
            for (let x in result.data) {
                if (typeof result.data[x] === 'object' && result.data[x].title) {
                    const theOrder = arrangeOrderData(result.data[x]);
                    allOrders.push(
                    <ListGroupItem action onClick={() => history.push({
                        pathname: '/orders/' + x,
                        orderId: x,
                        orderDetails: result.data[x]
                        })} key={x}>
                        <strong>Title: </strong>{theOrder.title} <br/>
                        <strong>Booking Date: </strong> {theOrder.bookingDate} <br/>
                        <strong>Address: </strong> {theOrder.formattedAddress} <br/>
                    </ListGroupItem>
                    )
                }
            }
            setOrders(allOrders);
        }
        fetchData();
    }, [])

    const arrangeOrderData = (order) => {
        order.bookingDate = moment.utc(order.bookingDate).format('YYYY-MM-DD');
        if (order.bookingDate.includes('Invalid')) order.bookingDate= null;
        let orderAddress = null;
        if (order.address) orderAddress = `${order.address.street}, ${order.address.city}, ${order.address.country}, ${order.address.zip}`;
        order.formattedAddress = orderAddress;
        return order;
    }

    return (
        <>
        <h2 className="mb-4">Order List</h2>
        <ListGroup>
            {orders}
        </ListGroup>
        </>
    )
}
