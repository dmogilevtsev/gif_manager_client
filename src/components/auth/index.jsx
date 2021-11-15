import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'
import { LOGIN_ROUTE } from '../../utils/links'
import { LOGIN_TITLE, REGISTRATION_TITLE } from '../../utils/names'
import { login, registration } from '../../actions/user'
import Input from '../input'

const Registration = () => {
	const location = useLocation()
	const isLogin = location.pathname === `/${ LOGIN_ROUTE }`
	const [ email, setEmail ] = useState('')
	const [ password, setPassword ] = useState('')
	const dispatch = useDispatch()


	const onsubmit = (e) => {
		e.preventDefault()
		isLogin ?
			dispatch(login(email, password)) :
			registration(email, password)
	}
	return (
		<Container className="d-flex justify-content-center align-items-center">
			<Card style={ { width: 600 } } className="p-3 rounded shadow">
				<h2 className="alert alert-info p-2 text-center">{ isLogin ? 'Sign in' : 'Sign up' }</h2>
				<Form className="d-flex flex-column" onSubmit={ onsubmit.bind(this) }>
					<Form.Group className="mb-3" controlId="formBasicEmail">
						<Form.Label>Email address</Form.Label>
						<Input type="email" placeholder="Enter email" value={ email } setValue={ setEmail }/>
						<Form.Text className="text-muted text-small">
							We'll never share your email with anyone else.
						</Form.Text>
					</Form.Group>

					<Form.Group className="mb-3" controlId="formBasicPassword">
						<Form.Label>Password</Form.Label>
						<Input type="password" placeholder="Password" value={ password } setValue={ setPassword }/>
					</Form.Group>
					<Nav className="ms-auto">
						<Link
							className="nav-link text-muted"
							to={ isLogin ? '/registration' : '/login' }
						>{ isLogin ? REGISTRATION_TITLE : LOGIN_TITLE }</Link>
						<Button
							className="btn btn-primary text-light"
							type="submit"
						>{ isLogin ? LOGIN_TITLE : REGISTRATION_TITLE }</Button>
					</Nav>
				</Form>
			</Card>
		</Container>
	)
}

export default Registration