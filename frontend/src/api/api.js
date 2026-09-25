import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

// Request interceptor
api.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || error.message || 'Something went wrong';
    return Promise.reject({ ...error, userMessage: message });
  }
);

// ─── User API ────────────────────────────────────────────────────────────────
export const userAPI = {
  create: (data) => api.post('/users', data),
  getAll: () => api.get('/users'),
  getById: (id) => api.get(`/users/${id}`),
  update: (id, data) => api.put(`/users/${id}`, data),
  delete: (id) => api.delete(`/users/${id}`),
  findByEmail: async (email) => {
    const res = await api.get('/users');
    const users = res.data;
    const found = users.find((u) => u.email?.toLowerCase() === email.toLowerCase());
    if (!found) throw { userMessage: 'No user found with that email.' };
    return { data: found };
  },
};

// ─── Interview API ────────────────────────────────────────────────────────────
export const interviewAPI = {
  start: (data) => api.post('/interviews/start', data),
  getAll: () => api.get('/interviews'),
  getById: (id) => api.get(`/interviews/${id}`),
  getResult: (id) => api.get(`/interviews/${id}/result`),
};

// ─── Question API ─────────────────────────────────────────────────────────────
export const questionAPI = {
  getByInterview: (interviewId) => api.get(`/questions/interview/${interviewId}`),
};

// ─── Answer API ───────────────────────────────────────────────────────────────
export const answerAPI = {
  submit: (data) => api.post('/answers/submit', data),
  evaluate: (answerId) => api.post(`/answers/evaluate/${answerId}`),
};

// ─── Resume API ───────────────────────────────────────────────────────────────
export const resumeAPI = {
  create: (data) => api.post('/resumes', data),
};

export default api;
