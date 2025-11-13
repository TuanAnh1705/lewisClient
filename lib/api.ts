// File: lib/api.ts (Bên dự án CLIENT)
import axios from "axios";

// Đọc URL của Backend (Dashboard) từ biến môi trường
const baseURL = process.env.NEXT_PUBLIC_API_URL; // Sẽ là 'http://localhost:3001'

if (!baseURL) {
  console.error("CRITICAL: NEXT_PUBLIC_API_URL is not defined.");
}

const api = axios.create({
  baseURL: baseURL, // Gắn cứng URL backend vào mọi request
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;