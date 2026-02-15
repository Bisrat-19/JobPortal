import { createContext, useContext, useState, type ReactNode } from "react";
import type { Job, JobApplication } from "../types/api";
import { jobs as seedJobs } from "../data/jobs";

interface JobBoardContextValue {
  jobs: Job[];
  applications: JobApplication[];
  createJob: (input: {
    title: string;
    location: string;
    salaryRange: string;
    jobType: Job["jobType"];
    description: string;
    requirements: string[];
    companyId: string;
  }) => Job;
  applyToJob: (input: {
    jobId: string;
    applicantName: string;
    applicantEmail: string;
    resumeUrl: string;
    coverLetter?: string;
  }) => JobApplication;
}

const JobBoardContext = createContext<JobBoardContextValue | undefined>(
  undefined
);

interface JobBoardProviderProps {
  children: ReactNode;
}

export const JobBoardProvider = ({ children }: JobBoardProviderProps) => {
  const [jobs, setJobs] = useState<Job[]>(seedJobs);
  const [applications, setApplications] = useState<JobApplication[]>([]);

  const createJob: JobBoardContextValue["createJob"] = ({
    title,
    location,
    salaryRange,
    jobType,
    description,
    requirements,
    companyId,
  }) => {
    const newJob: Job = {
      id: String(Date.now()),
      title,
      companyId,
      location,
      salaryRange,
      jobType,
      postedAt: "Just now",
      description,
      requirements,
    };

    setJobs((prev) => [newJob, ...prev]);
    return newJob;
  };

  const applyToJob: JobBoardContextValue["applyToJob"] = ({
    jobId,
    applicantName,
    applicantEmail,
    resumeUrl,
    coverLetter,
  }) => {
    const application: JobApplication = {
      id: String(Date.now()),
      jobId,
      applicantName,
      applicantEmail,
      resumeUrl,
      coverLetter,
      appliedAt: new Date().toISOString(),
    };

    setApplications((prev) => [application, ...prev]);
    return application;
  };

  return (
    <JobBoardContext.Provider
      value={{ jobs, applications, createJob, applyToJob }}
    >
      {children}
    </JobBoardContext.Provider>
  );
};

export const useJobBoard = () => {
  const ctx = useContext(JobBoardContext);
  if (!ctx) {
    throw new Error("useJobBoard must be used within a JobBoardProvider");
  }
  return ctx;
};
