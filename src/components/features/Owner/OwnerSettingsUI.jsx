import { Clock, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const defaultServices = [
    { id: 1, service_name: 'Hair Cut', cost: 500, duration: 30 },
    { id: 2, service_name: 'Hair Color', cost: 1500, duration: 90 },
    { id: 3, service_name: 'Facial', cost: 800, duration: 60 },
    { id: 4, service_name: 'Massage', cost: 1000, duration: 60 },
];

function TimeField({ label, value, onChange, name }) {
    return (
        <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">{label}</label>
            <div className="relative">
                <input
                    type="text"
                    name={name}
                    value={value}
                    onChange={onChange}
                    className="h-11 w-full rounded-lg border border-slate-200 bg-white px-4 pr-11 text-sm text-slate-700 outline-none transition focus:border-slate-300 focus:ring-2 focus:ring-slate-100"
                />
                <Clock className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" strokeWidth={1.75} />
            </div>
        </div>
    );
}

export default function OwnerSettingsUI({
    userName = 'Suresh Paudel',
    hasShop = true,
    emptyMessage = 'No shop is affiliated with this user.',
    values = {
        shop_name: 'Elegance Salon',
        phone: '+977 1-4123456',
        location: 'Thamel, Kathmandu',
        description: 'Professional salon providing premium beauty services',
        opening_time: '09:00 AM',
        closing_time: '07:00 PM',
    },
    salonStatus = true,
    services = defaultServices,
    isSaving = false,
    saveError = '',
    saveMessage = '',
    onChange,
    onToggleOpen,
    onEditService,
    onAddService,
    onCancel,
    onSave,
}) {
    const navigate = useNavigate();

    function handleChange(event) {
        onChange?.(event.target.name, event.target.value);
    }

    return (
        <div className="min-h-screen bg-[#f8fafc]">
            <header className="border-b border-slate-200 bg-white">
                <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
                    <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#0f172a] text-sm font-bold text-white">
                            S
                        </div>
                        <span className="text-base font-semibold text-slate-900">SalonHub Pro</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                        <span>{userName}</span>
                        <User className="h-5 w-5 text-slate-500" strokeWidth={1.75} />
                    </div>
                </div>
            </header>

            <main className="mx-auto max-w-3xl px-6 py-8">
                <div className="mb-8 flex items-start justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Salon Settings</h1>
                        <p className="mt-1 text-sm text-slate-500">Manage your salon information and hours</p>
                    </div>
                    <button
                        type="button"
                        onClick={() => navigate('/owner/path')}
                        className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                    >
                        Back
                    </button>
                </div>

                {!hasShop ? (
                    <div className="rounded-2xl border border-amber-200 bg-amber-50 px-6 py-5 text-sm text-amber-800">
                        {emptyMessage}
                    </div>
                ) : (
                <div className="space-y-6">
                    {(saveError || saveMessage) && (
                        <div
                            className={`rounded-xl border px-4 py-3 text-sm ${saveError ? 'border-red-200 bg-red-50 text-red-700' : 'border-emerald-200 bg-emerald-50 text-emerald-700'}`}
                            role="alert"
                        >
                            {saveError || saveMessage}
                        </div>
                    )}

                    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                        <h2 className="text-base font-semibold text-slate-900">Basic Information</h2>
                        <p className="mt-1 text-sm text-slate-500">Update your salon details</p>

                        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">Salon Name</label>
                                <input
                                    name="shop_name"
                                    value={values.shop_name}
                                    onChange={handleChange}
                                    className="h-11 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none transition focus:border-slate-300 focus:ring-2 focus:ring-slate-100"
                                />
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">Phone Number</label>
                                <input
                                    name="phone"
                                    value={values.phone}
                                    onChange={handleChange}
                                    className="h-11 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none transition focus:border-slate-300 focus:ring-2 focus:ring-slate-100"
                                />
                            </div>
                        </div>

                        <div className="mt-5">
                            <label className="mb-2 block text-sm font-medium text-slate-700">Address</label>
                            <input
                                name="location"
                                value={values.location}
                                onChange={handleChange}
                                className="h-11 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none transition focus:border-slate-300 focus:ring-2 focus:ring-slate-100"
                            />
                        </div>

                        <div className="mt-5">
                            <label className="mb-2 block text-sm font-medium text-slate-700">Description</label>
                            <textarea
                                name="description"
                                value={values.description}
                                onChange={handleChange}
                                rows={4}
                                className="w-full resize-none rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-slate-300 focus:ring-2 focus:ring-slate-100"
                            />
                        </div>
                    </section>

                    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                        <h2 className="text-base font-semibold text-slate-900">Operating Hours</h2>
                        <p className="mt-1 text-sm text-slate-500">Set your salon opening and closing times</p>

                        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                            <TimeField
                                label="Opening Time"
                                name="opening_time"
                                value={values.opening_time}
                                onChange={handleChange}
                            />
                            <TimeField
                                label="Closing Time"
                                name="closing_time"
                                value={values.closing_time}
                                onChange={handleChange}
                            />
                        </div>
                    </section>

                    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                        <h2 className="text-base font-semibold text-slate-900">Salon Status</h2>
                        <p className="mt-1 text-sm text-slate-500">Control whether your salon accepts new bookings</p>

                        <div className="mt-5 flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-4">
                            <div>
                                <p className="text-sm font-semibold text-slate-900">Salon Status</p>
                                <p className="mt-0.5 text-sm text-slate-500">
                                    {salonStatus ? 'Salon is open and accepting customers' : 'Salon is closed and not accepting customers'}
                                </p>
                            </div>
                            <button
                                type="button"
                                role="switch"
                                aria-checked={salonStatus}
                                onClick={() => onToggleOpen?.(!salonStatus)}
                                className={`relative inline-flex h-7 w-12 shrink-0 items-center rounded-full transition-colors ${salonStatus ? 'bg-[#0f172a]' : 'bg-slate-200'}`}
                            >
                                <span
                                    className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${salonStatus ? 'translate-x-6' : 'translate-x-1'}`}
                                />
                            </button>
                        </div>
                    </section>

                    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                        <h2 className="text-base font-semibold text-slate-900">Services</h2>
                        <p className="mt-1 text-sm text-slate-500">Manage salon services and pricing</p>

                        <div className="mt-5 space-y-3">
                            {services.map((service) => (
                                <div
                                    key={service.id}
                                    className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-4"
                                >
                                    <div>
                                        <p className="text-sm font-semibold text-slate-900">{service.service_name}</p>
                                        <p className="mt-0.5 text-sm text-slate-500">
                                            Rs. {service.cost} • {service.duration} min
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => onEditService?.(service.id)}
                                        className="text-sm font-medium text-slate-700 transition hover:text-slate-900"
                                    >
                                        Edit
                                    </button>
                                </div>
                            ))}

                            <button
                                type="button"
                                onClick={onAddService}
                                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                            >
                                Add New Service
                            </button>
                        </div>
                    </section>

                    <div className="grid grid-cols-2 gap-4 pt-2">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={onSave}
                            disabled={isSaving}
                            className="rounded-xl bg-[#0f172a] px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {isSaving ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </div>
                )}
            </main>
        </div>
    );
}
