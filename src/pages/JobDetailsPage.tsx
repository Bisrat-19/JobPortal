import { Link, useNavigate, useParams } from "react-router-dom";
import { jobs } from "../data/jobs";
import type { Job } from "../types/api";
import NotFoundPage from "./NotFoundPage";
import { HiOutlineMapPin, HiOutlineCurrencyDollar, HiOutlineClock, HiOutlineHeart } from "react-icons/hi2";
import { useAuth } from "../hooks/useAuth";

const JobDetailsPage = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const navigate = useNavigate();
  const { isAuthenticated, savedJobIds, toggleSavedJob } = useAuth();

  const job: Job | undefined = jobs.find((j) => j.id === jobId);

  if (!job) {
    return <NotFoundPage />;
  }

  const relatedJobs = jobs
    .filter(
      (j) =>
        j.id !== job.id &&
        (j.companyId === job.companyId || j.location === job.location)
    )
    .slice(0, 5);

  const isSaved = savedJobIds.includes(job.id);

  const handleSaveJob = () => {
    if (!isAuthenticated) {
      navigate("/signin");
      return;
    }
    toggleSavedJob(job.id);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="flex-1 space-y-6">
        <section className="bg-white border rounded-lg shadow-sm p-6 space-y-4">
          <h1 className="text-2xl font-semibold text-slate-900">
            {job.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100">
              <div className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-semibold">
                {job.companyId[0].toUpperCase()}
              </div>
              <span className="font-medium text-slate-800">
                {job.companyId}
              </span>
            </div>

            <div className="inline-flex items-center gap-1">
              <HiOutlineMapPin className="text-slate-400" />
              <span>{job.location}</span>
            </div>

            <div className="inline-flex items-center gap-1">
              <HiOutlineCurrencyDollar className="text-slate-400" />
              <span>{job.salaryRange}</span>
            </div>

            <span className="inline-flex items-center rounded-full border border-emerald-500 px-2 py-0.5 text-xs font-medium text-emerald-700 bg-emerald-50">
              {job.jobType}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
            <div className="inline-flex items-center gap-1">
              <HiOutlineClock className="text-slate-400" />
              <span>Posted {job.postedAt}</span>
            </div>
          </div>
    
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => navigate(`/jobs/${job.id}/apply`)}
              className="px-5 py-2 rounded-md bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700"
            >
              Apply Now
            </button>
            <button
              type="button"
              onClick={handleSaveJob}
              className={`px-5 py-2 rounded-md border text-sm font-medium flex items-center gap-2 transition-colors ${
                isSaved
                  ? "border-rose-300 bg-rose-50 text-rose-700 hover:bg-rose-100"
                  : "border-slate-300 text-slate-700 bg-white hover:bg-slate-50"
              }`}
            >
              <HiOutlineHeart
                className={isSaved ? "text-rose-500" : "text-slate-400"}
              />
              <span>{isSaved ? "Saved" : "Save Job"}</span>
            </button>
          </div>
        </section>

        <section className="bg-white border rounded-lg shadow-sm p-6 space-y-3">
          <h2 className="text-lg font-semibold text-slate-900">
            Job Description
          </h2>
          <p className="text-sm text-slate-600">
            {job.description}
          </p>
        </section>

        <section className="bg-white border rounded-lg shadow-sm p-6 space-y-3">
          <h2 className="text-lg font-semibold text-slate-900">
            Requirements
          </h2>
          <ul className="space-y-2 text-sm text-slate-600 list-disc list-inside">
            {job.requirements.map((req) => (
              <li key={req}>{req}</li>
            ))}
          </ul>
        </section>
      </div>

      <aside className="w-full lg:w-72 space-y-4">
        <section className="bg-white border rounded-lg shadow-sm p-4">
          <h3 className="text-sm font-semibold text-slate-900 mb-3">
            Related Jobs
          </h3>

          <div className="space-y-2 text-sm">
            {relatedJobs.length === 0 && (
              <p className="text-xs text-slate-500">
                No related jobs found.
              </p>
            )}

            {relatedJobs.map((rj) => (
              <Link
                key={rj.id}
                to={`/jobs/${rj.id}`}
                className="flex items-center justify-between rounded-md px-2 py-1.5 text-slate-700 hover:bg-slate-50"
              >
                <span>{rj.title}</span>
                <span className="text-xs text-slate-400">{rj.jobType}</span>
              </Link>
            ))}
          </div>

          <Link
            to="/jobs"
            className="mt-4 block w-full rounded-md bg-emerald-600 px-4 py-2 text-center text-sm font-medium text-white hover:bg-emerald-700"
          >
            View Jobs
          </Link>
        </section>
      </aside>
    </div>
  );
};

export default JobDetailsPage;
