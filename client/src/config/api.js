// Import package
import axios from "axios";

// Create base URL API
export const API = axios.create({
  // Your ip address
  baseURL: "http://192.168.1.104:5000/todo/api",
});

// Set authorization token header
