import axios from "axios"; 

export const fetchData = axios.create({
  baseURL: "http://192.168.1.8:8000/api",
  headers: {
    Accept: "application/json",
  },
});

