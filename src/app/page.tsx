'use client';

import { useEffect, useState } from 'react';
import { getJobs } from '@/lib/api';
import { Job } from '@/types';
import Link from 'next/link';

export default function HomePage() {
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
      <h1 className="text-4xl font-bold mb-4 text-gray-800">Discover more than 5000+ Jobs</h1>
      <p className="text-gray-600 mb-6 text-lg">
        Great platform for the job seeker that searching for new career heights and passionate about startups.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="Job title or keyword"
          className="flex-1 border p-2 rounded-md"
        />
        <select className="w-full sm:w-48 border p-2 rounded-md">
          <option>Florence, Italy</option>
        </select>
        <button className="btn">Search my job</button>
      </div>
      <p className="text-gray-600 mb-6">
        Popular: <span className="text-blue-600">UI Designer</span>, <span className="text-blue-600">UX Researcher</span>, <span className="text-blue-600">Android</span>, <span className="text-blue-600">Admin</span>
      </p>
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Featured Jobs</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {jobs.slice(0, 5).map((job) => (
          <div key={job.id} className="card p-6">
            <h3 className="text-xl font-semibold text-gray-800">{job.title}</h3>
            <p className="text-gray-600 mt-1">{job.company}</p>
            <p className="text-gray-500 mt-1">{job.location}</p>
            <Link href={`/jobs/${job.id}`} className="inline-block mt-4 text-blue-600 font-medium hover:underline">
              Details →
            </Link>
          </div>
        ))}
      </div>
      <Link href="/jobs" className="inline-block mt-6 text-blue-600 font-medium hover:underline">
        Show all jobs →
      </Link>
    </div>
  );
}