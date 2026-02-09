import { Link } from "react-router-dom";
import { HiOutlineBuildingOffice2, HiOutlineMapPin } from "react-icons/hi2";
import type { Company } from "../../types/company";

interface CompanyCardProps {
  company: Company;
}

const CompanyCard = ({ company }: CompanyCardProps) => {
  return (
    <article className="bg-white border rounded-lg shadow-sm p-4 flex items-center justify-between gap-4">
      <div className="flex items-center gap-4 min-w-0">
        {/* Logo circle (placeholder color) */}
        <div className="h-12 w-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-lg font-semibold">
          {company.name[0].toUpperCase()}
        </div>

        <div className="space-y-1 min-w-0">
          <h3 className="text-base font-semibold text-blue-700 truncate">
            {company.name}
          </h3>
          <p className="text-sm text-slate-500 truncate">
            {company.tagline}
          </p>
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
            <span className="inline-flex items-center gap-1">
              <HiOutlineMapPin className="text-slate-400" />
              <span>{company.location}</span>
            </span>
            <span className="inline-flex items-center gap-1">
              <HiOutlineBuildingOffice2 className="text-slate-400" />
              <span>{company.industry}</span>
            </span>
          </div>
        </div>
      </div>

      <div className="flex-shrink-0">
        <Link
          to={`/companies/${company.id}`}
          className="inline-flex items-center rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
        >
          View Jobs
        </Link>
      </div>
    </article>
  );
};

export default CompanyCard;