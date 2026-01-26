import Link from 'next/link';
import PostCard from '@/components/PostCard';

async function getPosts() {
  try {
    const res = await fetch('https://blog-api-t6u0.onrender.com/posts', {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error('Failed to fetch posts');
    }

    return res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function Home({ searchParams }) {
  const allPosts = (await getPosts()).reverse();

  const sp = await searchParams;
  const page = parseInt(sp?.page) || 1;
  const limit = 6;
  const totalPosts = allPosts.length;
  const totalPages = Math.ceil(totalPosts / limit);

  const start = (page - 1) * limit;
  const end = start + limit;
  const currentPosts = allPosts.slice(start, end);

  return (
    <main className="min-h-screen p-8 sm:p-20 bg-gradient-to-br from-green-50 to-rose-50 dark:from-gray-900 dark:to-gray-950">
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col sm:flex-row justify-between items-center mb-12 animate-fade-in-up">
          <h1 className="text-5xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-4 sm:mb-0 drop-shadow-sm hover:scale-105 transition-transform duration-500 cursor-default">
            My Blog App
          </h1>
          <Link
            href="/create"
            className="group relative px-8 py-3 font-bold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_var(--neon-green)] border-2 border-neon-green bg-transparent text-neon-green hover:bg-neon-green hover:text-gray-900"
          >
            <span className="relative z-10 flex items-center gap-2">
              Create New Post
              <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
            </span>
          </Link>
        </header>

        {currentPosts.length === 0 ? (
          <div className="text-center py-20 animate-fade-in-up">
            <p className="text-2xl text-gray-500 font-light">
              No posts found on this page.
              {page > 1 && (
                <Link href={`/?page=${page - 1}`} className="ml-2 text-primary hover:underline">
                  Go back
                </Link>
              )}
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {currentPosts.map((post, index) => (
                <div key={post.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <PostCard post={post} page={page} />
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 animate-fade-in-up">
                {page > 1 ? (
                  <Link
                    href={`/?page=${page - 1}`}
                    className="px-6 py-2 bg-white dark:bg-gray-800 border-2 border-primary text-primary font-bold rounded-xl hover:bg-primary hover:text-white transition-all transform hover:scale-105"
                  >
                    ← Previous
                  </Link>
                ) : (
                  <span className="px-6 py-2 border-2 border-gray-300 text-gray-300 font-bold rounded-xl cursor-not-allowed">
                    ← Previous
                  </span>
                )}

                <span className="text-gray-600 dark:text-gray-300 font-medium">
                  Page {page} of {totalPages}
                </span>

                {page < totalPages ? (
                  <Link
                    href={`/?page=${page + 1}`}
                    className="px-6 py-2 bg-white dark:bg-gray-800 border-2 border-primary text-primary font-bold rounded-xl hover:bg-primary hover:text-white transition-all transform hover:scale-105"
                  >
                    Next →
                  </Link>
                ) : (
                  <span className="px-6 py-2 border-2 border-gray-300 text-gray-300 font-bold rounded-xl cursor-not-allowed">
                    Next →
                  </span>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
