import React, { useRef } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Card, Row, Col, Button} from 'react-bootstrap'
import {Download, Trash} from 'react-bootstrap-icons'
import dirSvg from '../../../../assets/img/dirSvg.svg'
import {onPushDirStack, setCurrentDir} from '../../../../reducers/fileReducer'
import { downLoadFile, removeFileAction } from '../../../../actions/file'
import { API_URL } from '../../../../http'
import { bytesToSize } from '../../../../utils'
import { useHover } from './hooks/useHover'

const File = ({file}) => {
  const dispath = useDispatch()
  const currentDir = useSelector(state => {
    return state.files.currentDir
  })

  const openFolderHandler = () => {
    if (file.type === 'dir') {
      dispath(onPushDirStack(currentDir))
      dispath(setCurrentDir(file.id))
    }
  }

  const downloadHandler = (e) => {
    e.stopPropagation()
    downLoadFile(file)
  }
  const removeHandler = (e) => {
    e.stopPropagation()
    dispath(removeFileAction(file))
  }
  const ref = useRef()
  const isHovering = useHover(ref)

  return (
      <Col xs={6} sm={4} md={3} lg={2}>
        <Card className="h-100 px-0" style={{cursor: file.type === 'dir' ? 'pointer' : 'default'}} onClick={openFolderHandler}>
          <Card.Img 
            variant="top" 
            src={file.type === 'dir' ? dirSvg : `${API_URL}${file?.userId}/${file?.path?.replace('\\', '/')}`} 
            style={{width: 'auto', height: '80px', objectFit: 'contain '}}
          />
          <Card.Body className="py-1 px-2">
            <Card.Title>{file.name}</Card.Title>
          </Card.Body>
          <Card.Footer 
              className="text-muted py-1 px-2"
              style={{fontSize: '0.7em', height: '40px'}}
              ref={ref}
            >
            <Row style={{display: !isHovering ? 'flex' : 'none', height: '100%', alignItems: 'center'}}>
              <Col xs={6} className="pe-0">
                {file?.type === 'dir' ? '' : bytesToSize(file?.size)}              
              </Col>
              <Col xs={6} className="ps-0 text-end">
                {file?.createdAt?.slice(0, 10)}              
              </Col>
            </Row>
            <Row style={{display: isHovering ? 'flex' : 'none'}}>
              <Col xs={6} className="pe-0">{file.type !== 'dir' && 
                <Button onClick={downloadHandler} className="mx-1" variant="outline-info" size="sm" title="Download">
                  <Download />
                </Button>}               
              </Col>
              <Col xs={6} className="ps-0 text-end"> 
                <Button onClick={removeHandler} className="mx-1" variant="outline-danger" size="sm" title="Remove">
                  <Trash />
                </Button>              
              </Col>
            </Row>
          </Card.Footer>
        </Card>
      </Col>
  )
}

export default File