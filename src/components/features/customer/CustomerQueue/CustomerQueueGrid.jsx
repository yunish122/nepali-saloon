import { useState } from 'react';
import { Clock, MapPin, Phone, Trash, Users, X } from 'lucide-react';
import Button from '../../../ui/Button';

function CustomerQueueGrid({ appointments, onRemoveAppointment }) {
    const [contactAppointment, setContactAppointment] = useState(null);

    if (appointments.length === 0) {
        return <section className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">You have not joined a salon queue yet.</section>;
    }

    return (
        <section className="flex w-full flex-col gap-5">
            {appointments.map((appointment) => (
                <article key={appointment.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <div className="flex items-start justify-between gap-4 bg-slate-100/80 px-6 py-5 sm:px-8">
                        <div><h2 className="text-2xl font-semibold tracking-tight text-slate-800">{appointment.shopName}</h2><p className="mt-1 text-sm text-slate-500">{appointment.location}</p></div>
                        <span className="inline-flex items-center rounded-full border border-amber-300 bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-700">Waiting</span>
                    </div>

                    <div className="space-y-6 px-6 py-6 sm:px-8">
                        <div className="grid gap-4 sm:grid-cols-3">
                            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-5 text-center"><p className="text-sm font-medium text-slate-800">Queue position</p><p className="mt-2 text-4xl font-bold text-slate-800">#{appointment.queuePosition}</p></div>
                            <div className="rounded-2xl border border-slate-200 px-4 py-5 text-center"><p className="text-sm font-medium text-slate-500">Service</p><p className="mt-2 text-xl font-semibold text-slate-800">{appointment.serviceName}</p><p className="mt-1 text-sm text-slate-500">~{appointment.estimatedWaitMinutes} min wait</p></div>
                            <div className="rounded-2xl border border-slate-200 bg-white px-4 py-5 text-center"><p className="text-sm font-medium text-slate-800">Cost</p><p className="mt-2 text-3xl font-bold text-slate-800">NPR {appointment.cost}</p></div>
                        </div>

                        <div className="grid gap-4 border-y border-slate-200 py-5 sm:grid-cols-3">
                            <InfoItem icon={<MapPin size={18} />} label="Location" value={appointment.location} />
                            <InfoItem icon={<Clock size={18} />} label="Hours" value={`${appointment.openingTime} - ${appointment.closingTime}`} />
                            <InfoItem icon={<Users size={18} />} label="People ahead" value={String(appointment.queuePosition - 1)} />
                        </div>

                        <div className="flex gap-3">
                            <Button title="Contact Salon" size="md" onClick={() => setContactAppointment(appointment)} className="w-full rounded-xl bg-slate-900 py-3 font-semibold text-white transition hover:bg-slate-800" />
                            <button type="button" onClick={() => onRemoveAppointment(appointment.id)} className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-500 text-white transition hover:bg-red-600" aria-label={`Leave ${appointment.shopName} queue`}><Trash size={18} /></button>
                        </div>
                    </div>
                </article>
            ))}

            {contactAppointment && <ContactModal appointment={contactAppointment} onClose={() => setContactAppointment(null)} />}
        </section>
    );
}

function InfoItem({ icon, label, value }) {
    return <div className="flex items-center gap-3 text-slate-700"><div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-500">{icon}</div><div><p className="text-xs uppercase tracking-wide text-slate-400">{label}</p><p className="text-sm font-medium">{value}</p></div></div>;
}

function ContactModal({ appointment, onClose }) {
    return <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4" onClick={onClose}>
        <div role="dialog" aria-modal="true" className="w-full max-w-sm rounded-3xl border border-slate-200 bg-white p-6 shadow-xl" onClick={(event) => event.stopPropagation()}>
            <div className="flex items-start justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Contact Salon</p><h3 className="mt-1 text-xl font-semibold text-slate-900">{appointment.shopName}</h3></div><button type="button" onClick={onClose} className="rounded-full bg-slate-100 p-2 text-slate-500" aria-label="Close contact popup"><X size={18} /></button></div>
            <div className="mt-5 flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4"><Phone size={18} className="text-slate-600" /><span className="font-semibold text-slate-800">{appointment.phone}</span></div>
            <a href={`tel:${appointment.phone.replace(/\s+/g, '')}`} className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white">Call Now</a>
        </div>
    </div>;
}

export default CustomerQueueGrid;
