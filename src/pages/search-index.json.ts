import { getSortedPosts } from '../lib/posts'
import type { Post } from '../types/search'

export async function GET() {
  const posts: Post[] = (await getSortedPosts()).map((post) => ({
    id: post.id,
    title: post.data.title,
    body: post.body || ''
  }))

  return new Response(JSON.stringify(posts))
}
