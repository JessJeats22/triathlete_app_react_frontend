import axios from 'axios'
import { getToken } from '../utils/token'

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/`,
})

export const getTrailWeather = (trailId) => {
  return api.get(`trails/${trailId}/weather/`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  })
}
