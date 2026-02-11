import { useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { HiOutlineArrowLeft, HiOutlineMapPin, HiOutlineCurrencyDollar } from "react-icons/hi2";
import { jobs } from "../data/jobs";
import type { Job } from "../types/api";
import NotFoundPage from "./NotFoundPage";
import JobApplicationForm from "../components/jobs/JobApplicationForm";

const JobApplicationPage = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const navigate = useNavigate();

  const job: Job | undefined = useMemo(
    () => jobs.find((j) => j.id === jobId),
    [jobId]
  );

  if (!job) {
    return <NotFoundPage />;
  }

  return (
    <div className="flex flex-col gap-6">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-700"
      >
        <HiOutlineArrowLeft className="h-4 w-4" />
        Back
      </button>

      <section className="bg-white border rounded-lg shadow-sm p-6 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h1 className="text-xl font-semibold text-slate-900">{job.title}</h1>
            <p className="text-sm text-slate-600">{job.companyId}</p>
          </div>
          <Link
            to={`/jobs/${job.id}`}
            className="text-xs text-emerald-700 hover:text-emerald-800 font-medium"
          >
            View job details
          </Link>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
          <span className="inline-flex items-center gap-1">
            <HiOutlineMapPin className="text-slate-400" />
            {job.location}
          </span>
          <span className="inline-flex items-center gap-1">
            <HiOutlineCurrencyDollar className="text-slate-400" />
            {job.salaryRange}
          </span>
        </div>
      </section>

      <JobApplicationForm jobTitle={job.title} />
    </div>
  );
};

export default JobApplicationPage;
