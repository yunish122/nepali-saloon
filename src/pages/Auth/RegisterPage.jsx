import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_BASE_URL, ensureCsrfCookie } from '../../lib/auth';
import { getApiErrorMessage } from '../../lib/apiErrors';

function RegisterPage() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('customer');
    const [errorMessage, setErrorMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate()

    async function handleSubmit(e){
        e.preventDefault();
        setErrorMessage('');

        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match.');
            return;
        }

        setIsSubmitting(true);

        try{
            await ensureCsrfCookie();
            const res = await axios.post(
                `${API_BASE_URL}/register`,
                {
                    name,
                    email,
                    phoneNum: phone,
                    password,
                    role: role.toLowerCase(),
                },
                { withCredentials: true, withXSRFToken: true },
            );

            if (res.status === 201) {
                if (role === 'owner') {
                    navigate('/owner/path');
                } else if (role === 'staff') {
                    navigate('/staff/dashboard');
                } else {
                    navigate('/customer');
                }
                return;
            }

            if (res.data?.message) {
                setErrorMessage(res.data.message);
            }
        } catch (err) {
            setErrorMessage(getApiErrorMessage(err, 'Unable to create your account. Please try again.'));
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen w-full bg-slate-100 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans text-slate-800">

            {/* Logo & Header Section */}
            <div className="flex flex-col items-center mb-6">
                <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center shadow-sm">
                    <span className="text-white text-2xl font-bold tracking-wider">S</span>
                </div>
                <h1 className="mt-4 text-3xl font-bold text-slate-800 tracking-tight">SalonHub</h1>
                <p className="mt-1 text-sm text-slate-500">Create Your Account</p>
            </div>

            {/* Form Card Container */}
            <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
                <div className="mb-6">
                    <h2 className="text-xl font-bold text-slate-800">Sign Up</h2>
                    <p className="text-sm text-slate-400 mt-1">Register to get started with SalonHub</p>
                </div>

                {errorMessage && (
                    <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
                        {errorMessage}
                    </div>
                )}

                <form onSubmit={(e)=>{handleSubmit(e)}} className="space-y-4">

                    {/* Full Name Field */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">
                            Full Name
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Name"
                            className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm placeholder-slate-300 focus:outline-none focus:border-slate-400 transition"
                            required
                        />
                    </div>

                    {/* Email Field */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">
                            Email Address
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm placeholder-slate-300 focus:outline-none focus:border-slate-400 transition"
                            required
                        />
                    </div>

                    {/* Phone Number Field */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">
                            Phone Number
                        </label>
                        <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="+977"
                            className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm placeholder-slate-300 focus:outline-none focus:border-slate-400 transition"
                            required
                        />
                    </div>

                    {/* Password Field */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm placeholder-slate-300 focus:outline-none focus:border-slate-400 transition"
                            required
                        />
                    </div>

                    {/* Confirm Password Field */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm placeholder-slate-300 focus:outline-none focus:border-slate-400 transition"
                            required
                        />
                    </div>

                    {/* Role Selection Group */}
                    <div className="pt-2">
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Select Your Role
                        </label>
                        <div className="space-y-2.5">
                            {[
                                { label: 'Customer', value: 'customer' },
                                { label: 'Staff', value: 'staff' },
                                { label: 'Owner', value: 'owner' },
                            ].map((roleOption) => (
                                <label key={roleOption.value} className="flex items-center space-x-3 cursor-pointer select-none text-sm text-slate-600">
                                    <input
                                        type="radio"
                                        name="role"
                                        value={roleOption.value}
                                        checked={role === roleOption.value}
                                        onChange={(e) => setRole(e.target.value)}
                                        className="w-4 h-4 text-slate-900 border-slate-300 focus:ring-0 accent-slate-900"
                                    />
                                    <span>{roleOption.label}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-3 bg-[#0d1527] text-white text-sm font-medium rounded-xl hover:bg-slate-800 transition shadow-sm disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {isSubmitting ? 'Creating account...' : 'Create Account'}
                        </button>
                    </div>
                </form>

                {/* Footer Link */}
                <div className="mt-6 text-center text-sm text-slate-500">
                    Already have an account?{' '}
                    <Link to="/login" className="font-semibold text-slate-900 hover:underline">
                        Sign in
                    </Link>
                </div>
            </div>

        </div>
    );
}

export default RegisterPage