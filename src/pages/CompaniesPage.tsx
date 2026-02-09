import { useState } from "react";
import { HiOutlineMagnifyingGlass, HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { companies } from "../data/companies";
import CompanyCard from "../components/companies/CompanyCard";

const CompaniesPage = () => {
  const [search, setSearch] = useState("");

  const searchLower = search.toLowerCase().trim();

  const filteredCompanies = companies.filter((company) => {
    if (searchLower === "") return true;
    return (
      company.name.toLowerCase().includes(searchLower) ||
      company.tagline.toLowerCase().includes(searchLower) ||
      company.industry.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="flex flex-col gap-6">
      <header className="flex items-center gap-2">
        <HiOutlineBuildingOffice2 className="text-emerald-600" size={24} />
        <h1 className="text-2xl font-semibold text-slate-900">
          Company Listings Page
        </h1>
      </header>

      <section>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="bg-white border rounded-lg shadow-sm p-4 flex flex-wrap items-center gap-3"
        >
          <div className="flex-1 min-w-[220px] flex items-center gap-2 rounded-md border border-slate-300 px-3 py-2 bg-white focus-within:ring-2 focus-within:ring-emerald-500">
            <HiOutlineMagnifyingGlass className="text-slate-400" />
            <input
              type="text"
              placeholder="Search company names..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full text-sm outline-none border-none bg-transparent"
            />
          </div>
          <button
            type="submit"
            className="rounded-md bg-emerald-600 px-5 py-2 text-sm font-medium text-white hover:bg-emerald-700"
          >
            Search
          </button>
        </form>
      </section>

      <section className="space-y-3">
        {filteredCompanies.map((company) => (
          <CompanyCard key={company.id} company={company} />
        ))}
      </section>
    </div>
  );
};

export default CompaniesPage;