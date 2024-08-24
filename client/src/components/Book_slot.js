import React, { useState } from "react";
import { Country, State, City } from 'country-state-city';
import { Form, Container,Button, Row, Col} from "react-bootstrap";
import './Book.css';
import swal from 'sweetalert';
import { useFormik } from "formik";
import * as Yup from 'yup';
import "react-datepicker/dist/react-datepicker.css";
import { Post } from './Api.js'

const RegistrationSchema = Yup.object().shape({

    country: Yup.string().required('Required'),
    state: Yup.string().required('Required'),
    city: Yup.string().required('Required'),
    dob1: Yup.string().required('Required'),
    slot: Yup.string().required('Required'),
    dose: Yup.string().required('Required'),
})
function Book_slot() {
    const formik = useFormik({
        initialValues: {
            dob1: "",
        },
        validationSchema: RegistrationSchema,
        onSubmit,

    });
    async function onSubmit(event) {
        const userid = localStorage.getItem('user_id')
        let body = formik.values;
        body = {
            ...body, id: userid
        }
        swal({
            title: "Are you confirm slot?",
            text: 'Country :' + body.country + "\nState : " + body.state + "\nCity : " + body.city +
                "\nDate : " + body.dob1 + "\nTime slot : " + body.slot + "\nDose : " + body.dose,
            icon: "warning",
            buttons: true,
            buttonsColor: '#5B67CD'
        })
            .then((wilbook) => {
                if (wilbook) {
                    swal("Your vaccination slot book successfully", {
                        icon: "success",
                    }).then(async function () {
                        const requrl = "/bookslot"
                        const reqbody = body
                        const response = await Post(requrl, reqbody)
                    
                        window.location = "/dashboard"
                    });
                } else {
                    swal("Select another details");
                }
            });

    }

    const country = JSON.stringify(Country.getAllCountries());
    const cdata = JSON.parse(country);

    const availableState = cdata.find((c) => c.name === formik.values.country);
    const sisocode = availableState ? availableState.isoCode : undefined;
    const state = JSON.stringify(State.getStatesOfCountry(sisocode));
    const sdata = JSON.parse(state);

    const availableCities = sdata.find((c) => c.name === formik.values.state);
    const cisocode = availableCities ? availableCities.isoCode : undefined;
    const city = JSON.stringify(City.getCitiesOfState(sisocode, cisocode));
    const citydata = JSON.parse(city);
    
    const disablePastDate = () => {
        const today = new Date();
        const dd = String(today.getDate() + 1).padStart(2, "0");
        const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
        const yyyy = today.getFullYear();
        return yyyy + "-" + mm + "-" + dd;
    };

    const [date, setdate] = useState([])
    
    const cap = 2
    async function capacity() {
        const date = formik.values.dob1
        const selet_country=formik.values.country
        const selet_state=formik.values.state
        const selet_city=formik.values.city
        const requrl = "/slotcapacity"
       
        const reqbody = {date,selet_country,selet_state,selet_city}
        const response = await Post(requrl, reqbody)
        
        setdate(response.data.capacity)
    }
    
let a
    const sl = ['8:00 to 8:15', "8:15 to 8:30", '8:30 to 8:45', '8:45 to 9:00', '9:00 to 9:15',
        '9:15 to 9:30', '9:30 to 9:45', '9:45 to 10:00', '10:00 to 10:15', '10:15 to 10:30',
        '10:30 to 10:45', '10:45 to 11:00', '11:00 to 11:15', '11:15 to 11:30', '11:30 to 11:45',
        '11:45 to 12:00', '1:00 to 1:15', '1:15 to 1:30', '1:30 to 1:45', '1:45 to 2:00', '2:00 to 2:15',
        '2:15 to 2:30', '2:30 to 2:45', '2:45 to 3:00', '3:00 to 3:15', '3:15 to 3:30', '3:30 to 3:45',
        '3:45 to 4:00', '4:00 to 4:15', '4:15 to 4:30', '4:30 to 4:45', '4:45 to 5:00', '5:00 to 5:15',
        '5:15 to 5:30', '5:30 to 5:45', '5:45 to 6:00', '6:00 to 6:15', '6:15 to 6:30', '6:30 to 6:45',
        '6:45 to 7:00', '7:00 to 7:15', '7:15 to 7:30', '7:30 to 7:45', '7:45 to 8:00']

    return (
        <>
        <Container fluid>
    <Row  className="justify-content-md-center">
        <Col xs lg="6">
            <div id="books"  className="mt-5">
                <h2>Book slot</h2>
                <div id="det">
                    <Form onSubmit={formik.handleSubmit}>
                        <Form.Group className="mb-3" controlId="country" >
                            <Form.Select
                                value={formik.values.country}
                                onChange={formik.handleChange}
                                isInvalid={formik.errors.country}>
                                <option>country</option>
                                {cdata.map((value, key) => {
                                    return (
                                        <option value={value.name} key={key} >
                                            {value.name}
                                        </option>
                                    );
                                })}
                            </Form.Select>
                            <Form.Control.Feedback id="feed" type="invalid">
                                {formik.errors.country}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="state" >
                            <Form.Select
                                value={formik.values.state}
                                onChange={formik.handleChange}
                                isInvalid={formik.errors.state}>
                                <option>State</option>
                                {sdata.map((value, key) => {
                                    return (
                                        <option value={value.name} key={key} >
                                            {value.name}
                                        </option>
                                    );
                                })}
                            </Form.Select>
                            <Form.Control.Feedback id="feed" type="invalid">
                                {formik.errors.state}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="city" >
                            <Form.Select
                                value={formik.values.city}
                                onChange={formik.handleChange}
                                isInvalid={formik.errors.city}>
                                <option>City</option>
                                {citydata.map((value, key) => {
                                    return (
                                        <option value={value.name} key={key} >
                                            {value.name}
                                        </option>
                                    );
                                })}
                            </Form.Select>
                            <Form.Control.Feedback id="feed" type="invalid">
                                {formik.errors.city}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="dob1" >
                            <Form.Control type="date"
                                min={disablePastDate()}
                                onSelect={capacity}
                                value={formik.values.dob1}
                                onChange={formik.handleChange}
                                isInvalid={formik.errors.dob1} />
                            <Form.Control.Feedback id="feed" type="invalid">
                                {formik.errors.dob1}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="slot" >
                            <Form.Select
                                value={formik.values.slot}
                                onChange={formik.handleChange}
                                isInvalid={formik.errors.slot}>
                                <option>Select slot</option>
                                {date.length !== 0 ?
                                    (date.map((value) => {
                                        a=cap-value.count
                                        if (value.count >= cap) {
                                           
                                            return (
                                                sl.map((val, k) => {
                                                    return (
                                                        <>
                                                            <option value={val} key={k}
                                                                disabled={val === value._id ? true : null}>
                                                                {val}{a}
                                                            </option>
                                                        </>
                                                    );
                                                })
                                            )
                                        }
                                        // else {
                                        //     return (
                                        //         sl.map((val, k) => {
                                        //             return (
                                        //                 <>
                                        //                     <option value={val} key={k}>

                                        //                         {val}


                                        //                     </option>
                                        //                 </>
                                        //             );
                                        //         })
                                        //     )
                                        // }
                                    }))
                                    : (
                                        sl.map((val, k) => {
                                            return (
                                                <>
                                                    <option value={val} key={k}>
                                                        {val}
                                                    </option>
                                                </>
                                            );
                                        })
                                    )
                                }
                            </Form.Select>
                            <Form.Control.Feedback id="feed" type="invalid">
                                {formik.errors.slot}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="dose" >
                            <Form.Select
                                value={formik.values.dose}
                                onChange={formik.handleChange}
                                isInvalid={formik.errors.dose}>
                                <option>Select dose</option>
                                <option>Dose 1</option>
                                <option>Dose 2</option>
                            </Form.Select>
                            <Form.Control.Feedback id="feed" type="invalid">
                                {formik.errors.dose}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <div className="text-center">
                        <Button variant="primary" style={{ backgroundColor: "#5B67CD",border:"#5B67CD" }} className="btn" type="submit" >
                            Book
                        </Button></div>
                    </Form>
                </div>
            </div>
            </Col>
            </Row>
            </Container>
        </>
    )
}
export default Book_slot