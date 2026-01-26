'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import ConfirmModal from './ConfirmModal';

export default function DeleteButton({ id }) {
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const router = useRouter();

    const handleDeleteClick = () => {
        setIsModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        setIsModalOpen(false);
        setLoading(true);

        try {
            const res = await fetch(`https://blog-api-t6u0.onrender.com/posts/${id}`, {
                method: 'DELETE',
            });

            if (!res.ok) {
                throw new Error('Failed to delete post');
            }

            toast.success('🗑️ Post deleted successfully!');
            router.push('/');
            router.refresh();
        } catch (error) {
            toast.error(`Deletion failed: ${error.message}`);
            setLoading(false);
        }
    };

    return (
        <>
            <button
                onClick={handleDeleteClick}
                disabled={loading}
                className={`px-6 py-2.5 bg-white border-2 border-secondary text-secondary font-bold rounded-xl hover:bg-secondary hover:text-white transition-all duration-300 transform hover:scale-105 active:scale-95 ${loading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
            >
                {loading ? 'Deleting...' : 'Delete Post'}
            </button>

            <ConfirmModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleConfirmDelete}
                message="Are you sure you want to delete this post? This action cannot be undone."
            />
        </>
    );
}
