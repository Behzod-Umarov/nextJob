'use client';

import { useState } from 'react';
import { createJob } from '@/lib/api';
import { Job } from '@/types';

export default function CompaniesPage() {
  const [formData, setFormData] = useState<Omit<Job, 'id'>>({
    title: '',
    company: '',
    location: '',
    description: '',
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createJob(formData);
      setSuccess(true);
      setError('');
      setFormData({ title: '', company: '', location: '', description: '' });
    } catch (err: any) {
      setError('Failed to add job. Please try again.');
      console.error('Error adding job:', err);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Add a New Job</h1>
      <form onSubmit={handleSubmit} className="card p-8 max-w-lg mx-auto space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
            className="border p-2 rounded-md w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
          <input
            type="text"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            required
            className="border p-2 rounded-md w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            required
            className="border p-2 rounded-md w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={4}
            required
            className="border p-2 rounded-md w-full"
          />
        </div>
        <button type="submit" className="btn w-full">Add Job</button>
        {success && <p className="text-green-600 mt-4 text-center">Job added successfully!</p>}
        {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
      </form>
    </div>
  );
}