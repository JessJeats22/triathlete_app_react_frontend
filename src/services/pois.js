import axios from 'axios'
import { getToken } from '../utils/token'


const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/poi/`,
})

export const poisForTrail = (trailId) => {
  return api.get(`trails/${trailId}/pois/`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  })
}