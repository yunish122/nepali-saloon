import React from 'react';
import QueueEntryCard from '../../ui/QueueEntryCard';


function QueueSummary({
    title = "Today's Queue Summary",
    subtitle = 'Customer flow throughout the day',
    entries = [
        { name: 'Priya Sharma', phone: '9841234567', position: 1, status: 'waiting' },
        { name: 'Anu Paudel', phone: '9845678901', position: 2, status: 'waiting' },
        { name: 'Maya Singh', phone: '9843456789', position: 3, status: 'waiting' },
        { name: 'Sita Khadka', phone: '9847890123', position: 4, status: 'waiting' },
        { name: 'Radha Ghimire', phone: '9846543210', position: 5, status: 'waiting' },
    ],
}) {
    return (
        <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <header className="mb-4">
                <h2 className="text-2xl font-semibold text-slate-800">{title}</h2>
                <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
            </header>

            <div className="space-y-4">
                {entries.map((e, idx) => (
                    <QueueEntryCard
                        key={idx}
                        name={e.name}
                        phone={e.phone}
                        position={e.position}
                        status={e.status}
                    />
                ))}
            </div>
        </section>
    );
}

export default QueueSummary;