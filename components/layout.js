import Link from 'next/link'
import Head from 'next/head'

export default function Layout({
  children,
  title = 'SWAPI-dia',
}) {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header>
        <nav>
          <Link href="/">
            <a>Home</a>
          </Link>
          {' '}
          |
          {' '}
          <Link href="/planets">
            <a>Planets</a>
          </Link>{' '}
          {/* |
          <Link href="/people">
            <a>People</a>
          </Link> */}
        </nav>
      </header>

      <h1>{children}</h1>
    </div>
  )
}