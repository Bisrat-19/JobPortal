import { Link } from "react-router-dom";
import {
  HiOutlineDocumentText,
  HiOutlineMapPin,
  HiOutlineCurrencyDollar,
  HiOutlineClock,
} from "react-icons/hi2";
import type { Job } from "../../types/job";

interface JobCardProps {
  job: Job;
}

const JobCard = ({ job }: JobCardProps) => {
  return (
    <article className="bg-white border rounded-lg shadow-sm p-4 flex justify-between gap-4">
      <div className="flex gap-4 min-w-0">
        <div className="h-12 w-12 rounded-md bg-blue-600 flex items-center justify-center text-white text-xl">
          <HiOutlineDocumentText />
        </div>

        <div className="space-y-1 min-w-0">
          <Link
            to={`/jobs/${job.id}`}
            className="block text-blue-700 font-semibold hover:underline truncate"
          >
            {job.title}
          </Link>
          <div className="text-sm text-slate-500">
            {job.companyId} · 30+ applicants
          </div>
          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
            <span className="inline-flex items-center gap-1">
              <HiOutlineMapPin className="text-slate-400" />
              <span>{job.location}</span>
            </span>
            <span className="inline-flex items-center gap-1">
              <HiOutlineCurrencyDollar className="text-slate-400" />
              <span>{job.salaryRange}</span>
            </span>
            <span className="inline-flex items-center rounded-full border border-emerald-500 px-2 py-0.5 text-xs font-medium text-emerald-700 bg-emerald-50">
              {job.jobType}
            </span>
          </div>
        </div>
      </div>

      <div className="text-right text-sm text-slate-500 space-y-1 flex-shrink-0">
        <div className="inline-flex items-center gap-1">
          <HiOutlineClock className="text-slate-400" />
          <span>Posted {job.postedAt}</span>
        </div>
        <div className="text-xs text-slate-400">{job.salaryRange}</div>
      </div>
    </article>
  );
};

export default JobCard;