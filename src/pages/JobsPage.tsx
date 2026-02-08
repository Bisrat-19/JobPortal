import { useState } from "react";
import { HiOutlineBriefcase } from "react-icons/hi2";
import { jobs } from "../data/jobs";
import JobCard from "../components/jobs/JobCard";
import JobFiltersBar from "../components/jobs/JobFiltersBar";

const JobsPage = () => {
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("All");
  const [jobType, setJobType] = useState("All");

  const locations = Array.from(new Set(jobs.map((job) => job.location)));

  const filteredJobs = jobs.filter((job) => {
    const k = keyword.toLowerCase().trim();
    const matchesKeyword =
      k === "" ||
      job.title.toLowerCase().includes(k) ||
      job.companyId.toLowerCase().includes(k);

    const matchesLocation = location === "All" || job.location === location;
    const matchesJobType = jobType === "All" || job.jobType === jobType;

    return matchesKeyword && matchesLocation && matchesJobType;
  });

  return (
    <div className="flex flex-col gap-6">
      <header className="flex items-center gap-2">
        <HiOutlineBriefcase className="text-emerald-600" size={24} />
        <h1 className="text-2xl font-semibold text-slate-900">
          Job Listings Page
        </h1>
      </header>

      <section>
        <JobFiltersBar
          keyword={keyword}
          location={location}
          jobType={jobType}
          locations={locations}
          onKeywordChange={setKeyword}
          onLocationChange={setLocation}
          onJobTypeChange={setJobType}
        />
      </section>

      <section className="space-y-3">
        {filteredJobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </section>
    </div>
  );
};

export default JobsPage;