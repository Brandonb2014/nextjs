import Head from 'next/head';

export default function Home() {
  return (
    <div>
      <Head>
        <title>SWAPI-dia</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <p className="text-3xl font-bold">
        Welcome to the SWAPI-dia!
      </p>
    </div>
  )
}
