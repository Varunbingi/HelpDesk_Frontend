import axios from 'axios';

const baseURL = 'https://helpdesk-backend-1-rvxs.onrender.com/api';
const withCredentials = true;


const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const register = (data) => axios.post(`${baseURL}/users/register`, data, { withCredentials });
export const login = (data) => axios.post(`${baseURL}/users/login`, data, { withCredentials });
export const logout = () => axios.post(`${baseURL}/users/logout`, {}, { withCredentials });
export const updateProfile = (data) =>
  axios.put(`${baseURL}/users/updateProfile`, data, {
    headers: { ...getAuthHeaders() },
    withCredentials,
  });


export const getTickets = () =>
  axios.get(`${baseURL}/tickets/`, {
    headers: { ...getAuthHeaders() },
    withCredentials,
  });
export const createTicket = (data) =>
  axios.post(`${baseURL}/tickets/`, data, {
    headers: { ...getAuthHeaders() },
    withCredentials,
  });
export const addNoteToTicket = (ticketId, data) =>
  axios.post(`${baseURL}/tickets/${ticketId}/notes`, data, {
    headers: { ...getAuthHeaders() },
    withCredentials,
  });
export const updateTicketStatus = (ticketId, status) =>
  axios.put(`${baseURL}/tickets/${ticketId}/status`, { status }, {
    headers: { ...getAuthHeaders() },
    withCredentials,
  });
export const getNotes = (ticketId) =>
  axios.get(`${baseURL}/tickets/${ticketId}/notes`, {
    headers: { ...getAuthHeaders() },
    withCredentials,
  });
export const getTicketStatus = (ticketId) =>
  axios.get(`${baseURL}/tickets/${ticketId}/status`, {
    headers: { ...getAuthHeaders() },
    withCredentials,
  });

export default {
  register,
  login,
  logout,
  updateProfile,
  getTickets,
  createTicket,
  addNoteToTicket,
  updateTicketStatus,
  getNotes,
  getTicketStatus,
};
