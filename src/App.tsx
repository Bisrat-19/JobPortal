import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import RequireAuth from "./routes/RequireAuth";
import RequireCompany from "./routes/RequireCompany";
import {
  LazyCompaniesPage,
  LazyCompanyDetailsPage,
  LazyHomePage,
  LazyJobApplicationPage,
  LazyJobDetailsPage,
  LazyJobsPage,
  LazyCompanyDashboardPage,
  LazyNotFoundPage,
  LazySavedJobsPage,
  LazySignInPage,
  LazySignUpPage,
} from "./lib/lazy-components";

const App = () => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
          <div className="text-sm text-slate-500">Loading...</div>
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<LazySignInPage />} />
        <Route path="/signin" element={<LazySignInPage />} />
        <Route path="/signup" element={<LazySignUpPage />} />

        <Route
          element={
            <RequireAuth>
              <MainLayout />
            </RequireAuth>
          }
        >
          <Route path="/home" element={<LazyHomePage />} />
          <Route path="/jobs" element={<LazyJobsPage />} />
          <Route path="/jobs/:jobId" element={<LazyJobDetailsPage />} />
          <Route path="/jobs/:jobId/apply" element={<LazyJobApplicationPage />} />  
          <Route path="/saved-jobs" element={<LazySavedJobsPage />} />  
          <Route path="/companies" element={<LazyCompaniesPage />} />
          <Route path="/companies/:companyId" element={<LazyCompanyDetailsPage />} />
          <Route
            path="/company/dashboard"
            element={
              <RequireCompany>
                <LazyCompanyDashboardPage />
              </RequireCompany>
            }
          />
        </Route>

        <Route path="*" element={<LazyNotFoundPage />} />
      </Routes>
    </Suspense>
  );
};

export default App;