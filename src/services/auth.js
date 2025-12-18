import axios from 'axios'
import { getToken } from '../utils/token'


const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/auth/`
})

export const signUpService = (formData) => {
  return api.post('/sign-up/', formData)
}

export const signInService = (formData) => {
  return api.post('/sign-in/', formData)
}

export const getMyProfile = () => {
  return api.get('me/', {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  })
}