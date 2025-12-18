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


export const trailsShow = (trailId) => {
  return api.get(`${trailId}/`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  })
}

export const trailsUpdate = (trailId, formData) => {
  return api.patch(`${trailId}/`, formData, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  })
}

export const trailsDelete = (trailId) => {
  return api.delete(`${trailId}/`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  })
}

export const deleteTrailImage = (trailId, imageUrl) => {
  return api.delete(`${trailId}/images/`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
    data: {
      image_url: imageUrl,
    },
  })
}

export const favouriteTrail = (trailId) => {
  return api.post(`${trailId}/favourite/`, null, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  })
}

export const unfavouriteTrail = (trailId) => {
  return api.delete(`${trailId}/favourite/`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  })
}
