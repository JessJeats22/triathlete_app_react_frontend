import axios from 'axios'

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/trails`
})

export const trailsIndex = () => {
  return api.get('/')
}
