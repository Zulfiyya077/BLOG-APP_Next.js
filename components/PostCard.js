import Link from 'next/link';

export default function PostCard({ post, page = 1 }) {
    return (
        <div className="group h-full relative bg-white dark:bg-gray-800/50 backdrop-blur-md border border-gray-100 dark:border-gray-700 p-5 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:rotate-1 flex flex-col justify-between overflow-hidden">

            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="relative z-10">
                <div className="w-8 h-1 bg-gradient-to-r from-primary to-secondary mb-3 rounded-full group-hover:w-full transition-all duration-500 ease-out"></div>

                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2 line-clamp-1 group-hover:text-primary transition-colors">
                    {post.title}
                </h2>

                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 leading-relaxed opacity-90 group-hover:opacity-100 transition-opacity">
                    {post.body}
                </p>
            </div>

            <Link
                href={`/posts/${post.id}?page=${page}`}
                className="relative z-10 inline-flex items-center justify-center w-full px-4 py-2 text-sm bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold rounded-lg group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-secondary group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-md"
            >
                <span className="transform group-hover:-translate-x-1 transition-transform duration-300">Read Article</span>
                <svg className="w-3.5 h-3.5 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 delay-75" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
            </Link>
        </div>
    );
}
