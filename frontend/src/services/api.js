import axios from 'axios';

const API_BASE_URL = 'https://ai-chat-agent-i4zq.onrender.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const sendMessage = async (message) => {
  const response = await api.post('/chat', { message });
  return response.data;
};

export const getHistory = async () => {
  const response = await api.get('/history');
  return response.data;
};

export const clearHistory = async () => {
  const response = await api.post('/clear');
  return response.data;
};