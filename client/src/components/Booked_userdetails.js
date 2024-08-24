import React, { useState } from "react";
import { Form, Container, Button, Table, Row, Col } from "react-bootstrap";
import './Booked_userdetails.css'
import swal from 'sweetalert';
import { Post } from './Api.js'

function Booked_userdetails() {
    
    const [date, setdate] = useState();
    const [tabledata, settabledata] = useState([]);

    async function Search() {
        const requrl = "/Booked_userdetails"
        const reqbody = { date }
        const response = await Post(requrl, reqbody)


        if (response.data.details === "no data") {
            swal({
                title: "No user booked slot",
                icon: "warning",
                button: "Ok"
            })
            settabledata(response.data.details)
        }
        else {
            settabledata(response.data.details)
        }
    }
    return (
        <>
            <h2 id="user_details">Users deails</h2>
            <Container fluid>
                <Row className="justify-content mb-4 mt-3">
                    <Col xs lg="4">
                        <Form.Group controlId="search" >
                            <Form.Control type="date"
                                onChange={(e) => setdate(e.target.value)} />
                        </Form.Group>
                    </Col>
                    <Col xs lg="2">
                        <Button variant="primary" style={{ backgroundColor: "#5B67CD", border: "#5B67CD" }} className="btn" type="submit" onClick={Search}>
                            Search
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <Col xs lg="12" id="no-more-tables">
                        <Table striped bordered hover >
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Country</th>
                                    <th>State</th>
                                    <th>City</th>
                                    <th>Email</th>
                                    <th>Gender</th>
                                    <th>Phone no.</th>
                                    <th>Aadhar no.</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tabledata !== "no data" ?
                                    tabledata.map((e, i) => {
                                        return (
                                            <tr key={i.id}>
                                                {e.map((item) => (
                                                    <>
                                                        <td data-title="#">{i + 1}</td>
                                                        <td data-title="First Name">{item.first_name}</td>
                                                        <td data-title="Last Name">{item.last_name}</td>
                                                        <td data-title="Country">{item.country}</td>
                                                        <td data-title="State">{item.state}</td>
                                                        <td data-title="City">{item.city}</td>
                                                        <td data-title="Email">{item.email}</td>
                                                        <td data-title="Gender">{item.gender}</td>
                                                        <td data-title="Phone no.">{item.phone}</td>
                                                        <td data-title="Aadhar no.">{item.aadhar}</td>
                                                    </>
                                                ))}
                                            </tr>
                                        )
                                    }) : null
                                }
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>

        </>
    )

}
export default Booked_userdetails