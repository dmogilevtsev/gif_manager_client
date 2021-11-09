import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Card, Row, Col, Button, Dropdown} from 'react-bootstrap'
import {Download, Trash, ThreeDotsVertical} from 'react-bootstrap-icons'
import dirSvg from '../../../../assets/img/dirSvg.svg'
import {onPushDirStack, setCurrentDir} from '../../../../reducers/fileReducer'
import { downLoadFile, removeFileAction } from '../../../../actions/file'
import { API_URL } from '../../../../http'
import { bytesToSize } from '../../../../utils'

const File = ({file}) => {
  const dispath = useDispatch()
  const currentDir = useSelector(state => {
    console.log('file', file, `${API_URL}${file.userId}/${file.path.replace('\\', '/')}`);
    return state.files.currentDir
  })

  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    <a
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        onClick(e);
      }}
      style={{position: 'absolute', right: '5px', top: '5px'}}
    >
      {children}
      <ThreeDotsVertical />
    </a>
  ))

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
    removeFileAction(file)
  }

  return (
      <Col xs={6} sm={4} md={3} lg={2}>
        <Card className="h-100 px-0" style={{cursor: file.type === 'dir' ? 'pointer' : 'default'}} onClick={openFolderHandler}>
          <Dropdown size="sm" style={{position: 'relative'}}>
            <Dropdown.Toggle variant="light" as={CustomToggle} />
            <Dropdown.Menu style={{minWidth: 0}}>
                {file.type !== 'dir' && 
                <Button onClick={downloadHandler} className="mx-1" variant="outline-info" size="sm" title="Download">
                  <Download />
                </Button>}   
                <Button onClick={removeHandler} className="mx-1" variant="outline-danger" size="sm" title="Remove">
                  <Trash />
                </Button>   
            </Dropdown.Menu>
          </Dropdown>
          <Card.Img 
            variant="top" 
            src={file.type === 'dir' ? dirSvg : `${API_URL}${file.userId}/${file.path.replace('\\', '/')}`} 
            style={{width: 'auto', height: '80px', objectFit: 'contain '}}
          />
          <Card.Body className="py-1 px-2">
            <Card.Title>{file.name}</Card.Title>
          </Card.Body>
          <Card.Footer 
              className="text-muted py-1 px-2 align-items-center"
              style={{fontSize: '0.6em', height: '30px'}}
            >
            <Row>
              <Col xs={6} className="pe-0">
                {file?.type === 'dir' ? '' : bytesToSize(file?.size)}              
              </Col>
              <Col xs={6} className="ps-0 text-end">
                {file?.createdAt?.slice(0, 10)}              
              </Col>
            </Row>
          </Card.Footer>
        </Card>
      </Col>
  )
}

export default File