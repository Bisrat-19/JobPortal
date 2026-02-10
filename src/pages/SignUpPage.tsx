import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineLockClosed, HiOutlineEnvelope, HiOutlineUser } from "react-icons/hi2";
import { useAuth } from "../hooks/useAuth";

const SignUpPage = () => {
    const navigate = useNavigate();
    const { signUp } = useAuth();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!name || !email || !password || !confirmPassword) {
            setError("All fields are required.");
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
            await signUp(name, email, password);
            navigate("/");
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

                <form onSubmit={handleSubmit} className="space-y-4">
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
                            />
                        </div>
                    </div>

                    <div className="space-y-1 text-sm">
                        <label className="block text-slate-700">Password</label>
                        <div className="flex items-center gap-2 rounded-md border border-slate-300 px-3 py-2 focus-within:ring-2 focus-within:ring-emerald-500">
                            <HiOutlineLockClosed className="text-slate-400" />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full text-sm outline-none border-none bg-transparent"
                                placeholder="Create a password"
                            />
                        </div>
                    </div>

                    <div className="space-y-1 text-sm">
                        <label className="block text-slate-700">Confirm Password</label>
                        <div className="flex items-center gap-2 rounded-md border border-slate-300 px-3 py-2 focus-within:ring-2 focus-within:ring-emerald-500">
                            <HiOutlineLockClosed className="text-slate-400" />
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full text-sm outline-none border-none bg-transparent"
                                placeholder="Repeat your password"
                            />
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