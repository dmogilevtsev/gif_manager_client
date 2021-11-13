import $api, { API_URL } from '../http'
import { addFile, setFiles, removeFile } from '../reducers/fileReducer'
import {
  addFileToUploaderReducer,
  changeProgressUploaderReducer,
  showUploaderReducer,
} from '../reducers/uploadReducer'


export const getFiles = (dirId) => {
  return async (dispatch) => {
    try {
      const response = await $api.get(
        `${API_URL}api/file${dirId ? '?parent=' + dirId : ''}`
      )
      dispatch(setFiles(response.data))
    } catch (error) {
      alert(error?.response?.data?.message)
    }
  }
}

export const createFolder = (dirId, name) => {
  return async (dispatch) => {
    try {
      const response = await $api.post(`${API_URL}api/file`, {
        name,
        parent: dirId,
        type: 'dir',
      }
      )
      dispatch(addFile(response.data))
    } catch (error) {
      alert(error?.response?.data?.message)
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
      const response = await $api.post(`${API_URL}api/file/upload`, fd, {
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
      alert(error?.response?.data?.message)
    }
  }
}

export const removeFileAction = (file) => {
  return async (dispatch) => {
    try {
      const response = await $api.delete(`${API_URL}api/file?id=${file.id}`)
      dispatch(removeFile(file.id))
      alert(response.data.message)
    } catch (error) {
      alert(error?.response?.data?.message)
    }
  }
}
