import React from 'react'
import {ProgressBar, Button, Row, Col} from 'react-bootstrap'
import { X } from 'react-bootstrap-icons'
import { useDispatch } from 'react-redux'
import { removeFileFromUploaderReducer } from '../../reducers/uploadReducer'

const UploadFile = ({file}) => {
    const dispatch = useDispatch()

  return (
    <Row>
        <Col xs={10}>
            <ProgressBar animated  variant="success" now={file.progress} label={`${file.name} ${file.progress}%`} className="my-2" />
        </Col>
        <Col xs={2}>
            <Button onClick={() => dispatch(removeFileFromUploaderReducer(file.id))} variant="outline-secondary" size="sm" className="p-0">
                <X size="1.5em"/>
            </Button>
        </Col>
    </Row>
  )
}

export default UploadFile