import Link from 'next/link';
import Head from 'next/head';

export default function Navbar({
  children,
  title = 'SWAPI-dia',
}) {
  return (
    <div>
      <header>
        <nav>
          <Link href="/">
            <a>Home</a>
          </Link>
          {' '}
          |
          {' '}
          <Link href={{ pathname: '/planets', query: { page: 1 } }}>
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