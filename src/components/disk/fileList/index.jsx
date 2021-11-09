import React from 'react'
import { useSelector } from 'react-redux'
import File from './file'

const FileList = () => {
  const files = useSelector(state => state.files.files).map(file => <File file={file} key={file.id} />)
  return (
      <div className="mt-2 row row-cols-1 row-cols-md-3 g-4">
        {files}
      </div>
  )
}

export default FileList