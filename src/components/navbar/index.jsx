import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Container from 'react-bootstrap/Container'
import { DoorOpen } from 'react-bootstrap-icons'
import Navbar from 'react-bootstrap/Navbar'
import {Link} from 'react-router-dom'
import Nav from 'react-bootstrap/Nav'

import { LOGIN_TITLE, REGISTRATION_TITLE, LOGOUT_TITLE } from '../../utils/names'
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from '../../utils/links'
import Logo from '../../assets/img/logo.gif'
import { logout } from '../../actions/user'

const NavBar = () => {

  const isAuth = useSelector(state => state.user.isAuth)
  const dispatch = useDispatch()
  const onLogout = () => {
      dispatch(logout())
    }
  
  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Container>
            <Navbar.Brand>
                <img 
                    src={Logo} 
                    alt="GIF Manager"   
                    width="50"
                    className="d-inline-block align-top" 
                />
                GIF Manager
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="ms-auto">
                    {
                        !isAuth ? 
                        <>
                            <Link className="nav-link" to={LOGIN_ROUTE}>{LOGIN_TITLE}</Link>
                            <Link className="nav-link" to={REGISTRATION_ROUTE}>{REGISTRATION_TITLE}</Link>
                        </> :
                        <>
                            <div className="btn text-danger ms-auto" onClick={onLogout}>{LOGOUT_TITLE}<DoorOpen className="ms-2" size={30}/></div>
                        </>
                    }
                    
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
  )
}

export default NavBar