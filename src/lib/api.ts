import axios from 'axios';
import { Job, User, AuthCredentials } from '@/types';

const api = axios.create({
  baseURL: 'https://mustafocoder.pythonanywhere.com/api/',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getJobs = async (): Promise<Job[]> => {
  const response = await api.get('/jobs');
  return response.data;
};

export const getJob = async (id: string): Promise<Job> => {
  const response = await api.get(`/jobs/${id}`);
  return response.data;
};

export const createJob = async (job: Omit<Job, 'id'>): Promise<Job> => {
  const response = await api.post('/jobs', job);
  return response.data;
};

export const updateJob = async (id: string, job: Omit<Job, 'id'>): Promise<Job> => {
  const response = await api.put(`/jobs/${id}`, job);
  return response.data;
};

export const deleteJob = async (id: string): Promise<void> => {
  await api.delete(`/jobs/${id}`);
};

export const getUsers = async (): Promise<User[]> => {
  const response = await api.get('/users');
  return response.data;
};

export const getUser = async (id: string): Promise<User> => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};

export const createUser = async (user: Omit<User, 'id'>): Promise<User> => {
  const response = await api.post('/users', user);
  return response.data;
};

export const updateUser = async (id: string, user: Omit<User, 'id'>): Promise<User> => {
  const response = await api.put(`/users/${id}`, user);
  return response.data;
};

export const deleteUser = async (id: string): Promise<void> => {
  await api.delete(`/users/${id}`);
};

export const register = async (credentials: AuthCredentials): Promise<User> => {
  const userData = {
    username: credentials.username || '',
    email: credentials.email,
    password: credentials.password,
  };
  const response = await api.post('/users', userData);
  return response.data;
};

export const login = async (credentials: AuthCredentials): Promise<{ token: string }> => {
  const users = await getUsers();
  const user = users.find(
    (u) => u.email === credentials.email && u.password === credentials.password
  );

  if (!user) {
    throw new Error('Invalid email or password');
  }

  const fakeToken = btoa(`${user.email}:${user.password}`);
  return { token: fakeToken };
};