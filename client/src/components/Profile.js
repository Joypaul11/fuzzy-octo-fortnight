import React,  { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";

export default function Profile() {
    const { currentUser, logout, getUserDetails } = useAuth();
    const [error, setError] = useState("");
    const history = useHistory();
    const [user, setUser] = useState({});

    async function handleLogout() {
        setError("")
        try {
          await logout()
          history.push("/login")
        } catch {
          setError("Failed to log out")
        }
    }

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
            <div className="w-100 text-center mt-2">
                <Button variant="link" onClick={() => history.push('/orders')}>
                Orders
                </Button>
                <Button variant="link" onClick={handleLogout}>
                Log Out
                </Button>
            </div>
        </>
    )
}
