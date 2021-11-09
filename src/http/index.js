import axios from 'axios'
import { ACCESS_TOKEN } from '../utils/names'

export const AUTH_URL = 'http://localhost:3001/api'
export const API_URL = 'http://localhost:3002/'

const $api = axios.create({
  withCredentials: true,
  baseURL: AUTH_URL,
})

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
  return config
})

export default $api
