import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        role: 'customer',
    });
    const [showDemoHint, setShowDemoHint] = useState(false);

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    const demoCredentials = {
        customer: { email: 'customer@example.com', password: 'password' },
        staff: { email: 'staff@example.com', password: 'password' },
        owner: { email: 'owner@example.com', password: 'password' },
    };

    const fillDemoCredentials = (role) => {
        const creds = demoCredentials[role];
        setData({
            email: creds.email,
            password: creds.password,
            role: role,
        });
    };

    return (
        <GuestLayout>
            <Head title="Sign In" />

            <div className="mb-6">
                <h2 className="text-3xl font-bold text-[#2d3e52]">Sign In</h2>
                <p className="mt-2 text-lg text-[#7a8fa3]">Enter your credentials to access your account</p>
            </div>

            {status && (
                <div className="mb-4 rounded-lg bg-green-50 p-3 text-sm font-medium text-green-700">
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
                <div className="mb-5">
                    <InputLabel htmlFor="email" value="Email Address" />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-2 block w-full rounded-lg border border-[#d4dce6] bg-[#f9fafb] px-4 py-2 text-[#2d3e52] focus:border-[#0e1b3a] focus:outline-none"
                        placeholder="your@email.com"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                    />
                    <InputError message={errors.email} className="mt-2 text-red-600" />
                </div>

                <div className="mb-5">
                    <InputLabel htmlFor="password" value="Password" />
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-2 block w-full rounded-lg border border-[#d4dce6] bg-[#f9fafb] px-4 py-2 text-[#2d3e52] focus:border-[#0e1b3a] focus:outline-none"
                        placeholder="••••••••"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />
                    <InputError message={errors.password} className="mt-2 text-red-600" />
                </div>

                <div className="mb-6">
                    <label className="mb-4 block text-lg font-semibold text-[#2d3e52]">Select Your Role</label>
                    <div className="space-y-3">
                        {[
                            { value: 'customer', label: 'Customer' },
                            { value: 'staff', label: 'Salon Staff' },
                            { value: 'owner', label: 'Salon Owner' },
                        ].map((role) => (
                            <label key={role.value} className="flex items-center gap-3 cursor-pointer">
                                <input
                                    type="radio"
                                    name="role"
                                    value={role.value}
                                    checked={data.role === role.value}
                                    onChange={(e) => setData('role', e.target.value)}
                                    className="h-5 w-5 cursor-pointer border-[#d4dce6] text-[#0e1b3a]"
                                />
                                <span className="text-lg text-[#2d3e52]">{role.label}</span>
                            </label>
                        ))}
                    </div>
                    <InputError message={errors.role} className="mt-2 text-red-600" />
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="w-full rounded-lg border border-[#0e1b3a] bg-[#0e1b3a] py-3 text-center text-lg font-semibold text-white transition hover:bg-[#152d66] disabled:opacity-50"
                >
                    Sign In
                </button>
            </form>

            <div className="mt-6 text-center">
                <p className="text-lg text-[#7a8fa3]">
                    Don't have an account?{' '}
                    <Link
                        href={route('register')}
                        className="font-semibold text-[#0e1b3a] hover:text-[#152d66]"
                    >
                        Create one
                    </Link>
                </p>
            </div>

            <div className="mt-8 rounded-xl bg-[#eef2f6] p-5">
                <h3 className="mb-4 text-center font-semibold text-[#2d3e52]">Demo Credentials</h3>
                <div className="grid gap-3 text-center">
                    <div>
                        <p className="font-semibold text-[#2d3e52]">Customer</p>
                        <p className="text-sm text-[#7a8fa3]">customer@example.com</p>
                    </div>
                    <div>
                        <p className="font-semibold text-[#2d3e52]">Staff</p>
                        <p className="text-sm text-[#7a8fa3]">staff@example.com</p>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
