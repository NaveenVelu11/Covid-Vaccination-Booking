import React, { useState } from "react";
import './Signup.js';
import './Login.css';
import swal from 'sweetalert';
import { Post } from './Api.js';
import { Form, Container, Button, Row, Col } from "react-bootstrap";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function login(event) {
        event.preventDefault();
        const requrl = "/login";
        const reqbody = { email, password };
        const response = await Post(requrl, reqbody);

        if (response.data.status === "ok") {
            localStorage.setItem('user_id', response.data.user_id);
            swal({
                title: "Login Successfully!",
                icon: "success",
                button: "Ok"
            }).then(() => {
                window.location = "/dashboard";
            });
        } else {
            swal({
                title: "Username or password is invalid",
                icon: "error",
                button: "Retry"
            });
        }
    }

    return (
        <Container fluid>
            <Row className="justify-content-md-center">
                <Col xs lg="5">
                    <div id="login" className="mt-5">
                        <h2>Login</h2>
                        <Form onSubmit={login}>
                            <Form.Group className="mb-3">
                                <Form.Control
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <div className="text-center">
                                <Button
                                    variant="primary"
                                    style={{ backgroundColor: "#5B67CD", border: "#5B67CD" }}
                                    className="btn"
                                    type="submit"
                                >
                                    Login
                                </Button>
                                <Form.Group>
                                    <Form.Text className="texts">
                                        Don't have an account? <a href="/signin">Sign up</a>
                                    </Form.Text>
                                </Form.Group>
                            </div>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default Login;
