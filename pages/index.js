import Head from 'next/head';

export default function Home() {
  return (
    <div className='min-h-screen'>
      <Head>
        <title>SWAPI-dia</title>
        <meta charSet='utf-8' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <p className='md:text-5xl text-xl font-bold flex justify-center p-5'>
        Welcome to the SWAPI-dia!
      </p>
      <p className='md:text-3xl text-lg flex justify-center p-5'>
        This guide is all Star Wars and uses the open Star Wars API - SWAPI!
      </p>
      <p className='md:text-2xl flex justify-center p-5'>
        Click the links in the navbar to explore the Star Wars universe.
      </p>
      <p className='md:text-1xl flex justify-center p-5'>
        Oh, and may the Force be with you!
      </p>
    </div>
  );
}
