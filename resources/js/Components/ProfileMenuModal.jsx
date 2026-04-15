import { Link } from '@inertiajs/react';
import Modal from './Modal';

export default function ProfileMenuModal({ show, onClose, userName }) {
    return (
        <Modal show={show} onClose={onClose} maxWidth="sm">
            <div className="p-6">
                <h3 className="text-lg font-bold text-[#2d3e52]">Account</h3>
                <p className="mt-1 text-sm text-[#5c7291]">Signed in as {userName}</p>

                <div className="mt-5 grid gap-2">
                    <Link
                        href={route('profile.edit')}
                        className="rounded-lg border border-[#d4dce6] px-4 py-2 text-center text-sm font-semibold text-[#2d3e52] transition hover:bg-[#f5f7fa]"
                    >
                        Settings
                    </Link>

                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100"
                    >
                        Log Out
                    </Link>
                </div>

                <button
                    type="button"
                    onClick={onClose}
                    className="mt-3 w-full rounded-lg border border-[#d4dce6] px-4 py-2 text-sm font-semibold text-[#2d3e52] transition hover:bg-[#f5f7fa]"
                >
                    Close
                </button>
            </div>
        </Modal>
    );
}
