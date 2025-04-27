'use client';

import { useEffect, useState } from 'react';
import { getJobs, getJob } from '@/lib/api';
import { Job } from '@/types';
import Link from 'next/link';

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const jobsData = await getJobs();
        setJobs(jobsData);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  if (loading) {
    return <div className="container mx-auto p-6">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Find Jobs</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job) => (
          <div key={job.id} className="card p-6">
            <h2 className="text-xl font-semibold text-gray-800">{job.title}</h2>
            <p className="text-gray-600 mt-1">{job.company}</p>
            <p className="text-gray-500 mt-1">{job.location}</p>
            <Link href={`/jobs/${job.id}`} className="inline-block mt-4 text-blue-600 font-medium hover:underline">
              Details →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}