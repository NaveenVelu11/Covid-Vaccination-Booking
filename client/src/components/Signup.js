import React from "react";

import './Signup.css';
import { Country, State, City } from 'country-state-city';
import { useFormik } from "formik";
import * as Yup from 'yup';
import swal from 'sweetalert';
import {Post} from './Api.js'
import { Form, Container,Button, Row, Col} from "react-bootstrap";

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const RegistrationSchema = Yup.object().shape({
    First_name: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
    Last_name: Yup.string().min(1, 'Too Short!').max(50, 'Too Long!').required('Required'),
    Gender: Yup.string().required('Required'),
    email: Yup.string().email("Invalid email").required("Required"),
    Phone_no: Yup.string().min(10, 'Less then 10 digit').max(10, 'Grater than 10 digit')
        .matches(phoneRegExp, "Phone number is not valid")
        .required("Required"),
    aadhar: Yup.string().min(12, 'Less than 12 digit').max(12, 'Grater than 12 digit')
        .matches(phoneRegExp, "Phone number is not valid")
        .required("Required"),
    Date_of_birth: Yup.string().required('Required'),
    Infected: Yup.string().required('Required'),
    password: Yup.string()
        .required("Password is required")
        .min(6, "Password is too short - should be 6 chars minimum"),
    countr: Yup.string().required('Required'),
    stat: Yup.string().required('Required'),
    cit: Yup.string().required('Required'),
})
function Signup() {

    const formik = useFormik({
        initialValues: {
            First_name: "",
            Last_name: "",
            Gender: "",
            password: "",
            email: "",
            Phone_no: "",
            aadhar: "",
            Date_of_birth: "",
            Infected: "",
        },
        validationSchema: RegistrationSchema,
        onSubmit,
    });
    const rset = () => {
        formik.resetForm()
    }
    const country = JSON.stringify(Country.getAllCountries());
    const cdata = JSON.parse(country);
    
    const availableState = cdata.find((c) => c.name === formik.values.countr);
    const sisocode = availableState ? availableState.isoCode : undefined;
    const state = JSON.stringify(State.getStatesOfCountry(sisocode));
    const sdata = JSON.parse(state);

    const availableCities = sdata.find((c) => c.name === formik.values.stat);
    const cisocode = availableCities ? availableCities.isoCode : undefined;
    const city = JSON.stringify(City.getCitiesOfState(sisocode, cisocode));
    const citydata = JSON.parse(city);
    async function onSubmit() {
        const requrl="/register"
        const reqbody= formik.values
        const response= await Post(requrl,reqbody)

        if(response.data.status==='exist'){
            swal({
                title: "User alrady exist",
                icon: "error",
                button: "Retry"
            })
        }
        else{
            swal({
                title: "Sign Up Successfully!",
                icon: "success",
                button: "Login"
            })
                .then(function () { window.location = "/login" });
        }
        
       
    }

    return (
        <>
        <Container fluid>
        <Row  className="justify-content-md-center">
            <Col xs lg="7">
            <div id="signin"  className="mt-5">
                <h2>Sign up</h2>
                <Form onSubmit={formik.handleSubmit}>
                    <Form.Group className="mb-3" controlId="First_name" >
                        <Form.Label>First name</Form.Label>
                        <Form.Control type="text"
                            placeholder="First name"
                            value={formik.values.First_name}
                            onChange={formik.handleChange}
                            isInvalid={formik.errors.First_name}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.First_name}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="Last_name" >
                        <Form.Label>Last name</Form.Label>
                        <Form.Control type="text"
                            placeholder="Last name"
                            value={formik.values.Last_name}
                            onChange={formik.handleChange}
                            isInvalid={formik.errors.Last_name} />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.Last_name}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label>Gender</Form.Label><br />
                        <Form.Check type="radio" id="me" value="Male" name="Gender"
                            onChange={formik.handleChange}
                            isInvalid={formik.errors.Gender}
                            label="Male"
                        />
                        <Form.Check type='radio' id="fe" value="Female" name="Gender"
                            isInvalid={formik.errors.Gender}
                            onChange={formik.handleChange}
                            label="Female"
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.Gender}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            isInvalid={formik.errors.email} />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.email}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="Phone_no">
                        <Form.Label>Phone number</Form.Label>
                        <Form.Control type="number" placeholder="Phone number"
                            value={formik.values.Phone_no}
                            onChange={formik.handleChange}
                            isInvalid={formik.errors.Phone_no} />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.Phone_no}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="aadhar">
                        <Form.Label>Aadhar number</Form.Label>
                        <Form.Control type="number" placeholder="Aadhar number"
                            value={formik.values.aadhar}
                            onChange={formik.handleChange}
                            isInvalid={formik.errors.aadhar} />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.aadhar}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="Date_of_birth" >
                        <Form.Label>Date of birth</Form.Label>
                        <Form.Control type="date"
                            value={formik.values.Date_of_birth}
                            onChange={formik.handleChange}
                            isInvalid={formik.errors.Date_of_birth} />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.Date_of_birth}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="countr" >
                        <Form.Label>Country</Form.Label>
                        <Form.Select
                            value={formik.values.countr}
                            onChange={formik.handleChange}
                            isInvalid={formik.errors.countr}>
                            <option>country</option>
                            {cdata.map((value, key) => {
                                return (
                                    <option value={value.name} key={key} >
                                        {value.name}
                                    </option>
                                );
                            })}
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.countr}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="stat" >
                        <Form.Label>State</Form.Label>
                        <Form.Select
                            value={formik.values.stat}
                            onChange={formik.handleChange}
                            isInvalid={formik.errors.stat}>
                            <option>Select</option>
                            {sdata.map((value, key) => {
                                return (
                                    <option value={value.name} key={key} >
                                        {value.name}
                                    </option>
                                );
                            })}
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.stat}
                        </Form.Control.Feedback>
                    </Form.Group>
                    
                    <Form.Group className="mb-3" controlId="cit" >
                        <Form.Label>City</Form.Label>
                        <Form.Select id="cit"
                            value={formik.values.cit}
                            onChange={formik.handleChange}
                            isInvalid={formik.errors.cit}>
                            <option>Select</option>
                            {citydata.map((value, key) => {
                                return (
                                    <option value={value.name} key={key} >
                                        {value.name}
                                    </option>
                                );
                            })}
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.cit}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label>Previously infected with covid or not.</Form.Label><br />
                        <Form.Check type='radio' id="yes" value="Yes" name="Infected"
                            isInvalid={formik.errors.Infected}
                            onChange={formik.handleChange}
                            label="Yes" />
                        <Form.Check type='radio' id="no" value="No" name="Infected"
                            isInvalid={formik.errors.Infected}
                            onChange={formik.handleChange}
                            label="No" />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.Infected}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            isInvalid={formik.errors.password} />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.password}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <div className="text-center"> <Button variant="primary" style={{ backgroundColor: "#5B67CD",border:"#5B67CD" }} className="btn d-inline-block me-2" type="submit" >
                        Sign up
                    </Button>
                        <Button variant="primary" style={{ backgroundColor: "#5B67CD",border:"#5B67CD" }} className="btn d-inline-block" type="reset" onClick={rset} >
                            Reset
                        </Button>
                    <Form.Group>
                        <Form.Text className="ltext">
                            Already have an account? <a href="/login">Login</a>
                        </Form.Text>
                    </Form.Group></div>
                </Form>
            </div>
            </Col></Row></Container>
        </>
    )
}

export default Signup
