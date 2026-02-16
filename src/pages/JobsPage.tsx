import { useCallback } from "react";
import { HiOutlineBriefcase } from "react-icons/hi2";
import JobCard from "../components/jobs/JobCard";
import JobFiltersBar from "../components/jobs/JobFiltersBar";
import { useJobFilters } from "../hooks/useJobFilters";

const JobsPage = () => {
  const {
    keyword,
    setKeyword,
    location,
    setLocation,
    jobType,
    setJobType,
    locations,
    filteredJobs,
  } = useJobFilters();

  const handleKeywordChange = useCallback(
    (value: string) => {
      setKeyword(value);
    },
    [setKeyword],
  );

  const handleLocationChange = useCallback(
    (value: string) => {
      setLocation(value);
    },
    [setLocation],
  );

  const handleJobTypeChange = useCallback(
    (value: string) => {
      setJobType(value);
    },
    [setJobType],
  );

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
          onKeywordChange={handleKeywordChange}
          onLocationChange={handleLocationChange}
          onJobTypeChange={handleJobTypeChange}
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