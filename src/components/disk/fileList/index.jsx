import React from 'react'
import { Alert } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import File from './file'

const FileList = () => {
  const files = useSelector(state => state.files.files).map(file => <File file={file} key={file.id} />)
  if (files.length === 0) {
    return (
      <Alert variant="warning" className="mt-3 text-center"> Files is empty </Alert>
    )  
  }
  return (
      <div className="mt-2 row row-cols-1 row-cols-md-3 g-4">
        {files}
      </div>
  )
}

export default FileList