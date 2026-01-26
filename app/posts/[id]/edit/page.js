'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'react-toastify';

export default function EditPost() {
    const { id } = useParams();
    const router = useRouter();

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!id) return;

        fetch(`https://blog-api-t6u0.onrender.com/posts/${id}`)
            .then((res) => {
                if (!res.ok) throw new Error('Failed to fetch post');
                return res.json();
            })
            .then((data) => {
                setTitle(data.title);
                setBody(data.body);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
                toast.error(`Failed to load post: ${err.message}`);
            });
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError('');

        try {
            const res = await fetch(`https://blog-api-t6u0.onrender.com/posts/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, body }),
            });

            if (!res.ok) {
                throw new Error('Failed to update post');
            }

            toast.success('✅ Post updated successfully!');
            router.push(`/posts/${id}`);
            router.refresh();
        } catch (err) {
            setError(err.message);
            toast.error(`Update failed: ${err.message}`);
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                <div className="relative w-20 h-20">
                    <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-primary rounded-full border-t-transparent animate-spin"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center text-secondary font-bold text-xl">
                Error: {error}
            </div>
        );
    }

    return (
        <div className="min-h-screen p-8 sm:p-20 bg-gradient-to-br from-green-50 to-rose-50 dark:from-gray-900 dark:to-gray-950 flex justify-center items-center">
            <div className="w-full max-w-2xl bg-white dark:bg-gray-800 p-8 sm:p-12 rounded-3xl shadow-2xl border border-white/20 animate-scale-in">
                <Link href={`/posts/${id}`} className="inline-flex items-center text-gray-500 hover:text-primary mb-8 transition-colors">
                    ← Cancel & Go Back
                </Link>

                <h1 className="text-3xl sm:text-4xl font-extrabold mb-8 text-gray-800 dark:text-white">
                    Edit Post
                </h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="group">
                        <label htmlFor="title" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 group-focus-within:text-primary transition-colors">
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className="w-full px-5 py-4 rounded-xl border-2 border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 text-gray-900 dark:text-white focus:border-primary focus:ring-0 outline-none transition-all duration-300 font-medium"
                        />
                    </div>

                    <div className="group">
                        <label htmlFor="body" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 group-focus-within:text-primary transition-colors">
                            Content
                        </label>
                        <textarea
                            id="body"
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            required
                            rows="8"
                            className="w-full px-5 py-4 rounded-xl border-2 border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 text-gray-900 dark:text-white focus:border-primary focus:ring-0 outline-none transition-all duration-300 font-medium resize-none"
                        />
                    </div>

                    <div className="flex gap-4 pt-4">
                        <button
                            type="submit"
                            disabled={saving}
                            className={`flex-1 py-4 px-6 text-white font-bold rounded-xl transition-all duration-300 transform ${saving
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-1 active:scale-95'
                                }`}
                        >
                            {saving ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
