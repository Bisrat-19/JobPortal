import { lazy } from "react";

export const LazyHomePage = lazy(() => import("../pages/HomePage"));
export const LazyJobsPage = lazy(() => import("../pages/JobsPage"));
export const LazyJobDetailsPage = lazy(() => import("../pages/JobDetailsPage"));
export const LazyJobApplicationPage = lazy(() => import("../pages/JobApplicationPage"));
export const LazyCompaniesPage = lazy(() => import("../pages/CompaniesPage"));  
export const LazyCompanyDetailsPage = lazy(() => import("../pages/CompanyDetailsPage"));
export const LazySavedJobsPage = lazy(() => import("../pages/SavedJobsPage"));
export const LazySignInPage = lazy(() => import("../pages/SignInPage"));
export const LazySignUpPage = lazy(() => import("../pages/SignUpPage"));
export const LazyNotFoundPage = lazy(() => import("../pages/NotFoundPage")); 
export const LazyCompanyDashboardPage = lazy(() => import("../pages/CompanyDashboardPage"));
export const LazyProfilePage = lazy(() => import("../pages/ProfilePage"));