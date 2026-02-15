import { useMemo, useState } from "react";
import { HiOutlineBuildingOffice2, HiOutlineBriefcase, HiOutlineUser, HiOutlineEnvelope, HiOutlinePaperClip } from "react-icons/hi2";
import { useAuth } from "../hooks/useAuth";
import { useJobBoard } from "../lib/JobBoardContext";

const CompanyDashboardPage = () => {
  const { user } = useAuth();
  const { jobs, applications, createJob } = useJobBoard();

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [salaryRange, setSalaryRange] = useState("");
  const [jobType, setJobType] = useState<"Full-Time" | "Part-Time" | "Contract">("Full-Time");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);

  if (!user || user.role !== "company") {
    return (
      <div className="text-sm text-red-600">
        You must be logged in as a company to view this page.
      </div>
    );
  }

  const companyJobs = useMemo(
    () => jobs.filter((job) => job.companyId === user.companyId),
    [jobs, user.companyId]
  );

  const handleCreateJob = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!title || !location || !salaryRange || !description) {
      setError("Please fill in all required job fields.");
      return;
    }

    if (!user.companyId) {
      setError("Missing company information on your account.");
      return;
    }

    setSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));
      createJob({
        title,
        location,
        salaryRange,
        jobType,
        description,
        requirements: [],
        companyId: user.companyId,
      });

      setTitle("");
      setLocation("");
      setSalaryRange("");
      setJobType("Full-Time");
      setDescription("");
    } catch {
      setError("Could not create job. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const selectedJobApplications = useMemo(
    () =>
      selectedJobId
        ? applications.filter((app) => app.jobId === selectedJobId)
        : [],
    [applications, selectedJobId]
  );

  return (
    <div className="flex flex-col gap-6">
      <header className="flex items-center gap-2">
        <HiOutlineBuildingOffice2 className="text-emerald-600" size={24} />
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Company Dashboard</h1>
          <p className="text-sm text-slate-600">
            Welcome back, {user.name}. Manage your jobs and applicants here.
          </p>
        </div>
      </header>

      <section className="grid gap-4 md:grid-cols-2 items-start">
        <div className="rounded-lg border bg-white p-4 shadow-sm space-y-3">
          <div className="flex items-center gap-2 mb-1">
            <HiOutlineBriefcase className="text-slate-500" />
            <h2 className="text-sm font-semibold text-slate-800">My Job Posts</h2>
          </div>

          {companyJobs.length === 0 ? (
            <p className="text-xs text-slate-500">
              You haven&apos;t posted any jobs yet. Create your first job on the
              right.
            </p>
          ) : (
            <ul className="space-y-2 text-sm">
              {companyJobs.map((job) => {
                const jobApps = applications.filter((app) => app.jobId === job.id);
                const isSelected = selectedJobId === job.id;

                return (
                  <li
                    key={job.id}
                    className={`rounded-md border px-3 py-2 flex items-center justify-between gap-2 cursor-pointer text-slate-700 hover:bg-slate-50 ${
                      isSelected ? "border-emerald-500 bg-emerald-50" : "border-slate-200"
                    }`}
                    onClick={() =>
                      setSelectedJobId((prev) => (prev === job.id ? null : job.id))
                    }
                  >
                    <div className="flex flex-col">
                      <span className="font-medium text-sm">{job.title}</span>
                      <span className="text-xs text-slate-500">{job.location}</span>
                    </div>
                    <span className="text-[11px] rounded-full bg-slate-100 px-2 py-0.5 text-slate-600">
                      {jobApps.length} applicant{jobApps.length === 1 ? "" : "s"}
                    </span>
                  </li>
                );
              })}
            </ul>
          )}

          {selectedJobId && (
            <div className="mt-4 border-t pt-3">
              <h3 className="text-xs font-semibold text-slate-800 mb-2">
                Applicants
              </h3>
              {selectedJobApplications.length === 0 ? (
                <p className="text-xs text-slate-500">
                  No applications yet for this job.
                </p>
              ) : (
                <ul className="space-y-2 text-xs">
                  {selectedJobApplications.map((app) => (
                    <li
                      key={app.id}
                      className="rounded-md border border-slate-200 px-3 py-2 bg-slate-50 space-y-1"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="inline-flex items-center gap-1 font-medium text-slate-800">
                          <HiOutlineUser className="text-slate-400" />
                          {app.applicantName}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {new Date(app.appliedAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-slate-600">
                        <HiOutlineEnvelope className="text-slate-400" />
                        <a
                          href={`mailto:${app.applicantEmail}`}
                          className="hover:underline break-all"
                        >
                          {app.applicantEmail}
                        </a>
                      </div>
                      <div className="flex items-center gap-1 text-slate-600">
                        <HiOutlinePaperClip className="text-slate-400" />
                        <a
                          href={app.resumeUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="hover:underline break-all"
                        >
                          Resume / Portfolio
                        </a>
                      </div>
                      {app.coverLetter && (
                        <p className="text-[11px] text-slate-600 mt-1 line-clamp-3">
                          {app.coverLetter}
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>

        <div className="rounded-lg border bg-white p-4 shadow-sm space-y-3">
          <h2 className="text-sm font-semibold text-slate-800 mb-1">Post a New Job</h2>
          <p className="text-xs text-slate-500 mb-2">
            Create a job listing that freelancers can discover on the jobs page.
          </p>

          {error && (
            <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-md px-3 py-2">
              {error}
            </p>
          )}

          <form className="space-y-3" onSubmit={handleCreateJob}>
            <div className="space-y-1 text-xs">
              <label className="block text-slate-700">Job title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-md border border-slate-300 px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="e.g. Frontend Developer"
              />
            </div>

            <div className="space-y-1 text-xs">
              <label className="block text-slate-700">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full rounded-md border border-slate-300 px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="e.g. Remote or City, Country"
              />
            </div>

            <div className="space-y-1 text-xs">
              <label className="block text-slate-700">Salary range</label>
              <input
                type="text"
                value={salaryRange}
                onChange={(e) => setSalaryRange(e.target.value)}
                className="w-full rounded-md border border-slate-300 px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="e.g. $80k – $100k / year"
              />
            </div>

            <div className="space-y-1 text-xs">
              <label className="block text-slate-700">Job type</label>
              <select
                value={jobType}
                onChange={(e) =>
                  setJobType(e.target.value as "Full-Time" | "Part-Time" | "Contract")
                }
                className="w-full rounded-md border border-slate-300 px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
              >
                <option value="Full-Time">Full-Time</option>
                <option value="Part-Time">Part-Time</option>
                <option value="Contract">Contract</option>
              </select>
            </div>

            <div className="space-y-1 text-xs">
              <label className="block text-slate-700">Short description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full rounded-md border border-slate-300 px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-emerald-500 min-h-[80px]"
                placeholder="Briefly describe the role and responsibilities."
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-md bg-emerald-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-60"
            >
              {submitting ? "Posting..." : "Post Job"}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default CompanyDashboardPage;
