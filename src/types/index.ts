export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
}

export interface AuthCredentials {
  username?: string;
  email: string;
  password: string;
}