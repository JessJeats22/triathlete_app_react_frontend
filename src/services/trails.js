import axios from 'axios'
import { getToken } from '../utils/token'

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/trails/`
})

export const trailsIndex = () => {
  return api.get('')
}


export const trailsCreate = (formData) => {
    return api.post ('' , formData, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  })
}