import Link from 'next/link';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Pagination from '../../components/Pagination';
import Loading from '../../components/Loading';

type planetDetailResponse = {
  climate: string,
  created: string,
  diameter: string,
  edited: string,
  films: [string],
  gravity: string,
  name: string,
  orbital_period: string,
  population: string,
  residents: [string],
  rotation_period: string,
  surface_water: string,
  terrain: string,
  url: string,
  message: string
};

type planetResponse = {
  count: number,
  next: string,
  previous: string,
  results: [planetDetailResponse],
  url: string,
  message: string
};

const fetcher = async (url: string) => {
  const res = await fetch(url);
  const data: planetResponse = await res.json();

  if (res.status !== 200) {
    throw new Error(data.message);
  }

  return data;
}

export default function PlanetsList() {
  const router = useRouter();
  const page = router.query.page;
  const pageName: string = 'planets';
  const pageNameDash: string = pageName + '/';
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
      <p className='md:text-3xl text-lg flex justify-center py-5'>
        Click a planet to get more information.
      </p>
      <div className='flex justify-center flex-wrap md:text-2xl py-5'>
        {data.results.map((planet) => (
          <Link
            href={{ pathname: '/' + pageNameDash + planet.url.substr(planet.url.indexOf(pageNameDash) + pageNameDash.length), query: { page: page } }}
            key={planet.url.substr(planet.url.indexOf(pageNameDash) + pageNameDash.length)}
          >
            <a className='md:m-5 m-2 hover:text-sky-400'>{planet.name}</a>
          </Link>
        ))}
      </div>

      <Pagination pathName={'/' + pageName} totalPosts={data.count} paginate={{page}} />
    </div>
  );
}