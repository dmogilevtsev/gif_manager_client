import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { setModalPopup } from '../../reducers/fileReducer'
import { createFolder } from '../../actions/file'
import Input from '../input'

const ModalPopup = ({ open }) => {
	const [ folderName, setFolderName ] = useState('')
	const modal = useSelector(state => state.files.modalPopup)
	const currentDir = useSelector(state => state.files.currentDir)
	const dispatch = useDispatch()
	const onCreateFolder = () => {
		dispatch(createFolder(currentDir, folderName))
		setFolderName('')
		dispatch(setModalPopup(false))
	}

	return (
		<Modal show={ modal } onHide={ () => dispatch(setModalPopup(false)) }>
			<Modal.Header closeButton>
				<Modal.Title>Create folder</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Input type="text" placeholder="Enter folder name.." value={ folderName } setValue={ setFolderName }/>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="danger" onClick={ () => dispatch(setModalPopup(false)) }>
					Close
				</Button>
				<Button variant="success" onClick={ onCreateFolder } disabled={ folderName.trim().length === 0 }>
					Save
				</Button>
			</Modal.Footer>
		</Modal>
	)
}

export default ModalPopup