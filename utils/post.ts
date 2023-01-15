import { Post } from "../types.d.ts";
import { extract } from "https://deno.land/std@0.145.0/encoding/front_matter.ts";
import { render } from "gfm";

export async function getPostData(id: string): Promise<Post | null> {
  let raw: string;

  try {
    raw = await Deno.readTextFile(`./content/post/${id}.md`);
  } catch {
    return null;
  }

  const { attrs, body } = extract(raw);
  const params = attrs as Record<string, string>;

  const post: Post = {
    id,
    title: params.title,
    body: render(body),
    date: new Date(params.date),
    excerpt: params.excerpt,
  };

  return post;
}

export async function getAllPostIds(): Promise<Post[]> {
  const promises = [];
  for await (const entry of Deno.readDir("./content/post")) {
    const { name } = entry;
    const [id] = name.split(".");
    const post = await getPostData(id);
    if (!post) continue;
    promises.push(post);
  }
  const posts = await Promise.all(promises);
  posts.sort((a, b) => b.date.getTime() - a.date.getTime());

  return posts;
}
