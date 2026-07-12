import { useState } from "react";

export default function AuthenticatedLayout({ user, children }) {
    const [showDropdown, setShowDropdown] = useState(false);

    const handleLogout = () => {
        // Replace with your actual logout logic
        alert("Logged out successfully!");
        window.location.href = "/login"; // or your login route
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Top Navigation */}
            <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-black text-white rounded-lg flex items-center justify-center font-bold text-xl">
                            S
                        </div>
                        <span className="font-semibold text-2xl tracking-tight">SalonHub Pro</span>
                    </div>

                    <div className="flex items-center gap-6">
                        <span className="text-sm font-medium text-gray-700">
                            {user?.name || "User"}
                        </span>

                        <div className="relative">
                            <button
                                onClick={() => setShowDropdown(!showDropdown)}
                                className="flex items-center gap-2 hover:bg-gray-100 px-3 py-2 rounded-lg transition"
                            >
                                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-sm font-medium">
                                    {user?.name?.[0] || "U"}
                                </div>
                            </button>

                            {showDropdown && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50">
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-6 py-8">
                {children}
            </main>
        </div>
    );
}