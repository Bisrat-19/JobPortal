import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    HiOutlineMagnifyingGlass,
    HiOutlineBriefcase,
} from "react-icons/hi2";
import { jobs } from "../data/jobs";
import { companies } from "../data/companies";
import JobCard from "../components/jobs/JobCard";
import CompanyCard from "../components/companies/CompanyCard";

const HomePage = () => {
    const navigate = useNavigate();
    const [heroKeyword, setHeroKeyword] = useState("");

    const featuredJobs = jobs.slice(0, 3);
    const featuredCompanies = companies.slice(0, 3);

    const handleHeroSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (heroKeyword.trim()) params.set("q", heroKeyword.trim());

        const query = params.toString();
        navigate(query ? `/jobs?${query}` : "/jobs");
    };

    return (
        <div className="flex flex-col gap-10">
            <section className="bg-white border rounded-2xl shadow-sm px-6 py-8 lg:px-10 lg:py-10 flex flex-col lg:flex-row gap-8 lg:items-center">
                <div className="flex-1 space-y-6">
                    <div className="space-y-2">
                        <p className="text-xs font-medium uppercase tracking-wide text-emerald-600">
                            Welcome to JobPortal
                        </p>
                        <h1 className="text-3xl lg:text-4xl font-semibold text-slate-900 leading-tight">
                            Find your next dream job today.
                        </h1>
                        <p className="text-sm text-slate-600 max-w-xl">
                            Browse thousands of opportunities from top companies and apply in just a few clicks.
                        </p>
                    </div>

                    <form
                        onSubmit={handleHeroSearch}
                        className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex flex-wrap items-center gap-3"
                    >
                        <div className="flex-1 min-w-[180px] flex items-center gap-2 rounded-md bg-white border border-slate-200 px-3 py-2 focus-within:ring-2 focus-within:ring-emerald-500">
                            <HiOutlineMagnifyingGlass className="text-slate-400" />
                            <input
                                type="text"
                                placeholder="Job title or keyword"
                                value={heroKeyword}
                                onChange={(e) => setHeroKeyword(e.target.value)}
                                className="w-full text-sm outline-none border-none bg-transparent"
                            />
                        </div>
                        <button
                            type="submit"
                            className="inline-flex items-center justify-center rounded-md bg-emerald-600 px-6 py-2 text-sm font-medium text-white hover:bg-emerald-700"
                        >
                            Search Jobs
                        </button>
                    </form>

                    <div className="flex flex-wrap gap-6 text-xs text-slate-600">
                        <div>
                            <span className="block font-semibold text-slate-900">2k+</span>
                            <span>Open positions</span>
                        </div>
                        <div>
                            <span className="block font-semibold text-slate-900">150+</span>
                            <span>Companies hiring</span>
                        </div>
                    </div>
                </div>

                <div className="hidden lg:block flex-1">
                    <div className="h-64 rounded-xl bg-gradient-to-br from-emerald-50 via-sky-50 to-slate-50 border border-dashed border-emerald-200 flex items-center justify-center">
                        <div className="text-center space-y-2">
                            <HiOutlineBriefcase className="mx-auto text-emerald-500" size={40} />
                            <p className="text-sm font-medium text-slate-700">
                                Explore curated jobs and top companies.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="space-y-4">
                <div className="flex items-center gap-2">
                    <HiOutlineBriefcase className="text-emerald-600" />
                    <h2 className="text-lg font-semibold text-slate-900">Browse by category</h2>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                    {[
                        "Development",
                        "Design",
                        "Product",
                        "Marketing",
                    ].map((label) => (
                        <div
                            key={label}
                            className="flex items-center gap-2 rounded-lg bg-white border shadow-sm px-3 py-2"
                        >
                            <div className="h-8 w-8 rounded-md bg-emerald-50 flex items-center justify-center text-emerald-600">
                                <HiOutlineBriefcase size={16} />
                            </div>
                            <span className="font-medium text-slate-800">{label}</span>
                        </div>
                    ))}
                </div>
            </section>

            <section className="grid gap-8 lg:grid-cols-[2fr,1.3fr]">
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-slate-900">
                            Featured jobs
                        </h2>
                        <Link
                            to="/jobs"
                            className="text-xs font-medium text-emerald-600 hover:underline"
                        >
                            View all
                        </Link>
                    </div>
                    <div className="space-y-3">
                        {featuredJobs.map((job) => (
                            <JobCard key={job.id} job={job} />
                        ))}
                    </div>
                </div>

                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-slate-900">
                            Top companies
                        </h2>
                        <Link
                            to="/companies"
                            className="text-xs font-medium text-emerald-600 hover:underline"
                        >
                            View all
                        </Link>
                    </div>
                    <div className="space-y-3">
                        {featuredCompanies.map((company) => (
                            <CompanyCard key={company.id} company={company} />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;