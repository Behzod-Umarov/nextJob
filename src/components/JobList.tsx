'use client';

import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { getJobs } from '@/lib/api';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import ErrorMessage from '@/components/ui/ErrorMessage';

export default function JobList() {
  const { 
    data: jobs, 
    isLoading, 
    isError, 
    error 
  } = useQuery({
    queryKey: ['jobs'],
    queryFn: getJobs,
    staleTime: 1000 * 60 * 5
  });

  if (isLoading) {
    return (
      <div className="py-12 flex justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (isError) {
    return (
      <ErrorMessage 
        title="Error loading jobs"
        message={error?.message || 'Failed to fetch jobs'} 
      />
    );
  }

  return (
    <section className="py-8 md:py-16">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Featured Jobs</h2>
        <Link href="/jobs" className="text-blue-600 hover:underline flex items-center">
          Show all jobs <span className="ml-2">→</span>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {jobs?.map((job) => (
          <Link key={job.id} href={`/jobs/${job.id}`}>
            <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow h-full">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-xl font-bold text-gray-700">
                    {job.company.charAt(0)}
                  </span>
                </div>
                <div className="flex-1">
                  <span className="inline-block px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded-md mb-2">
                    {job.work_type}
                  </span>
                  <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                  <p className="text-sm text-gray-600">
                    {job.company} • {job.location}
                  </p>
                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                    {job.description}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {job.tags?.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}