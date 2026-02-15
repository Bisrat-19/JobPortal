import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlinePaperClip, HiOutlineUser, HiOutlineEnvelope } from "react-icons/hi2";
import { useAuth } from "../../hooks/useAuth";
import { useJobBoard } from "../../lib/JobBoardContext";

interface JobApplicationFormProps {
  jobId: string;
  jobTitle: string;
}

const JobApplicationForm = ({ jobId, jobTitle }: JobApplicationFormProps) => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const { applyToJob } = useJobBoard();

  const [fullName, setFullName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [resumeUrl, setResumeUrl] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!isAuthenticated) {
      navigate("/signin");
      return;
    }

    if (!fullName || !email || !resumeUrl) {
      setError("Please fill in your name, email, and resume link.");
      return;
    }

    setSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));

      applyToJob({
        jobId,
        applicantName: fullName,
        applicantEmail: email,
        resumeUrl,
        coverLetter,
      });

      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="bg-white border rounded-lg shadow-sm p-6 space-y-4">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold text-slate-900">
          Apply for this job
        </h2>
        <p className="text-xs text-slate-500">
          You are applying for <span className="font-medium">{jobTitle}</span>.
        </p>
      </div>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-md px-3 py-2">
          {error}
        </p>
      )}

      {submitted ? (
        <div className="rounded-md border border-emerald-100 bg-emerald-50 px-3 py-3 text-sm text-emerald-800">
          Your application has been submitted. We will contact you if your
          profile matches the role.
        </div>
      ) : (
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-700">
                Full name
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-400">
                  <HiOutlineUser size={16} />
                </span>
                <input
                  type="text"
                  className="w-full rounded-md border border-slate-300 bg-white px-9 py-2 text-sm text-slate-900 placeholder-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Your full name"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-700">
                Email
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-400">
                  <HiOutlineEnvelope size={16} />
                </span>
                <input
                  type="email"
                  className="w-full rounded-md border border-slate-300 bg-white px-9 py-2 text-sm text-slate-900 placeholder-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                />
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-700">
              Resume / Portfolio link
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-400">
                <HiOutlinePaperClip size={16} />
              </span>
              <input
                type="url"
                className="w-full rounded-md border border-slate-300 bg-white px-9 py-2 text-sm text-slate-900 placeholder-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                value={resumeUrl}
                onChange={(e) => setResumeUrl(e.target.value)}
                placeholder="Link to your resume or portfolio"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-700">
              Short cover letter (optional)
            </label>
            <textarea
              className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 min-h-[96px]"
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              placeholder="Tell us briefly why you are a good fit for this role."
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center justify-center rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {submitting ? "Submitting..." : "Submit application"}
            </button>
          </div>
        </form>
      )}
    </section>
  );
};

export default JobApplicationForm;
