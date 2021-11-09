import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {Upload} from 'react-bootstrap-icons'
import Button from 'react-bootstrap/Button'
import FileList from './fileList'
import ModalPopup from './modal'
import { setCurrentDir, setModalPopup } from '../../reducers/fileReducer'
import { getFiles, uploadFile } from '../../actions/file'
import './index.css'

const Disk = () => {
  const dispatch = useDispatch()
  const [dragEnter, setGragEnter] = useState(false)
  const currentDir = useSelector(state => state.files.currentDir)
  const dirStack = useSelector(state => state.files.dirStack)

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
                  Назад
                </Button>
              : ''}            
              <Button variant="outline-info" size="sm" className="ms-1" onClick={modalHandler}>
              Создать папку
              </Button>
              <label htmlFor="upload_file">
                <Upload className="ms-2" title="upload file"/>
              </label>
              <input onChange={fileUploadHandler} multiple type="file" accept="image/gif" id="upload_file" className="d-none" />
            </Col>          
          </Row>
          <FileList />
          <ModalPopup />          
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