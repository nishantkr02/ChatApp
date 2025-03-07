import axios from "axios"

const axiosInstance = axios.create({
    baseURL: 'http://localhost:4000/api/v1',
    timeout: 1000,
    headers: {
      'Content-Type': 'application/json',
    },
})

export {axiosInstance}