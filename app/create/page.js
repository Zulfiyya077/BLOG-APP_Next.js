'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'react-toastify';

export default function CreatePost() {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch('https://blog-api-t6u0.onrender.com/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, body }),
            });

            if (!res.ok) {
                throw new Error('Failed to create post');
            }

            toast.success(' Post created successfully!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });

            router.push('/');
            router.refresh();
        } catch (err) {
            toast.error(`Error: ${err.message}`, {
                position: "top-right",
                autoClose: 4000,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen p-8 sm:p-20 bg-gradient-to-br from-green-50 to-rose-50 dark:from-gray-900 dark:to-gray-950 flex justify-center items-center">
            <div className="w-full max-w-2xl bg-white dark:bg-gray-800 p-8 sm:p-12 rounded-3xl shadow-2xl border border-white/20 animate-scale-in">
                <Link href="/" className="inline-flex items-center text-gray-500 hover:text-primary mb-8 transition-colors">
                    ← Back to Home
                </Link>

                <h1 className="text-4xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                    Create New Post
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
                            className="w-full px-5 py-4 rounded-xl border-2 border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 text-gray-900 dark:text-white focus:border-primary focus:ring-0 outline-none transition-all duration-300 font-medium placeholder:text-gray-400"
                            placeholder="Enter an engaging title..."
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
                            className="w-full px-5 py-4 rounded-xl border-2 border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 text-gray-900 dark:text-white focus:border-primary focus:ring-0 outline-none transition-all duration-300 font-medium placeholder:text-gray-400 resize-none"
                            placeholder="Share your thoughts..."
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-4 px-6 text-white font-bold rounded-xl transition-all duration-300 transform ${loading
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-1 active:scale-95'
                            }`}
                    >
                        {loading ? 'Publishing...' : 'Publish Post'}
                    </button>
                </form>
            </div>
        </div>
    );
}
