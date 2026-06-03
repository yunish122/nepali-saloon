import Button from '../../ui/Button'

export default function OwnerSettingsUI(props) {
    // Props (placeholders):
    // - values: { name, phone, address, description, openingTime, closingTime, isOpen }
    // - onChange(field, value)
    // - onToggleOpen(value)
    // - services: array of { id, service_name, cost, duration }
    // - onEditService(id)
    // - onAddService()
    // - onCancel()
    // - onSave()
    const {
        values = {},
        onChange = () => { },
        onToggleOpen = () => { },
        services = [],
        onEditService = () => { },
        onAddService = () => { },
        onCancel = () => { },
        onSave = () => { },
    } = props

    return (
        <div className=" min-h-screen mt-5 flex justify-center w-screen">
            <div className="flex w-full max-w-3xl flex-col items-strech gap-5 ">
                {/* max-w le chai euta max with matra ensure garxa, to make it strech we need w-full */}

                <div className="flex items-start justify-between">
                    <div>
                        <h1 className="text-4xl font-bold text-slate-800">Salon Settings</h1>
                        <p className="text-lg text-slate-500 mt-2">Manage your salon information and hours</p>
                    </div>
                    <div>
                        <Button
                            type="button"
                            className="rounded-md bg-white border border-slate-400/40 px-4 py-1 shadow-sm hover:bg-violet-600/80 hover:text-white transition-colors duration-100"
                        >
                            Back
                        </Button>
                    </div>
                </div>

                <div className="flex flex-col justify-center  gap-5 flex-1">
                    {/* Basic Information Card */}
                    <div className="rounded-2xl border border-slate-100 bg-white p-8 shadow-sm">
                        <h3 className="font-semibold text-lg">Basic Information</h3>
                        <p className="text-sm text-slate-500">Update your salon details</p>

                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="text-sm text-slate-700">Salon Name</label>
                                <input value={values.name || ''} onChange={(e) => onChange('name', e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 bg-white" />
                            </div>
                            <div>
                                <label className="text-sm text-slate-700">Phone Number</label>
                                <input value={values.phone || ''} onChange={(e) => onChange('phone', e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 bg-white" />
                            </div>
                        </div>

                        <div className="">
                            <label className="text-sm text-slate-700">Address</label>
                            <input value={values.address || ''} onChange={(e) => onChange('address', e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 bg-white" />
                        </div>

                        <div className="">
                            <label className="text-sm text-slate-700">Description</label>
                            <textarea value={values.description || ''} onChange={(e) => onChange('description', e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 h-36 bg-white" />
                        </div>
                    </div>

                    {/* Operating Hours Card */}
                    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                        <h3 className="font-semibold">Operating Hours</h3>
                        <p className="text-sm text-slate-500">Set your salon opening and closing times</p>

                        <div className="grid grid-cols-2 gap-6 items-center">
                            <div>
                                <label className="text-sm text-slate-700">Opening Time</label>
                                <input type="time" value={values.openingTime || ''} onChange={(e) => onChange('openingTime', e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 bg-white" />
                            </div>
                            <div>
                                <label className="text-sm text-slate-700">Closing Time</label>
                                <input type="time" value={values.closingTime || ''} onChange={(e) => onChange('closingTime', e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 bg-white" />
                            </div>
                        </div>
                    </div>

                    {/* Salon Status Card */}
                    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                        <h3 className="font-semibold">Salon Status</h3>
                        <p className="text-sm text-slate-500">Control whether your salon accepts new bookings</p>

                        <div className=" bg-white border-slate-100 rounded-md border p-4 flex items-center justify-between">
                            <div>
                                <div className="font-medium">Salon Status</div>
                                <div className="text-sm text-slate-500">Salon is open and accepting customers</div>
                            </div>
                            <div>
                                <button
                                    type="button"
                                    role="switch"
                                    aria-checked={!!values.isOpen}
                                    onClick={() => onToggleOpen(!values.isOpen)}
                                    className={`relative inline-flex h-7 w-12 shrink-0 items-center rounded-full transition-colors duration-200 ${values.isOpen ? 'bg-slate-900' : 'bg-slate-200'}`}
                                >
                                    <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform duration-200 ${values.isOpen ? 'translate-x-5' : 'translate-x-1'}`} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Services Card */}
                    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                        <h3 className="font-semibold">Services</h3>
                        <p className="text-sm text-slate-500">Manage salon services and pricing</p>

                        <div className="">
                            {services.map((s) => (
                                <div key={s.id} className="flex items-center justify-between rounded-md border px-4 py-3 bg-white">
                                    <div>
                                        <div className="font-medium">{s.service_name}</div>
                                        <div className="text-sm text-slate-500">Rs. {s.cost} • {s.duration} min</div>
                                    </div>
                                    <div>
                                        <button onClick={() => onEditService(s.id)} className="text-sm text-slate-700">Edit</button>
                                    </div>
                                </div>
                            ))}

                            <div>
                                <Button type="button" onClick={onAddService} className="w-full border rounded-md border-slate-100">Add New Service</Button>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between gap-5">
                        <Button type="button" onClick={onCancel} className="bg-white  border border-slate-200 rounded-md w-full">Cancel</Button>
                        <Button type="button" onClick={onSave} className="bg-slate-900 text-white rounded-md w-full">Save Changes</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
