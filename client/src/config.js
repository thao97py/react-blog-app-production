import axios from "axios"

export const axiosInstance = axios.create({
    baseURL :"https://blogapp.thaott.com/api"
})
