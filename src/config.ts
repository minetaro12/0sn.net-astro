const config = {
  title: 'minetaro12',
  description: 'Oさんのページ',
  url: 'https://0sn.net',
  repoContent: ({ dateSlug, postSlug }: { dateSlug: string, postSlug: string }) => {
    return `https://github.com/minetaro12/0sn.net-astro/blob/master/content/posts/${dateSlug}/${postSlug}/index.md`
  }
}

export default config
