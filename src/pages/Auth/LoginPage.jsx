import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import CustomerPage from "../CustomerPage/CustomerPage"
import OwnerPage from "../OwnerPage/OwnerPage"
function LoginPage() {

    let [emailWordPress, setEmailWordPress] = useState('')
    let [passPress, setPassPress] = useState('')
    let [userRole, setUserRole] = useState('customer')

    const navigate = useNavigate()
    function updateEmailWordPress(e) {
        setEmailWordPress(e.target.value)
    }

    function updatePassPress(e) {
        setPassPress(e.target.value)
    }

    function updateRole(e) {
        setUserRole(e.target.value)
    }


    async function submitLoginData(e) {
        e.preventDefault()
        try {
            const csrf = await axios.get('http://localhost:81/sanctum/csrf-cookie', { withCredentials: true, withXSRFToken: true })  //this will pause submitData until promise resolves and then the submitData resumes and moves to next line
            const res = await axios.post('http://localhost:81/login', { "email": emailWordPress, "password": passPress, "role": userRole }, { withCredentials: true, withXSRFToken: true })
            if ((res.status === 200 || res.status === 204)) {
                navigate('/customer')
            }
            if ((res.status === 200 || res.status === 204) && res.role === 'owner') {
                navigate('/owner/path')

            }
        } catch (err) {
            console.log(err.response)
        }
    }

    return (
        <div className="min-h-screen bg-[#f7f9fc] px-4 py-6 text-slate-700">
            <div className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-[1200px] flex-col items-center justify-center">
                <div className="mb-10 flex flex-col items-center text-center">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-[#121b31] text-3xl font-semibold text-white shadow-[0_8px_20px_rgba(18,27,49,0.18)]">
                        S
                    </div>
                    <h1 className="text-3xl font-semibold tracking-tight text-slate-700">
                        SalonHub
                    </h1>
                    <p className="mt-2 text-[15px] text-slate-500">
                        Queue Management System
                    </p>
                </div>

                <form onSubmit={submitLoginData} className="w-full max-w-[420px] rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.08)]">
                    <div className="mb-5">
                        <h2 className="text-xl font-semibold text-slate-700">Sign In</h2>
                        <p className="mt-1 text-sm text-slate-500">Enter your credentials to access your account</p>
                    </div>

                    <div className="space-y-4">
                        <label className="block">
                            <span className="mb-2 block text-sm font-semibold text-slate-700">Email Address</span>
                            <input
                                type="email"
                                onChange={updateEmailWordPress}
                                placeholder="your@email.com"
                                value={emailWordPress}
                                className="h-11 w-full rounded-lg border border-slate-200 bg-white px-4 text-[15px] text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-slate-300 focus:ring-2 focus:ring-slate-100"
                            />
                        </label>

                        <label className="block">
                            <span className="mb-2 block text-sm font-semibold text-slate-700">Password</span>
                            <input
                                type="password"
                                onChange={updatePassPress}
                                name="pass"
                                id="pass"
                                value={passPress}
                                placeholder="••••••••"
                                className="h-11 w-full rounded-lg border border-slate-200 bg-white px-4 text-[15px] text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-slate-300 focus:ring-2 focus:ring-slate-100"
                            />
                        </label>

                        <fieldset>
                            <legend className="mb-2 block text-sm font-semibold text-slate-700">Select Your Role</legend>
                            <div className="space-y-2 text-[15px] text-slate-600">
                                <label className="flex cursor-pointer items-center gap-3">
                                    <input
                                        type="radio"
                                        name="role"
                                        id="cust"
                                        value="customer"
                                        checked={userRole === 'customer'}
                                        onChange={updateRole}
                                        className="h-4 w-4 border-slate-300 text-slate-900 focus:ring-slate-300"
                                    />
                                    <span>Customer</span>
                                </label>
                                <label className="flex cursor-pointer items-center gap-3">
                                    <input
                                        type="radio"
                                        name="role"
                                        id="staff"
                                        value="staff"
                                        checked={userRole === 'staff'}
                                        onChange={updateRole}
                                        className="h-4 w-4 border-slate-300 text-slate-900 focus:ring-slate-300"
                                    />
                                    <span>Salon Staff</span>
                                </label>
                                <label className="flex cursor-pointer items-center gap-3">
                                    <input
                                        type="radio"
                                        name="role"
                                        id="owner"
                                        value="owner"
                                        checked={userRole === 'owner'}
                                        onChange={updateRole}
                                        className="h-4 w-4 border-slate-300 text-slate-900 focus:ring-slate-300"
                                    />
                                    <span>Salon Owner</span>
                                </label>
                            </div>
                        </fieldset>

                        <button
                            type="submit"
                            className="mt-2 h-10 w-full rounded-lg bg-[#121b31] text-[15px] font-semibold text-white transition hover:bg-[#0d1527] focus:outline-none focus:ring-2 focus:ring-[#121b31]/20"
                        >
                            Sign In
                        </button>
                    </div>

                    <div className="my-6 h-px w-full bg-slate-200" />

                    {/* <Link to={}> */}
                    <p className="text-center text-[15px] text-slate-500">
                        Don&apos;t have an account? <span className="font-semibold text-slate-700">Create one</span>
                    </p>

                    {/* </Link> */}

                    <div className="mt-6 rounded-2xl bg-slate-100 px-5 py-4">
                        <p className="text-center text-sm font-medium text-slate-500">Demo Credentials</p>
                        <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <p className="font-semibold text-slate-700">Customer</p>
                                <p className="text-slate-500">customer@demo.com</p>
                            </div>
                            <div>
                                <p className="font-semibold text-slate-700">Staff</p>
                                <p className="text-slate-500">staff@demo.com</p>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginPage