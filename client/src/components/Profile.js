import React,  { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { useAuth } from "../contexts/AuthContext";

export default function Profile() {
    const { currentUser, getUserDetails } = useAuth();
    const [user, setUser] = useState({});

    useEffect(() => {
        getUserDetails(currentUser.uid)
        .then(data => {
            setUser(data);
        })
    }, [])

    return (
        <>
            <h2 className="mb-4">Profile</h2>
            <Card>
                <Card.Body>
                    
                    <strong>Name:</strong> {user.name} <br/>
                    <strong>Email:</strong> {user.email} <br/>
                    <strong>Phone: </strong> {user.phone}
                </Card.Body>
            </Card>
        </>
    )
}
