'use client';

import { useState } from 'react';
import { login } from '@/lib/api';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await login(formData);
      localStorage.setItem('token', response.token);
      router.push('/jobs');
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="container mx-auto p-6 flex justify-center items-center min-h-screen">
      <form onSubmit={handleSubmit} className="card p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">Login</h1>
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit" className="btn w-full">
          Login
        </button>
        {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
        <p className="mt-6 text-center text-gray-600">
          Don’t have an account?{' '}
          <a href="/register" className="text-blue-600 hover:underline">
            Sign Up
          </a>
        </p>
      </form>
    </div>
  );
}