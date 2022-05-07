import React from 'react'
import {Container, Row, Col, Form, Tab, Nav, Button} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import user1 from '../../assets/images/user/1.jpg'
import user5 from '../../assets/images/user/05.jpg'
import user6 from '../../assets/images/user/06.jpg'

export default function ChatHeader({chat}) {
    console.log(chat);
    return (
        <div className="chat-head">
        <header className="d-flex justify-content-between align-items-center bg-white pt-3  ps-3 pe-3 pb-3">
            <div className="d-flex align-items-center">
                <div className="sidebar-toggle">
                    <i className="ri-menu-3-line"></i>
                </div>
                <div className="avatar chat-user-profile m-0 me-3">
                    <img src={chat?.Users[0].profile_pic} alt="avatar" className="rounded-circle avatar-50 "/>
                    <span className="avatar-status"><i className="ri-checkbox-blank-circle-fill text-success"></i></span>
                </div>
                <h5 className="mb-0">{chat?.Users[0].name}</h5>
            </div>
            <div className="chat-user-detail-popup scroller" >
                <div className="user-profile">
                    <Button type="submit" variant=" close-popup p-3"><i className="ri-close-fill"></i></Button>
                    <div className="user mb-4 text-center">
                            <Link className="avatar m-0" to="">
                                <img src={user6} alt="avatar"/>
                            </Link>
                        <div className="user-name mt-4">
                            <h4>Mark Jordan</h4>
                        </div>
                        <div className="user-desc">
                            <p>Atlanta, USA</p>
                        </div>
                    </div>
                    <hr/>
                    <div className="chatuser-detail text-left mt-4">
                        <Row>
                            <Col md="6"  className="col-6 title">Bni Name:</Col>
                            <Col md="6" className="col-6  text-right">Mark</Col>
                        </Row>
                        <hr/>
                        <Row>
                            <Col md="6"  className="col-6 title">Tel:</Col>
                            <Col md="6" className="col-6  text-right">072 143 9920</Col>
                        </Row>
                        <hr/>
                        <Row>
                            <Col md="6"  className="col-6 title">Date Of Birth:</Col>
                            <Col md="6" className="col-6  text-right">July 12, 1989</Col>
                        </Row>
                        <hr/>
                        <Row>
                            <Col md="6"  className="col-6 title">Gender:</Col>
                            <Col md="6" className="col-6  text-right">Female</Col>
                        </Row>
                        <hr/>
                        <Row>
                            <Col md="6"  className="col-6 title">Language:</Col>
                            <Col md="6" className="col-6  text-right">Engliah</Col>
                        </Row>
                    </div>
                </div>
            </div>
  
        </header>
    </div>
    )
}
