import type { Company } from "../types/company";

export const companies: Company[] = [
  {
    id: "techcorp",
    name: "TechCorp",
    logoUrl: "/logos/techcorp.png", 
    location: "New York, NY",
    industry: "Technology",
    tagline: "Innovative Tech Solutions",
    description:
      "TechCorp is a leading technology company focused on building scalable enterprise software and cloud-native solutions for global clients.",
  },
  {
    id: "innova",
    name: "InnovaTech",
    logoUrl: "/logos/innovatech.png",
    location: "San Francisco, CA",
    industry: "Technology",
    tagline: "Leading the Future",
    description:
      "InnovaTech specializes in modern web and mobile products, helping startups and enterprises design and launch innovative digital experiences.",
  },
];