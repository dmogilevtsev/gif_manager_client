import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Spinner } from 'react-bootstrap'
import Navbar from './components/navbar'
import Auth from './components/auth'
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from './utils/links'
import { ACCESS_TOKEN } from './utils/names'
import { checkAuth } from './actions/user'
import Disk from './components/disk'

function App() {
	const dispatch = useDispatch()
	const isLoading = useSelector(state => state.loading.isLoading)
	const isAuth = useSelector(state => state.user.isAuth)

	useEffect(() => {
		if ( localStorage.getItem(ACCESS_TOKEN) ) {
			dispatch(checkAuth())
		}
	}, [ dispatch ])


	return (
		<>
			{
				isLoading ?
					<Row className="justify-content-center mt-5">
						<Spinner animation="grow" variant="info"/>
					</Row> :

					<>
						<Navbar/>
						{
							!isAuth ?
								<Routes>
									<Route path={ REGISTRATION_ROUTE } element={ <Auth/> }/>
									<Route path={ LOGIN_ROUTE } element={ <Auth/> }/>
									<Route path="*" element={ <Navigate to={ LOGIN_ROUTE }/> }/>
								</Routes> :
								<Routes>
									<Route exact path="/" element={ <Disk/> }/>
									<Route path="*" element={ <Navigate to="/"/> }/>
								</Routes>
						}
					</>
			}
		</>
	)
}

export default App
