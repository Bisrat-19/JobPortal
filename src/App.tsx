import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import JobsPage from "./pages/JobsPage";
import JobDetailsPage from "./pages/JobDetailsPage";
import CompaniesPage from "./pages/CompaniesPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import NotFoundPage from "./pages/NotFoundPage";
import CompanyDetailsPage from "./pages/CompanyDetailsPage";

const App = () => {
  return (
    <Routes>
      {/* routes that share the main layout */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/jobs/:jobId" element={<JobDetailsPage />} />
        <Route path="/companies" element={<CompaniesPage />} />
        <Route path="/companies/:companyId" element={<CompanyDetailsPage />} />
      </Route>

      {/* auth routes */}
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/signup" element={<SignUpPage />} />

      {/* catch-all route */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;