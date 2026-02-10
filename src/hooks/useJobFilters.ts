import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { jobs } from "../data/jobs";

export const useJobFilters = () => {
  const [searchParams] = useSearchParams();
  const initialKeyword = searchParams.get("q") ?? "";

  const [keyword, setKeyword] = useState(initialKeyword);
  const [location, setLocation] = useState("All");
  const [jobType, setJobType] = useState("All");

  const locations = useMemo(
    () => Array.from(new Set(jobs.map((job) => job.location))),
    []
  );

  const filteredJobs = useMemo(() => {
    const k = keyword.toLowerCase().trim();

    return jobs.filter((job) => {
      const matchesKeyword =
        k === "" ||
        job.title.toLowerCase().includes(k) ||
        job.companyId.toLowerCase().includes(k);

      const matchesLocation = location === "All" || job.location === location;
      const matchesJobType = jobType === "All" || job.jobType === jobType;

      return matchesKeyword && matchesLocation && matchesJobType;
    });
  }, [keyword, location, jobType]);

  return {
    keyword,
    setKeyword,
    location,
    setLocation,
    jobType,
    setJobType,
    locations,
    filteredJobs,
  };
};
