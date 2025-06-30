import { getCollection } from 'astro:content'

export const getSortedPosts = async () => {
  const posts = await getCollection('posts')

  return posts.sort((a, b) => {
    return new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
  })
}

export const getSortedPostByIndex = async (index: number) => {
  // 10件ごとに分割
  const posts = await getSortedPosts()

  const start = (index - 1) * 10
  const end = start + 10

  return {
    posts: posts.slice(start, end),
    totalPosts: posts.length,
    currentPage: index,
    totalPages: Math.ceil(posts.length / 10)
  }
}

export const getAllTags = async () => {
  const allPosts = await getSortedPosts()
  const tagsSet = new Set<string>()
  allPosts.forEach((post) => {
    post.data.tags.forEach((tag) => {
      tagsSet.add(tag)
    })
  })
  return Array.from(tagsSet).sort()
}

export const getSortedPostsByTag = async (tag: string) => {
  const posts = await getCollection('posts', (entry) => {
    return entry.data.tags.includes(tag)
  })

  return posts.sort((a, b) => {
    return new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
  })
}
