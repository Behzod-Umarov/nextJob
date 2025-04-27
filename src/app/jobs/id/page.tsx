'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getJob } from '@/lib/api';
import { Job } from '@/types';

export default function JobDetailPage() {
  const { id } = useParams();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const jobData = await getJob(id as string);
        setJob(jobData);
      } catch (error) {
        console.error('Error fetching job:', error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchJob();
  }, [id]);

  if (loading) {
    return <div className="container mx-auto p-6">Loading...</div>;
  }

  if (!job) {
    return <div className="container mx-auto p-6">Job not found.</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="card p-8">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">{job.title}</h1>
        <div className="space-y-3">
          <p className="text-lg"><strong className="text-gray-700">Company:</strong> {job.company}</p>
          <p className="text-lg"><strong className="text-gray-700">Location:</strong> {job.location}</p>
          <p className="text-lg"><strong className="text-gray-700">Description:</strong> {job.description}</p>
        </div>
      </div>
    </div>
  );
}