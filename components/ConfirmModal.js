'use client';

export default function ConfirmModal({ isOpen, onClose, onConfirm, message }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in-up">
            <div className="bg-white dark:bg-gray-900 border border-white/10 rounded-2xl p-8 max-w-sm w-full shadow-2xl animate-scale-in relative overflow-hidden">

                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neon-pink to-secondary"></div>
                <div className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-r from-secondary to-neon-pink"></div>

                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 text-center">
                    Are you sure?
                </h3>

                <p className="text-gray-600 dark:text-gray-300 text-center mb-8 leading-relaxed">
                    {message || "This action cannot be undone."}
                </p>

                <div className="flex gap-4 justify-center">
                    <button
                        onClick={onClose}
                        className="px-6 py-2.5 rounded-xl font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={onConfirm}
                        className="px-6 py-2.5 rounded-xl font-bold text-white bg-gradient-to-r from-neon-pink to-secondary shadow-lg hover:shadow-neon-pink/50 hover:-translate-y-1 transition-all duration-300"
                    >
                        Yes, Delete
                    </button>
                </div>
            </div>
        </div>
    );
}
