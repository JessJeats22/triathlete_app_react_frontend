import axios from "axios"

const BASE_URL = import.meta.env.VITE_CLOUDINARY_URL

export const uploadImage = (file) => {

    return axios.postForm(BASE_URL, {
        file,
        upload_preset: import.meta.env.VITE_UPLOAD_PRESET
    })



}

const RAW_BASE_URL = import.meta.env.VITE_CLOUDINARY_RAW_URL

export const uploadGpx = (file) => {
  return axios.postForm(RAW_BASE_URL, {
    file,
    upload_preset: import.meta.env.VITE_RAW_UPLOAD_PRESET,
  })
}