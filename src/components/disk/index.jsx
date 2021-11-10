import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Container, Row, Col, Button, Spinner} from 'react-bootstrap'
import {Upload} from 'react-bootstrap-icons'
import FileList from './fileList'
import ModalPopup from './modal'
import { setCurrentDir, setModalPopup } from '../../reducers/fileReducer'
import { getFiles, uploadFile } from '../../actions/file'
import './index.css'
import Uploader from '../uploader/uploader'

const Disk = () => {
  const dispatch = useDispatch()
  const [dragEnter, setGragEnter] = useState(false)
  const currentDir = useSelector(state => state.files.currentDir)
  const dirStack = useSelector(state => state.files.dirStack)
  const isLoading = useSelector(state => state.loading.isLoading)

  const modalHandler = () => {
    dispatch(setModalPopup(true))
  }   
  const backFolder = () => {
    dispatch(setCurrentDir(dirStack.pop()))
  }
  const fileUploadHandler = (event) => {
    const files = [...event.target.files]
    files.forEach(file => dispatch(uploadFile(file, currentDir)))
  }

  const onDragEnterHandler = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setGragEnter(true)
  }
  const onDragLeaveHandler = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setGragEnter(false)
  }
  const dropHandler = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const files = [...e.dataTransfer.files]
    files.forEach(file => dispatch(uploadFile(file, currentDir)))
    setGragEnter(false)
  }
  
  useEffect(() => {
      dispatch(getFiles(currentDir))
  }, [currentDir, dispatch])

  return (
        <>
        {!dragEnter ? 
          <Container fluid="lg pt-2" style={{minHeight: 'calc(100vh - 110px)'}}
            onDragEnter={onDragEnterHandler} 
            onDragLeave={onDragLeaveHandler} 
            onDragOver={onDragEnterHandler}
          >
          <Row>
            <Col>
              {currentDir ? 
                <Button variant="outline-secondary" size="sm" className="me-1" onClick={backFolder}>
                  Forward
                </Button>
              : ''}            
              <Button variant="outline-info" size="sm" className="ms-1" onClick={modalHandler}>
              Create folder
              </Button>   
              <label htmlFor="upload_file" className="ms-2 btn btn-sm btn-outline-warning">
                Upload file
                <Upload className="ms-2" title="upload file" style={{cursor: 'pointer'}}/>
              </label>
              <input onChange={fileUploadHandler} multiple type="file" accept="image/gif" id="upload_file" className="d-none" />
            </Col>          
          </Row>
          {
            isLoading ? 
            <Row className="justify-content-center mt-5">
              <Spinner animation="grow" variant="info" />
            </Row> :
            <FileList />
          }
          <ModalPopup />       
          <Uploader />   
        </Container> 
        :
        <div 
          className="drag-area" 
          onDragEnter={onDragEnterHandler} 
          onDragLeave={onDragLeaveHandler} 
          onDragOver={onDragEnterHandler}
          onDrop={dropHandler}
        >
          Drag and drop files
        </div> 
        }
        </>
  )
}

export default Disk