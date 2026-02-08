import { useParams, Link } from "react-router-dom";
import { HiOutlineBuildingOffice2, HiOutlineMapPin, HiOutlineBriefcase } from "react-icons/hi2";
import { companies } from "../data/companies";
import { jobs } from "../data/jobs";
import type { Company } from "../types/company";
import type { Job } from "../types/job";
import NotFoundPage from "./NotFoundPage";
import JobCard from "../components/jobs/JobCard";

const CompanyDetailsPage = () => {
  const { companyId } = useParams<{ companyId: string }>();

  const company: Company | undefined = companies.find(
    (c) => c.id === companyId
  );

  if (!company) {
    return <NotFoundPage />;
  }

  const companyJobs: Job[] = jobs.filter(
    (job) => job.companyId === company.id
  );

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Main content */}
      <div className="flex-1 space-y-6">
        {/* Header card */}
        <section className="bg-white border rounded-lg shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-semibold">
                {company.name[0].toUpperCase()}
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-slate-900">
                  {company.name}
                </h1>
                <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-slate-600">
                  <span className="inline-flex items-center gap-1">
                    <HiOutlineMapPin className="text-slate-400" />
                    <span>{company.location}</span>
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <HiOutlineBuildingOffice2 className="text-slate-400" />
                    <span>{company.industry}</span>
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <HiOutlineBriefcase className="text-slate-400" />
                    <span>{companyJobs.length} open roles</span>
                  </span>
                </div>
              </div>
            </div>

            <Link
              to="/companies"
              className="hidden sm:inline-flex items-center rounded-md border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
            >
              Back to companies
            </Link>
          </div>

          <p className="text-sm text-slate-600 max-w-2xl">{company.tagline}</p>
        </section>

        {/* Open positions */}
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-slate-900">
            Open Positions
          </h2>

          {companyJobs.length === 0 && (
            <p className="text-sm text-slate-500">
              No open positions for this company.
            </p>
          )}

          {companyJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </section>
      </div>

      {/* Sidebar */}
      <aside className="w-full lg:w-72 space-y-4">
        <section className="bg-white border rounded-lg shadow-sm p-4 space-y-3">
          <h3 className="text-sm font-semibold text-slate-900">
            About {company.name}
          </h3>
          <p className="text-xs text-slate-600 whitespace-pre-line">
            {company.description}
          </p>
        </section>

        <section className="bg-white border rounded-lg shadow-sm p-4 space-y-2 text-xs text-slate-500">
          <p>
            Looking for more opportunities? Browse all roles on the
            <Link to="/jobs" className="ml-1 text-emerald-600 hover:underline">
              Jobs page
            </Link>
            .
          </p>
        </section>
      </aside>
    </div>
  );
};

export default CompanyDetailsPage;