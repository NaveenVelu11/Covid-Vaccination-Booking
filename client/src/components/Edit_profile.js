import React, { useState, useEffect } from "react";
import { Post } from './Api.js';
import { Form, Container, Button, Row, Col } from "react-bootstrap";

function EditProfile() {
    const [user, setUser] = useState({});
    const [updatedUser, setUpdatedUser] = useState({});

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            const user_id = localStorage.getItem("user_id");
            const requrl = "/my_profile";
            const reqbody = { user_id };
            const response = await Post(requrl, reqbody);
            setUser(response.data.user);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedUser({ ...updatedUser, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const requrl = "/update_profile";
            const response = await Post(requrl, updatedUser);
            // Handle success response
            console.log("Profile updated successfully:", response.data);
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    return (
        <Container fluid>
            <Row className="justify-content-md-center">
                <Col xs lg="6">
                    <div className="mt-5">
                        <h2>Edit Profile</h2>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="first_name"
                                    value={updatedUser.first_name || user.first_name || ''}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                            {/* Add similar Form.Group for other fields (last name, email, phone, etc.) */}
                            <Button variant="primary" type="submit">
                                Save Changes
                            </Button>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default EditProfile;
