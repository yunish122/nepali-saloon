import { X } from 'lucide-react'
import Button from '../../../ui/Button'
function ServiceEditModal({selectedId, isEditing, onClose, saveEditedData, onWordPressEdit, editFormData }) {
    // Placeholder props - rename as you like:
    // - isOpen: whether modal is visible
    // - onClose: close handler
    // - formValues: object with service_name, cost, duration
    // - onChange: input change handler (e) => void
    // - onSubmit: submit handler (e) => void
    if (!isEditing) return null
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 backdrop-blur-sm px-4">
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="add-service-title"
                className="w-full max-w-md rounded-2xl bg-white p-5 shadow-[0_20px_60px_rgba(15,23,42,0.24)]"
            >
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <h2 id="add-service-title" className="text-lg font-semibold text-slate-800">
                            Add New Service
                        </h2>
                        <p className="text-sm text-slate-500">Create a new service offering</p>
                    </div>

                    <button
                        type="button"
                        className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                        aria-label="Close add service popup"
                        onClick={onClose}
                    >
                        <X size={18} />
                    </button>
                </div>

                <form
                    className="mt-5 space-y-4"
                    onSubmit={(e)=>{e.preventDefault();saveEditedData(editFormData.id)}}
                >
                    <div>
                        <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="serviceName">
                            Service Name
                        </label>
                        <input
                            id="serviceName"
                            name="service_name"
                            onChange={(e)=>{onWordPressEdit(e)}}
                            value={editFormData.service_name}
                            placeholder="e.g. Hair Color"
                            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-slate-400"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="cost">
                                Price (Rs.)
                            </label>
                            <input
                                name="cost"
                                id="cost"
                                onChange={(e)=>{onWordPressEdit(e)}}
                                value={editFormData.cost}
                                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-slate-400"
                            />
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="duration">
                                Duration (min)
                            </label>
                            <input
                                name="duration"
                                id="duration"
                                onChange={(e)=>{onWordPressEdit(e)}}
                                value={editFormData.duration}
                                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-slate-400"
                            />
                        </div>
                    </div>

                    <div className="pt-1">
                        <Button
                            type="submit"
                            size="md"
                            className="w-full rounded-xl bg-slate-900 px-4 py-3 font-medium text-white shadow-sm transition hover:bg-slate-800"
                        >
                            Submit
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ServiceEditModal