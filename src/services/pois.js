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

export const createPoiForTrail = (trailId, poiData) => {
  return api.post(
    `trails/${trailId}/pois/`,
    poiData,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  )
}

export const deletePoi = (poiId) => {
  return api.delete(`${poiId}/`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  })
}