import Link from 'next/link';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Pagination from '../../components/Pagination';
import Loading from '../../components/Loading';

const fetcher = async (url: string) => {
  const res = await fetch(url);
  const data = await res.json();

  if (res.status !== 200) {
    throw new Error(data.message);
  }

  return data;
}

export default function PlanetsList() {
  const router = useRouter();
  const page = router.query.page;
  const pageName = 'planets';
  const pageNameDash = pageName + '/';
  const { data, error } = useSWR(
    () => 'https://swapi.dev/api/' + pageName + '/?page=' + page,
    fetcher
  );

  if (error) {
    return (
      <div className='min-h-screen flex justify-center pt-96 text-3xl'>
        {error.message}
      </div>
    );
  }

  if (!data) {
    return (
      <Loading />
    );
  }

  return (
    <div className='min-h-screen'>
      <Head>
        <title>Planets</title>
        <meta charSet='utf-8' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <p className='text-3xl flex justify-center py-5'>
        Click a planet to get more information.
      </p>
      <div className='flex justify-center text-2xl'>
        {data.results.map((planet) => (
          <Link
            href={'/' + pageNameDash + planet.url.substr(planet.url.indexOf(pageNameDash) + pageNameDash.length)}
            key={planet.url.substr(planet.url.indexOf(pageNameDash) + pageNameDash.length)}
          >
            <a className='m-5 hover:text-sky-400'>{planet.name}</a>
          </Link>
        ))}
      </div>

      <Pagination pathName={'/' + pageName} totalPosts={data.count} paginate={{page}} />
    </div>
  );
}