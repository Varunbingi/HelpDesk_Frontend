import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5012/api',
  withCredentials: true,
});


export const register = (data) => api.post('/users/register', data);
export const login = (data) => api.post('/users/login', data);
export const logout = () => api.post('/users/logout');
export const getTickets = () => api.get('/tickets');
export const createTicket = (data) => api.post('/tickets', data);
export const addNoteToTicket = (ticketId, data) =>
  api.post(`/tickets/${ticketId}/notes`, data);
export const updateTicketStatus = (ticketId, status) =>
  api.put(`/tickets/${ticketId}/status`, { status });
export const getNotes = (ticketId) => api.get(`/tickets/${ticketId}/notes`);
export const getTicketStatus = (ticketId) => api.get(`/tickets/${ticketId}`);

export default api;
