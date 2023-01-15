import { getPostData } from "./post.ts";
import { assertEquals } from "$std/testing/asserts.ts";

Deno.test("gettPostData() return null if the post does not exist", async () => {
  const post = await getPostData("non-existent-post");
  if (post !== null) throw new Error("getPostData() should return null");
});

Deno.test("getPostData() returns the content of the post", async () => {
  const post = await getPostData("no-content");
  assertEquals(post, null);
});

Deno.test("getPostData() returns the content of the post", async () => {
  const post = await getPostData("hello-world");
  assertEquals(post?.id, "hello-world");
});
