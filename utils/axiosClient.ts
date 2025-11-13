import axios from "axios"

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_FE_URL || "/api/",
  headers: { "Content-Type": "application/json" },
})

export default axiosClient
