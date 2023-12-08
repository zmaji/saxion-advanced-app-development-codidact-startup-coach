import { useTokenStore } from "@/stores/token";
import axios from "axios";

const baseUrl = import.meta.env.VITE_APP_BASE_URL_API;

const setAuthorizationHeader = () => {
  const token = useTokenStore().getToken;
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
};

const getRequest = async (url: string, useToken: boolean = true) => {
  if (useToken) {
    setAuthorizationHeader();
  }
  try {
    return await axios.get(`${baseUrl}${url}`);
  } catch (error) {
    throw error;
  }
}

const putRequest = async (url: string, data: any, useToken: boolean = true) => {
  if (useToken) {
    setAuthorizationHeader();
  }
  try {
    return await axios.put(`${baseUrl}${url}`, data);
  } catch (error) {
    throw error;
  }
}

const postRequest = async (url: string, data: any, useToken: boolean = true) => {
  if (useToken) {
    setAuthorizationHeader();
  }
  try {
    return await axios.post(`${baseUrl}${url}`, data);
  } catch (error) {
    throw error;
  }
}

const deleteRequest = async (url: string, useToken: boolean = true) => {
  if (useToken) {
    setAuthorizationHeader();
  }
  try {
    return await axios.delete(`${baseUrl}${url}`);
  }
  catch (error) {
    throw error;
  }
}

const httpService = {
  getRequest,
  putRequest,
  postRequest,
  deleteRequest,
};

export default httpService;
