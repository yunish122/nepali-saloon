import { useState } from 'react';
import { X } from 'lucide-react';
import Button from '../../../ui/Button';
import { useNavigate } from "react-router-dom";

function ServiceHeading({ formData, setFormData, updateCardState, closeCard, updateWordPress, addService, setIsOpen, isOpen, isOpenEdit, isEditing, saveServiceEdit }) {



    //name  = duration, type = text soo "duration":50
    //[] computed property name lai enforce garxa 
    //confustion chai k thyo? why in js obj does left side need [] but right side dont? kina ki left side is treated as literal string but right side is computed automatcially.
    //left side lai chai lteral string line bhakole we need to wrap it inside [] to save it from getting transformed as a string
    //[] bhayo bhane chaii js is enforced to evaluate
    let navigate = useNavigate()
    return (
        <>
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-black/80">Manage Services</h1>
                    <p className="font-medium text-gray-500">Edit services, pricing, and duration</p>
                </div>

                <div className="flex items-center gap-3">
                    <Button
                        type="button"
                        size="md"
                        onClick={() => navigate(-1)}
                        className="rounded-lg border border-slate-400/40 px-2 py-1 font-medium text-black shadow-sm"
                    >
                        Back
                    </Button>
                    <div onClick={updateCardState}>
                        <Button
                            type="button"
                            size="md"

                            className="rounded-lg bg-slate-900 px-2 py-1 font-medium text-white shadow-sm"
                        >
                            + Add Service
                        </Button>
                    </div>

                </div>
            </div>


            {isOpen && (
                <div
                    className="fixed  inset-0 z-50 flex items-center justify-center bg-slate-950/50 backdrop-blur-sm px-4"
                >
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
                                onClick={updateCardState}
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <form className="mt-5 space-y-4">
                            <div>
                                <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="serviceName">
                                    Service Name
                                </label>
                                <input
                                    id="serviceName"
                                    name='service_name'
                                    onChange={(e) => { updateWordPress(e) }}
                                    value={formData.name}
                                    placeholder="e.g. Hair Color"
                                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-slate-400"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="price">
                                        Price (Rs.)
                                    </label>
                                    <input
                                        name='cost'
                                        id="cost"
                                        onChange={(e) => { updateWordPress(e) }}
                                        value={formData.price}
                                        className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-slate-400"
                                    />
                                </div>

                                <div>
                                    <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="duration">
                                        Duration (min)
                                    </label>
                                    <input
                                        name='duration'
                                        id="duration"
                                        onChange={(e) => { updateWordPress(e) }}
                                        value={formData.duration}
                                        className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-slate-400"
                                    />
                                </div>
                            </div>

                            <div className="pt-1" onClick={(e) => { addService(e) }}>
                                <Button
                                    type="submit"
                                    size="md"
                                    className="w-full rounded-xl bg-slate-900 px-4 py-3 font-medium text-white shadow-sm transition hover:bg-slate-800"
                                >
                                    Add Service
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}


        </>
    );
}

export default ServiceHeading;
