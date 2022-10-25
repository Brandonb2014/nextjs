import Head from 'next/head';

export default function Loading() {
  return (
    <span>
      <Head>
        <title>Yo, we are loading</title>
        <meta charSet='utf-8' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <div className='min-h-screen flex justify-center pt-96 text-3xl'>
        Loading...
      </div>
    </span>
  );
}