import { createEffect, createSignal } from 'solid-js'
import type { Post } from '../types/search'

const Search = () => {
  let posts: Post[] = []
  let inputRef: HTMLInputElement | undefined
  const [word, setWord] = createSignal('')
  const [filteredPosts, setFilteredPosts] = createSignal<Post[]>([])
  const [isLoading, setIsLoading] = createSignal(true)

  createEffect(async () => {
    setWord(sessionStorage.getItem('searchWord') || '')
    const res = await fetch('/search-index.json')
    const data: Post[] = await res.json()
    posts = data
    setIsLoading(false)
    inputRef?.focus()
    handleSearch()
  })

  createEffect(() => {
    sessionStorage.setItem('searchWord', word())
    handleSearch()
  }, [word])

  const handleSearch = () => {
    const searchTerm = word().toLowerCase()

    if (searchTerm === '') {
      setFilteredPosts([])
      return
    }

    setFilteredPosts(
      posts
        .filter(
          (post) =>
            post.title.toLowerCase().includes(searchTerm) ||
            post.body.toLowerCase().includes(searchTerm)
        )
        .map((post) => {
          const title = post.title.replace(
            new RegExp(searchTerm, 'gi'),
            (match) => `<mark>${match}</mark>`
          )

          const index = post.body.toLowerCase().indexOf(searchTerm)
          const start = Math.max(0, index - 40)
          const end = Math.min(post.body.length, index + 40)
          const body = post.body
            .slice(start, end)
            .replace(
              new RegExp(searchTerm, 'gi'),
              (match) => `<mark>${match}</mark>`
            )

          return {
            ...post,
            title,
            body
          }
        })
    )
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        class="bg-button focus: mb-2 w-full rounded p-2"
        value={word()}
        onInput={(e) => setWord(e.currentTarget.value)}
        ref={inputRef}
      />
      {isLoading() && <p>Loading...</p>}
      <ul>
        {filteredPosts().map((post) => (
          <>
            <li class="p-2">
              <a
                href={`/posts/${post.id}/`}
                innerHTML={post.title}
                class="mb-4 text-lg hover:underline"
              ></a>
              <p innerHTML={post.body} class="text-sm"></p>
            </li>
            <hr class="border-gray opacity-50" />
          </>
        ))}
      </ul>
    </div>
  )
}

export default Search
