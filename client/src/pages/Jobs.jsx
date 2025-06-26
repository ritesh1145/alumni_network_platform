import { useEffect, useState } from 'react';
import { Briefcase, MapPin } from 'lucide-react';

const dummyJobs = [
  {
    id: 1,
    title: 'Frontend Developer',
    company: 'Techverse Ltd.',
    location: 'Bangalore, India',
    type: 'Full-time',
    applyUrl: 'https://company.com/job/frontend',
  },
  {
    id: 2,
    title: 'Product Manager',
    company: 'Innova Corp.',
    location: 'Remote',
    type: 'Remote',
    applyUrl: 'https://company.com/job/pm',
  },
  {
    id: 3,
    title: 'UI/UX Designer',
    company: 'Designify',
    location: 'Delhi, India',
    type: 'Part-time',
    applyUrl: 'https://company.com/job/designer',
  },
];

const Jobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    // Replace with real API call
    setJobs(dummyJobs);
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Job Opportunities</h1>

      {jobs.length === 0 ? (
        <p className="text-gray-600">No jobs available at the moment.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-2xl shadow-md p-5 transition hover:shadow-lg flex flex-col justify-between"
            >
              <div>
                <h2 className="text-xl font-semibold text-blue-700 mb-1">{job.title}</h2>
                <p className="text-gray-700 font-medium mb-2">{job.company}</p>

                <div className="flex items-center text-sm text-gray-600 mb-1">
                  <MapPin className="w-4 h-4 mr-1" />
                  {job.location}
                </div>

                <div className="flex items-center text-sm text-gray-600 mb-4">
                  <Briefcase className="w-4 h-4 mr-1" />
                  {job.type}
                </div>
              </div>

              <a
                href={job.applyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto bg-blue-600 hover:bg-blue-700 text-white text-center px-4 py-2 rounded-lg transition"
              >
                Apply Now
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Jobs;