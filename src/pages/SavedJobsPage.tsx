import { HiOutlineHeart } from "react-icons/hi2";
import { jobs } from "../data/jobs";
import JobCard from "../components/jobs/JobCard";
import { useAuth } from "../hooks/useAuth";

const SavedJobsPage = () => {
  const { savedJobIds } = useAuth();

  const savedJobs = jobs.filter((job) => savedJobIds.includes(job.id));

  return (
    <div className="flex flex-col gap-6">
      <header className="flex items-center gap-2">
        <HiOutlineHeart className="text-rose-500" size={24} />
        <h1 className="text-2xl font-semibold text-slate-900">Saved Jobs</h1>
      </header>

      {savedJobs.length === 0 ? (
        <div className="bg-white border rounded-lg shadow-sm p-6 text-sm text-slate-600">
          <p>You have no saved jobs yet.</p>
          <p className="mt-2">
            Browse the job listings and click "Save Job" on any job you like.
          </p>
        </div>
      ) : (
        <section className="space-y-3">
          {savedJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </section>
      )}
    </div>
  );
};

export default SavedJobsPage;
