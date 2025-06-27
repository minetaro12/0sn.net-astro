import Icon from './Icon'
import { createSignal } from 'solid-js'

const links = [
  { href: '/about/', label: 'About' },
  { href: '/archives/', label: 'Archives' },
  { href: '/tags/', label: 'Tags' },
  { href: '/links/', label: 'Links' },
  { href: 'https://github.com/minetaro12', label: 'GitHub' },
]

const HeaderButton = () => {
  const [open, setOpen] = createSignal(false)

  const handleChangeTheme = () => {
    document.documentElement.classList.toggle('dark')
  }

  return (
    <>
      <button
        class="cursor-pointer rounded-full px-2 py-1 transition hover:backdrop-brightness-90 active:backdrop-brightness-80"
        onClick={handleChangeTheme}
      >
        <Icon name="dark" />
      </button>
      <button
        class="cursor-pointer rounded-full px-2 py-1 transition hover:backdrop-brightness-90 active:backdrop-brightness-80"
        onClick={() => setOpen(!open())}
      >
        <Icon name="menu" />
      </button>
      <div
        data-open={open()}
        class="pointer-events-none fixed inset-0 z-50 data-[open=true]:pointer-events-auto"
      >
        <div
          data-open={open()}
          class="absolute inset-0 opacity-0 backdrop-brightness-75 transition data-[open=true]:opacity-100"
          onClick={() => setOpen(false)}
        />
        <div
          data-open={open()}
          class="bg-background text-fg absolute top-0 right-0 h-full translate-x-full pt-8 transition-transform duration-300 data-[open=true]:translate-x-0"
        >
          {links.map((link) => (
            <a
              href={link.href}
              class="block px-6 py-2 text-xl font-bold hover:backdrop-brightness-75 dark:hover:bg-gray-600"
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
