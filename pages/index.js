import Head from 'next/head';

export default function Home() {
  return (
    <div className='min-h-screen'>
      <Head>
        <title>SWAPI-dia</title>
        <meta charSet='utf-8' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <p className='text-5xl font-bold flex justify-center py-5'>
        Welcome to the SWAPI-dia!
      </p>
      <p className='text-3xl flex justify-center py-5'>
        This guide is all Star Wars and uses the open Star Wars API - SWAPI!
      </p>
      <p className='text-2xl flex justify-center py-5'>
        Click the links in the navbar to explore the Star Wars universe.
      </p>
      <p className='text-1xl flex justify-center py-5'>
        Oh, and may the Force be with you!
      </p>
    </div>
  );
}
