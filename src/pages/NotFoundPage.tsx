import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16">
      <h1 className="text-2xl font-semibold text-slate-900">Page not found</h1>
      <p className="text-sm text-slate-600">
        The page you are looking for doesn&apos;t exist or was moved.
      </p>
      <Link
        to="/"
        className="mt-2 inline-flex items-center rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
      >
        Go back home
      </Link>
    </div>
  );
};

export default NotFoundPage;