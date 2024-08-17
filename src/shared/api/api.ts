import axios from 'axios'
import { USER_LOCALSTORAGE_KEY } from '../const/localstorage'

export const $api = axios.create({
  baseURL: __API__,
})

$api.interceptors.request.use((config) => {
  if (config.headers) {
    config.headers.Authorization =
      localStorage.getItem(USER_LOCALSTORAGE_KEY) || ''
  }
  return config
})
$api.interceptors.response.use((config) => {
  if (config?.data?.password) {
    delete config.data.password
  }
  return config
})
