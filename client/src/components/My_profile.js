import React, { useEffect, useState } from "react"
import { Post } from './Api.js'
import { Card, Row, Container, Col, Button } from 'react-bootstrap'
import Book_slot from "./Book_slot.js"
import "./My_profile.css"
function My_profile() {
    const [slot, setslot] = useState([])
    const [user, setuser] = useState([])
    const user_id = localStorage.getItem("user_id")
    async function my_profile() {
        const requrl = "/my_profile"
        const reqbody = { user_id }
        const response = await Post(requrl, reqbody)
        console.log(response.data.user)
        response.data.user.map((e) => {
            setuser(e)
        })
        response.data.slot.map((e) => {
            setslot(e)
        })

    }
    useEffect(() => {
        my_profile()
    }, [])
    console.log(user)
    return (
        <>
            <div>
                <Container fluid>
                    <Row className="justify-content-md-center">
                        <Col xs lg="10">
                            <Card  className='disabled-link' >
                                <Card.Body disabled>
                                    <Card.Title> Name :{user.first_name + " " + user.last_name}</Card.Title>
                                    <Card.Text disabled> Aadhar number:{user.aadhar}</Card.Text>
                                    <Card.Text> Email id:{user.email}</Card.Text>
                                    <Card.Text> Phone number:{user.phone}</Card.Text>
                                    <Card.Text> Date of birth:{user.dob}</Card.Text>
                                    <Card.Text> Slot Date:{slot.slot_date}</Card.Text>
                                    <Card.Text>Slot ID :{slot.slot_id}</Card.Text>
                                    <Card.Text>Dose :{slot.dose}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>



            </div>
        </>)
}
export default My_profile