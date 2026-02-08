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