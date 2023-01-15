// import { Head } from "$fresh/runtime.ts";
// import Counter from "../islands/Counter.tsx";
import { Handlers, PageProps } from "$fresh/server.ts";
import { Post } from "../types.d.ts";
import { getAllPostIds } from "../utils/post.ts";
export const handler: Handlers = {
  async GET(req, context) {
    const allposts = await getAllPostIds();
    return context.render({ allposts });
  },
};

export default function Home(props: PageProps) {
  const { allposts } = props?.data || {};
  return (
    <main class="p-4">
      <h1 class="text-6xl">Mi blog</h1>
      <article class="h-4">
        {allposts.map((post: Post) => {
          return (
            <div class="flex flex-col m-3">
              <h2 class="text-4xl">
                <a class="hover:text-blue-600" href={`/blog/${post.id}`}>
                  {post.title}
                </a>
              </h2>
              <time>
                {new Intl.DateTimeFormat("es").format(new Date(post.date))}
              </time>
            </div>
          );
        })}
      </article>
    </main>
  );
}
