import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api/admin" });

export const loginAdmin = (data) => API.post("/login", data);
export const getServices = () => API.get("/services");
export const addService = (data) => API.post("/services", data);
export const updateService = (id, data) => API.put(`/services/${id}`, data);
export const deleteService = (id) => API.delete(`/services/${id}`);
