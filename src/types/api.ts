export interface AuthUser {
  name: string;
  email: string;
}

export interface Job {
  id: string;
  title: string;
  companyId: string;
  location: string;
  salaryRange: string;
  jobType: "Full-Time" | "Part-Time" | "Contract";
  postedAt: string;
  description: string;
  requirements: string[];
}

export interface Company {
  id: string;
  name: string;
  logoUrl: string;
  location: string;
  industry: string;
  tagline: string;
  description: string;
}

export interface JobApplication {
  id: string;
  jobId: string;
  applicantName: string;
  applicantEmail: string;
  resumeUrl: string;
  coverLetter?: string;
  appliedAt: string; // ISO date string
}
