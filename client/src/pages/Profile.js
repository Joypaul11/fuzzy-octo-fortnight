import React from 'react';
import { Card } from 'react-bootstrap';

export default function Profile() {
    return (
        <>
            <Card>
            <Card.Body>
                <h2 className="text-center mb-4">Profile</h2>
                {/* {error && <Alert variant="danger">{error}</Alert>} */}
                <strong>Name:</strong> Username <br/>
                <strong>Email:</strong> Useremail
                {/* <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
                    Update Profile
                </Link> */}
            </Card.Body>
            </Card>
        </>
    )
}
