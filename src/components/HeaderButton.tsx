import Icon from './Icon'
import { createSignal } from 'solid-js'

const links = [
  { href: '/about/', label: 'About' },
  { href: '/archives/', label: 'Archives' },
  { href: '/tags/', label: 'Tags' },
  { href: '/links/', label: 'Links' },
  { href: 'https://github.com/minetaro12', label: 'My GitHub' },
]

const HeaderButton = () => {
  const [open, setOpen] = createSignal(false)

  const handleChangeTheme = () => {
    const theme = localStorage.getItem('theme')
    if (!theme) {
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)',
      ).matches
      const newTheme = prefersDark ? 'light' : 'dark'
      document.documentElement.classList.toggle('dark', newTheme === 'dark')
      localStorage.setItem('theme', newTheme)
    } else {
      const newTheme = theme === 'dark' ? 'light' : 'dark'
      document.documentElement.classList.toggle('dark', newTheme === 'dark')
      localStorage.setItem('theme', newTheme)
    }
  }

  return (
    <>
      <button
        class="cursor-pointer rounded-full px-2 py-1 transition hover:backdrop-brightness-90 active:backdrop-brightness-80"
        onClick={handleChangeTheme}
        aria-label="Change theme"
      >
        <span class="darkicon">
          <Icon name="dark" />
        </span>
        <span class="lighticon">
          <Icon name="light" />
        </span>
      </button>
      <button
        class="cursor-pointer rounded-full px-2 py-1 transition hover:backdrop-brightness-90 active:backdrop-brightness-80"
        onClick={() => setOpen(!open())}
        aria-label="Open menu"
      >
        <Icon name="menu" />
      </button>
      <div
        data-open={open()}
        class="pointer-events-none fixed inset-0 z-50 data-[open=true]:pointer-events-auto"
      >
        <div
          data-open={open()}
          class="absolute inset-0 opacity-0 backdrop-brightness-50 transition data-[open=true]:opacity-100"
          onClick={() => setOpen(false)}
        />
        <div
          data-open={open()}
          class="bg-background text-fg absolute top-0 right-0 h-full translate-x-full pt-8 shadow-2xl transition-transform duration-300 data-[open=true]:translate-x-0"
        >
          {links.map((link) => (
            <a
              href={link.href}
              class="block px-7 py-2 text-xl font-bold hover:backdrop-brightness-75 dark:hover:bg-gray-600"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </>
  )
}

export default HeaderButton
