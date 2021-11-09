import axios from 'axios'
import { API_URL } from '../http'
import { addFile, setFiles, removeFile } from '../reducers/fileReducer'
import { ACCESS_TOKEN } from '../utils/names'

export const getFiles = (dirId) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${API_URL}api/file${dirId ? '?parent=' + dirId : ''}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
          },
        }
      )
      dispatch(setFiles(response.data))
    } catch (error) {
      console.log(error.response.data.message)
    }
  }
}

export const createFolder = (dirId, name) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `${API_URL}api/file`,
        {
          name,
          parent: dirId,
          type: 'dir',
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
          },
        }
      )
      dispatch(addFile(response.data))
    } catch (error) {
      console.log(error.response.data.message)
    }
  }
}

export const uploadFile = (file, dir) => {
  return async (dispatch) => {
    try {
      const fd = new FormData()
      fd.append('file', file)
      if (dir) {
        fd.append('parent', dir)
      }
      console.log('dir', dir)
      const response = await axios.post(`${API_URL}api/file/upload`, fd, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
        },
        onUploadProgress: (progressEvent) => {
          const totalLength = progressEvent.lengthComputable
            ? progressEvent.total
            : progressEvent.target.getResponseHeader('content-length') ||
              progressEvent.target.getResponseHeader(
                'x-decompressed-content-length'
              )
          console.log('total', totalLength)
          if (totalLength) {
            let progress = Math.round(
              (progressEvent.loaded * 100) / totalLength
            )
            console.log(progress)
          }
        },
      })
      dispatch(addFile(response.data))
    } catch (error) {
      console.log(error.response.data.message)
    }
  }
}

export const downLoadFile = async (file) => {
  const res = await fetch(`${API_URL}api/file/download?id=${file.id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
    },
  })
  if (res.status === 200) {
    const blob = await res.blob()
    const downloadLink = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = downloadLink
    link.download = file.name
    document.body.appendChild(link)
    link.click()
    link.remove()
  }
}

export const removeFileAction = (file) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(`${API_URL}api/file?id=${file.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
        },
      })
      console.log('remove', response)
      dispatch(removeFile(response.data))
    } catch (error) {
      console.log(error.response.data.message)
    }
  }
}
