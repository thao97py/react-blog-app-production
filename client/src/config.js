import axios from "axios"

export const axiosInstance = axios.create({
    baseURL :"https://react-blog-app-99.herokuapp.com/api"
})