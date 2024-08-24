import React from "react";
import { Form, Container, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import './Bord.css'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Label, BarChart, Bar, ResponsiveContainer } from 'recharts';
import { Post } from './Api.js'

function Dashboard() {

    const [responce, setresponce] = useState();
    const [responcecovid, setresponcecovid] = useState();
    const [responcegender, setresponcegender] = useState();
    const [dose, setdose] = useState('Dose 1');
    async function dose1() {
        const requrl = "/bord_dose"
        const reqbody = { dose }
        const response = await Post(requrl, reqbody)

        setresponce(response.data.dose)
    }
    async function gender1() {

        const req = await fetch('http://127.0.0.1:2000/bord_gender', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const data1 = JSON.stringify(await req.json())
        const data2 = JSON.parse(data1)
        const datas = data2.gender
        setresponcegender(datas)
    }

    async function covid() {
        const req = await fetch('http://127.0.0.1:2000/bord_covid', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const data1 = JSON.stringify(await req.json())
        const data2 = JSON.parse(data1)
        const datas = data2.covid
        setresponcecovid(datas)
    }

    useEffect(() => {
        covid();
        dose1();
        gender1();
    }, [])
    return (
        <>
            <h2>Dashboard</h2>
            <Container fluid>
                <Row >

                    <Col  lg="6">
                        <div id="gender">
                    <div id="gender_lable">
                        <p className="ms-3 mt-3">Gender wise slot booking</p>                        
                    </div>
                    <div id="g1">
                    <ResponsiveContainer width="80%" height={300}>
                        <BarChart  data={responcegender}>
                            <XAxis dataKey="_id" >
                                <Label style={{ textAnchor: "middle", fill: "#5B67CD" }}
                                    angle={0}
                                    offset={0}
                                    position='insideBottom'
                                    value={"Gender"} />
                            </XAxis>
                            <YAxis  >
                                <Label style={{ textAnchor: "middle", fill: "#5B67CD", }}
                                    angle={270}
                                    value={"Count"}
                                    position='insideLeft'
                                    offset={10} />
                            </YAxis>
                            <Bar dataKey="count" barSize={40} fill="#8884d8" />
                        </BarChart>
                        </ResponsiveContainer>
                    </div> 
                    </div>
                       
                    </Col>


                    <Col  lg="6" >
                        <div id="covid">
                    <div id="covid_lable">
                            <p className="ms-3 mt-3">Previously infected with covid</p>

                        </div>
                        <div id="g2">
                            <ResponsiveContainer width="80%" height={300}>
                                <BarChart data={responcecovid}>
                                    <XAxis dataKey="_id" >
                                        <Label style={{ textAnchor: "middle", fill: "#5B67CD" }}
                                            angle={0}
                                            offset={0}
                                            position='insideBottom'
                                            value={"Covid"} />
                                    </XAxis>
                                    <YAxis>
                                        <Label style={{ textAnchor: "middle", fill: "#5B67CD" }}
                                            angle={270}
                                            value={"Count"}
                                            position='insideLeft'
                                            offset={10} />
                                    </YAxis>
                                    <Bar dataKey="count" barSize={40} fill="#8884d8" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div> </div>
                       
                    </Col>

                </Row>
                <Row>
                    <Col xs lg="12">
                
                    <div id="doses">
                <div id="dose_lable">
                <Row className="ms-3 mt-3">
                    <Col xs lg="5" className="ms-3 mt-3">< p  >Monthly slot booking dose wise</p></Col>
                    <Col xs lg="2" className="ms-3 mt-3"><Form.Select id="dosess"
                        value={dose}
                        onClick={dose1}
                        onChange={(e) => { setdose(e.target.value); }}>

                        <option value='Dose 1' >Dose 1</option>
                        <option value='Dose 2' >Dose 2</option>
                    </Form.Select></Col></Row>
                    
                    


                </div>
                <div id="g1">
                    <ResponsiveContainer width="97%" height={300}>
                        <LineChart width={1250} height={300} data={responce} >
                            <XAxis dataKey="_id" dy={-5}
                            >
                                <Label
                                    style={{ textAnchor: "middle", fill: "#5B67CD" }}
                                    angle={0}
                                    offset={0}
                                    position='insideBottom'
                                    value={"Months"} />
                            </XAxis>
                            <YAxis >
                                <Label style={{ textAnchor: "middle", fill: "#5B67CD", }}
                                    angle={270}
                                    value={"count"}
                                    position='insideLeft'
                                    offset={10} />
                            </YAxis>
                            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                            <Line type="monotone" dataKey="count" stroke="#8884d8" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
                    </Col>
                </Row>
            
            </Container>
        </>
    )
}
export default Dashboard