import React from 'react'
import { Card, Col, Row, Button } from 'react-bootstrap'
import { X } from 'react-bootstrap-icons'
import UploadFile from './upload-file'
import './style.css'
import { useDispatch, useSelector } from 'react-redux'
import { clearStateUploaderReducer, hideUploaderReducer } from '../../reducers/uploadReducer'

const Uploader = () => {
  const dispatch = useDispatch()

  const files = useSelector(state => state.upload.files)
  const isVisible = useSelector(state => state.upload.isVisible)
  
  const hideUploadHandler = () => {
    dispatch(clearStateUploaderReducer())
  }

  return ( isVisible &&
    <div className="uploader">
      <Card className="p-2 shadow">
        <Card.Header>
          <Row>
            <Col xs={6}>Upload</Col>
            <Col xs={6} className="text-end">
              <Button onClick={hideUploadHandler} variant="outline-secondary" size="sm" className="p-0">
                <X size="1.5em"/>
              </Button>
            </Col>
          </Row>
        </Card.Header>
        {files.map(file => <UploadFile key={file.id} file={file} />)}
      </Card>
    </div>
  )
}

export default Uploader