import axios from 'axios'
import { API_URL } from '../http'
import { addFile, setFiles, removeFile } from '../reducers/fileReducer'
import {
  addFileToUploaderReducer,
  changeProgressUploaderReducer,
  showUploaderReducer,
} from '../reducers/uploadReducer'
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
      alert(error.response.data.message)
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
      alert(error.response.data.message)
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
      const uploadFile = { name: file.name, progress: 0, id: Date.now() }
      dispatch(showUploaderReducer())
      dispatch(addFileToUploaderReducer(uploadFile))
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
          if (totalLength) {
            uploadFile.progress = Math.round(
              (progressEvent.loaded * 100) / totalLength
            )
            dispatch(changeProgressUploaderReducer(uploadFile))
          }
        },
      })
      dispatch(addFile(response.data))
    } catch (error) {
      alert(error.response.data.message)
    }
  }
}

export const downLoadFile = async (file) => {
  try {
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
  } catch (error) {
    alert(error.response.data.message)
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
      dispatch(removeFile(file.id))
      alert(response.data.message)
    } catch (error) {
      alert(error.response.data.message)
    }
  }
}
