import Link from 'next/link';
import DeleteButton from '@/components/DeleteButton';
import { notFound } from 'next/navigation';

async function getPost(id) {
    try {
        const res = await fetch(`https://blog-api-t6u0.onrender.com/posts/${id}`, {
            cache: 'no-store',
        });

        if (res.status === 404) return undefined;
        if (!res.ok) throw new Error('Failed to fetch post');

        return res.json();
    } catch (error) {
        console.error(error);
        return null;
    }
}

export default async function PostDetail({ params, searchParams }) {
    const { id } = await params;
    const sp = await searchParams;
    const page = sp?.page || 1;
    const post = await getPost(id);

    if (post === undefined) {
        notFound();
    }

    if (post === null) {
        return (
            <div className="min-h-screen flex items-center justify-center text-secondary font-bold text-xl">
                Error loading post.
            </div>
        );
    }

    return (
        <main className="min-h-screen p-8 sm:p-20 bg-gradient-to-br from-green-50 to-rose-50 dark:from-gray-900 dark:to-gray-950 flex justify-center">
            <div className="w-full max-w-4xl bg-white dark:bg-gray-800 p-8 sm:p-12 rounded-3xl shadow-2xl border border-white/20 animate-fade-in-up">
                <Link
                    href={`/?page=${page}`}
                    className="inline-flex items-center text-gray-500 hover:text-primary mb-8 transition-colors group"
                >
                    <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Page {page}
                </Link>

                <article>
                    <h1 className="text-4xl sm:text-5xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary leading-tight">
                        {post.title}
                    </h1>

                    <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 mb-12 leading-relaxed whitespace-pre-wrap">
                        {post.body}
                    </div>
                </article>

                <div className="flex flex-wrap gap-4 border-t-2 border-gray-100 dark:border-gray-700 pt-8 mt-auto">
                    <Link
                        href={`/posts/${id}/edit`}
                        className="px-8 py-2.5 bg-primary text-white font-bold rounded-xl hover:bg-emerald-700 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 transform hover:scale-105 active:scale-95"
                    >
                        Edit Post
                    </Link>
                    <DeleteButton id={id} />
                </div>
            </div>
        </main>
    );
}
