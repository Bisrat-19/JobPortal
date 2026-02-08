import type { ChangeEvent, FormEvent } from "react";
import { HiOutlineMagnifyingGlass, HiOutlineMapPin } from "react-icons/hi2";

interface JobFiltersBarProps {
  keyword: string;
  location: string;
  jobType: string;
  locations: string[];
  onKeywordChange: (value: string) => void;
  onLocationChange: (value: string) => void;
  onJobTypeChange: (value: string) => void;
  onSearch?: () => void; // optional for now
}

const JobFiltersBar = ({
  keyword,
  location,
  jobType,
  locations,
  onKeywordChange,
  onLocationChange,
  onJobTypeChange,
  onSearch,
}: JobFiltersBarProps) => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch?.();
  };

  const handleKeyword = (e: ChangeEvent<HTMLInputElement>) =>
    onKeywordChange(e.target.value);

  const handleLocation = (e: ChangeEvent<HTMLSelectElement>) =>
    onLocationChange(e.target.value);

  const handleJobType = (e: ChangeEvent<HTMLSelectElement>) =>
    onJobTypeChange(e.target.value);

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border rounded-lg shadow-sm p-4 flex flex-wrap gap-3 items-center"
    >
      {/* Keyword */}
      <div className="flex-1 min-w-[160px] flex items-center gap-2 rounded-md border border-slate-300 px-3 py-2 bg-white focus-within:ring-2 focus-within:ring-emerald-500">
        <HiOutlineMagnifyingGlass className="text-slate-400" />
        <input
          type="text"
          placeholder="Job title or keyword"
          value={keyword}
          onChange={handleKeyword}
          className="w-full text-sm outline-none border-none bg-transparent"
        />
      </div>

      {/* Location */}
      <div className="min-w-[160px] flex items-center gap-2 rounded-md border border-slate-300 px-3 py-2 bg-white focus-within:ring-2 focus-within:ring-emerald-500">
        <HiOutlineMapPin className="text-slate-400" />
        <select
          value={location}
          onChange={handleLocation}
          className="w-full text-sm outline-none border-none bg-transparent"
        >
          <option value="All">Location</option>
          {locations.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      </div>

      {/* Job Category */}
      <select
        value={jobType}
        onChange={handleJobType}
        className="min-w-[140px] rounded-md border border-slate-300 px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
      >
        <option value="All">Category</option>
        <option value="Full-Time">Full-Time</option>
        <option value="Part-Time">Part-Time</option>
        <option value="Contract">Contract</option>
      </select>

      {/* Search button */}
      <button
        type="submit"
        className="rounded-md bg-emerald-600 text-white px-5 py-2 text-sm font-medium hover:bg-emerald-700"
      >
        Search
      </button>
    </form>
  );
};

export default JobFiltersBar;