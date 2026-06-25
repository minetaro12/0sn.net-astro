import { createEffect, createSignal } from "solid-js"
import Icon from "./Icon"

const Tags = ({ tags }: { tags: string[] }) => {
  const [search, setSearch] = createSignal("")
  const [filteredTags, setFilteredTags] = createSignal(tags)
  let inputRef: HTMLInputElement | undefined

  createEffect(() => {
    setSearch(sessionStorage.getItem("searchTags") || "")
    inputRef?.focus()
  })

  createEffect(() => {
    sessionStorage.setItem("searchTags", search())
    handleSearch()
  }, [search])

  const handleSearch = () => {
    const searchTerm = search().toLocaleLowerCase()

    if (search()) {
      setFilteredTags(tags.filter((tag) => tag.includes(searchTerm)))
    } else {
      setFilteredTags(tags)
    }
  }

  return (
    <>
      <h2 class="py-4 text-3xl font-bold">Tags</h2>
      <div class="relative mb-4 flex items-center">
        <input
          type="text"
          placeholder="Search tags..."
          class="bg-button w-full rounded p-2"
          value={search()}
          onInput={(e) => setSearch(e.currentTarget.value)}
          ref={inputRef}
        />
        {search() && (
          <button
            class="absolute right-4 cursor-pointer"
            onClick={() => {
              setSearch('')
            }}
          >
            ✕
          </button>
        )}
      </div>
      <div class="flex flex-wrap gap-4">
        {
          filteredTags().map((tag) => (
            <a
              href={`/tags/${tag}/`}
              class="bg-button hover:bg-button-hover rounded p-1"
            >
              <Icon name="tag" />
              {tag}
            </a>
          ))
        }
      </div>
    </>
  )
}

export default Tags
