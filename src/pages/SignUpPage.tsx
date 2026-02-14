import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineLockClosed, HiOutlineEnvelope, HiOutlineUser, HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "../hooks/useAuth";
import type { UserRole } from "../types/api";

const SignUpPage = () => {
    const navigate = useNavigate();
    const { signUp, isAuthenticated } = useAuth();

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/home", { replace: true });
        }
    }, [isAuthenticated, navigate]);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [role, setRole] = useState<UserRole>("user");
    const [companyName, setCompanyName] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!name || !email || !password || !confirmPassword) {
            setError("All fields are required.");
            return;
        }

        if (role === "company" && !companyName) {
            setError("Company name is required for company accounts.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters.");
            return;
        }

        setLoading(true);
        try {
            await signUp(name, email, password, role, {
                companyName,
            });
            // clear sensitive fields after successful signup
            setPassword("");
            setConfirmPassword("");
            setCompanyName("");
        } catch {
            setError("Sign up failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
            <div className="w-full max-w-md bg-white border rounded-2xl shadow-sm p-8 space-y-6">
                <div className="space-y-1">
                    <h1 className="text-xl font-semibold text-slate-900">Sign Up</h1>
                    <p className="text-sm text-slate-600">Create an account to start applying.</p>
                </div>

                {error && (
                    <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-md px-3 py-2">
                        {error}
                    </p>
                )}

                <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
                    <div className="space-y-1 text-sm">
                        <label className="block text-slate-700">Account Type</label>
                        <div className="flex gap-3 text-xs">
                            <button
                                type="button"
                                onClick={() => setRole("user")}
                                className={`flex-1 rounded-md border px-3 py-2 text-left ${
                                    role === "user"
                                        ? "border-emerald-600 bg-emerald-50 text-emerald-700"
                                        : "border-slate-300 bg-white text-slate-700"
                                }`}
                            >
                                <span className="block font-medium">Freelancer</span>
                                <span className="block text-[11px] text-slate-500">
                                    Search and apply for jobs
                                </span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setRole("company")}
                                className={`flex-1 rounded-md border px-3 py-2 text-left ${
                                    role === "company"
                                        ? "border-emerald-600 bg-emerald-50 text-emerald-700"
                                        : "border-slate-300 bg-white text-slate-700"
                                }`}
                            >
                                <span className="block font-medium">Company</span>
                                <span className="block text-[11px] text-slate-500">
                                    Post jobs and manage applicants
                                </span>
                            </button>
                        </div>
                    </div>
                    <div className="space-y-1 text-sm">
                        <label className="block text-slate-700">Full Name</label>
                        <div className="flex items-center gap-2 rounded-md border border-slate-300 px-3 py-2 focus-within:ring-2 focus-within:ring-emerald-500">
                            <HiOutlineUser className="text-slate-400" />
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full text-sm outline-none border-none bg-transparent"
                                placeholder="Enter your full name"
                            />
                        </div>
                    </div>

                    {role === "company" && (
                        <div className="space-y-1 text-sm">
                            <label className="block text-slate-700">Company Name</label>
                            <div className="flex items-center gap-2 rounded-md border border-slate-300 px-3 py-2 focus-within:ring-2 focus-within:ring-emerald-500">
                                <HiOutlineBuildingOffice2 className="text-slate-400" />
                                <input
                                    type="text"
                                    value={companyName}
                                    onChange={(e) => setCompanyName(e.target.value)}
                                    className="w-full text-sm outline-none border-none bg-transparent"
                                    placeholder="Enter your company name"
                                />
                            </div>
                        </div>
                    )}

                    <div className="space-y-1 text-sm">
                        <label className="block text-slate-700">Email Address</label>
                        <div className="flex items-center gap-2 rounded-md border border-slate-300 px-3 py-2 focus-within:ring-2 focus-within:ring-emerald-500">
                            <HiOutlineEnvelope className="text-slate-400" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full text-sm outline-none border-none bg-transparent"
                                placeholder="Enter your email"
                                autoComplete="off"
                            />
                        </div>
                    </div>

                    <div className="space-y-1 text-sm">
                        <label className="block text-slate-700">Password</label>
                        <div className="flex items-center gap-2 rounded-md border border-slate-300 px-3 py-2 focus-within:ring-2 focus-within:ring-emerald-500">
                            <HiOutlineLockClosed className="text-slate-400" />
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full text-sm outline-none border-none bg-transparent"
                                placeholder="Create a password"
                                autoComplete="new-password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((v) => !v)}
                                className="text-xs text-slate-500 hover:text-slate-700"
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>

                    <div className="space-y-1 text-sm">
                        <label className="block text-slate-700">Confirm Password</label>
                        <div className="flex items-center gap-2 rounded-md border border-slate-300 px-3 py-2 focus-within:ring-2 focus-within:ring-emerald-500">
                            <HiOutlineLockClosed className="text-slate-400" />
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full text-sm outline-none border-none bg-transparent"
                                placeholder="Repeat your password"
                                autoComplete="new-password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword((v) => !v)}
                                className="text-xs text-slate-500 hover:text-slate-700"
                            >
                                {showConfirmPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-60"
                    >
                        {loading ? "Signing up..." : "Sign Up"}
                    </button>
                </form>

                <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span className="h-px flex-1 bg-slate-200" />
                    <span>or</span>
                    <span className="h-px flex-1 bg-slate-200" />
                </div>

                <button
                    type="button"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                    <FcGoogle className="h-4 w-4" />
                    <span>Continue with Google</span>
                </button>

                <p className="text-xs text-center text-slate-600">
                    Already have an account?{" "}
                    <Link to="/signin" className="text-emerald-600 hover:underline">
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignUpPage;