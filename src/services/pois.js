import axios from 'axios'
import { getToken } from '../utils/token'


const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/pois/`,
})

export const poisForTrail = (trailId) => {
  return api.get(`?trail=${trailId}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  })
}