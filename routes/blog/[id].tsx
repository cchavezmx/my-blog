import { Handlers, PageProps } from "$fresh/server.ts";
import { getPostData } from "../../utils/post.ts";
import { CSS } from "gfm";

export const handler: Handlers = {
  async GET(req, context) {
    const { id } = context.params;
    const post = await getPostData(id);
    return context.render({ post });
  },
};

export default function pagePost(props: PageProps) {
  const { post } = props?.data || {};
  const dateFormat = new Intl.DateTimeFormat("es").format(new Date(post.date));
  return (
    <article class="p-4">
      <h1 class="text-6xl">{post.title}</h1>
      <time>{dateFormat}</time>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div dangerouslySetInnerHTML={{ __html: post.body }} />
    </article>
  );
}
