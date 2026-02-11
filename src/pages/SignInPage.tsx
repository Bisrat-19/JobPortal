import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineLockClosed, HiOutlineEnvelope } from "react-icons/hi2";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "../hooks/useAuth";

const SignInPage = () => {
    const navigate = useNavigate();
    const { signIn, isAuthenticated } = useAuth();

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/home", { replace: true });
        }
    }, [isAuthenticated, navigate]);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [remember, setRemember] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        if (!email || !password) {
            setError("Email and password are required.");
            return;
        }

        setLoading(true);
        try {
            await signIn(email, password);
            if (remember) {
                localStorage.setItem("jobportal:lastEmail", email);
            }
            // clear sensitive fields after successful login
            setPassword("");
        } catch {
            setError("Sign in failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
            <div className="w-full max-w-md bg-white border rounded-2xl shadow-sm p-8 space-y-6">
                <div className="space-y-1">
                    <h1 className="text-xl font-semibold text-slate-900">Sign In</h1>
                    <p className="text-sm text-slate-600">Welcome back! Sign in to continue.</p>
                </div>

                {error && (
                    <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-md px-3 py-2">
                        {error}
                    </p>
                )}

                <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
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
                                placeholder="Enter your password"
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

                    <div className="flex items-center justify-between text-xs text-slate-600">
                        <label className="inline-flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={remember}
                                onChange={(e) => setRemember(e.target.checked)}
                                className="h-3 w-3 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                            />
                            <span>Remember me</span>
                        </label>
                        <button
                            type="button"
                            className="text-emerald-600 hover:underline"
                        >
                            Forgot password?
                        </button>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60"
                    >
                        {loading ? "Signing in..." : "Sign In"}
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
                    Don&apos;t have an account?{" "}
                    <Link to="/signup" className="text-emerald-600 hover:underline">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignInPage;