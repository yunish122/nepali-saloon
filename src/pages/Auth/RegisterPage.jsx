import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

function RegisterPage() {
    const navigate = useNavigate()

    const [fullName, setFullName] = useState('')
    const [emailAddress, setEmailAddress] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [userRole, setUserRole] = useState('customer')
    const [fieldErrors, setFieldErrors] = useState({})
    const [formError, setFormError] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    function updateFullName(e) {
        setFullName(e.target.value)
    }

    function updateEmailAddress(e) {
        setEmailAddress(e.target.value)
    }

    function updatePassword(e) {
        setPassword(e.target.value)
    }

    function updateConfirmPassword(e) {
        setConfirmPassword(e.target.value)
    }

    function updateRole(e) {
        setUserRole(e.target.value)
    }

    async function submitRegisterData(e) {
        e.preventDefault()
        setIsSubmitting(true)
        setFormError('')
        setFieldErrors({})

        try {
            await axios.get('http://localhost:81/sanctum/csrf-cookie', { withCredentials: true, withXSRFToken: true })
            const res = await axios.post(
                'http://localhost:81/register',
                {
                    name: fullName,
                    email: emailAddress,
                    password,
                    password_confirmation: confirmPassword,
                    role: userRole,
                },
                { withCredentials: true, withXSRFToken: true }
            )

            if (res.status === 200 || res.status === 201 || res.status === 204) {
                navigate('/customer')
            }
        } catch (err) {
            if (err.response?.status === 422 && err.response?.data?.errors) {
                setFieldErrors(err.response.data.errors)
            } else {
                setFormError(err.response?.data?.message || 'Unable to create account. Please try again.')
            }
            console.log(err.response)
        } finally {
            setIsSubmitting(false)
        }
    }

    const inputBaseClass = 'h-11 w-full rounded-lg border border-slate-200 bg-white px-4 text-[15px] text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-slate-300 focus:ring-2 focus:ring-slate-100'
    const radioBaseClass = 'h-4 w-4 border-slate-300 text-slate-900 focus:ring-slate-300'

    return (
        <div className="min-h-screen bg-[#eef2f7] px-4 py-8 text-slate-700">
            <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-[1200px] flex-col items-center justify-center">
                <div className="mb-10 flex flex-col items-center text-center">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#121b31] text-3xl font-semibold text-white shadow-[0_8px_20px_rgba(18,27,49,0.18)]">
                        S
                    </div>
                    <h1 className="text-3xl font-semibold tracking-tight text-slate-700">
                        SalonHub
                    </h1>
                    <p className="mt-2 text-[15px] text-slate-500">
                        Create Your Account
                    </p>
                </div>

                <form onSubmit={submitRegisterData} className="w-full max-w-[420px] rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.08)]">
                    <div className="mb-5">
                        <h2 className="text-xl font-semibold text-slate-700">Sign Up</h2>
                        <p className="mt-1 text-sm text-slate-500">Register to get started with SalonHub</p>
                    </div>

                    <div className="space-y-4">
                        <label className="block">
                            <span className="mb-2 block text-sm font-semibold text-slate-700">Full Name</span>
                            <input
                                type="text"
                                onChange={updateFullName}
                                value={fullName}
                                placeholder="Priya Sharma"
                                className={inputBaseClass}
                            />
                            {fieldErrors.name && <p className="mt-2 text-sm text-red-600">{fieldErrors.name[0]}</p>}
                        </label>

                        <label className="block">
                            <span className="mb-2 block text-sm font-semibold text-slate-700">Email Address</span>
                            <input
                                type="email"
                                onChange={updateEmailAddress}
                                value={emailAddress}
                                placeholder="priya@example.com"
                                className={inputBaseClass}
                            />
                            {fieldErrors.email && <p className="mt-2 text-sm text-red-600">{fieldErrors.email[0]}</p>}
                        </label>

                        <label className="block">
                            <span className="mb-2 block text-sm font-semibold text-slate-700">Password</span>
                            <input
                                type="password"
                                onChange={updatePassword}
                                value={password}
                                placeholder="••••••••"
                                className={inputBaseClass}
                            />
                            {fieldErrors.password && <p className="mt-2 text-sm text-red-600">{fieldErrors.password[0]}</p>}
                        </label>

                        <label className="block">
                            <span className="mb-2 block text-sm font-semibold text-slate-700">Confirm Password</span>
                            <input
                                type="password"
                                onChange={updateConfirmPassword}
                                value={confirmPassword}
                                placeholder="••••••••"
                                className={inputBaseClass}
                            />
                            {fieldErrors.password_confirmation && <p className="mt-2 text-sm text-red-600">{fieldErrors.password_confirmation[0]}</p>}
                        </label>

                        <fieldset>
                            <legend className="mb-2 block text-sm font-semibold text-slate-700">Select Your Role</legend>
                            <div className="space-y-2 text-[15px] text-slate-600">
                                <label className="flex cursor-pointer items-center gap-3">
                                    <input
                                        type="radio"
                                        name="role"
                                        value="customer"
                                        checked={userRole === 'customer'}
                                        onChange={updateRole}
                                        className={radioBaseClass}
                                    />
                                    <span>Customer</span>
                                </label>
                                <label className="flex cursor-pointer items-center gap-3">
                                    <input
                                        type="radio"
                                        name="role"
                                        value="staff"
                                        checked={userRole === 'staff'}
                                        onChange={updateRole}
                                        className={radioBaseClass}
                                    />
                                    <span>Salon Staff</span>
                                </label>
                                <label className="flex cursor-pointer items-center gap-3">
                                    <input
                                        type="radio"
                                        name="role"
                                        value="owner"
                                        checked={userRole === 'owner'}
                                        onChange={updateRole}
                                        className={radioBaseClass}
                                    />
                                    <span>Salon Owner</span>
                                </label>
                            </div>
                            {fieldErrors.role && <p className="mt-2 text-sm text-red-600">{fieldErrors.role[0]}</p>}
                        </fieldset>

                        {formError && <p className="text-sm text-red-600">{formError}</p>}

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="mt-2 h-11 w-full rounded-lg bg-[#121b31] text-[15px] font-semibold text-white transition hover:bg-[#0d1527] focus:outline-none focus:ring-2 focus:ring-[#121b31]/20 disabled:cursor-not-allowed disabled:opacity-70"
                        >
                            {isSubmitting ? 'Creating Account...' : 'Create Account'}
                        </button>
                    </div>

                    <div className="my-6 h-px w-full bg-slate-200" />

                    <p className="text-center text-[15px] text-slate-500">
                        Already have an account? <button type="button" onClick={() => navigate('/login')} className="font-semibold text-slate-700">Sign in</button>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default RegisterPage
