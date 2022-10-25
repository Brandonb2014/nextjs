import Link from 'next/link';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import Pagination from '../../components/Pagination';
import Head from 'next/head';

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
    
  if (error) return (
    <div>
      {error.message}
    </div>
  )
  if (!data) return (
    <div>
      Loading...
    </div>
  )

  return (
    <div>
      <Head>
        <title>Planets</title>
        <meta charSet='utf-8' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <div>
        {data.results.map((planet) => (
          <>
            <Link
              href={'/' + pageNameDash + planet.url.substr(planet.url.indexOf(pageNameDash) + pageNameDash.length)}
              key={planet.url.substr(planet.url.indexOf(pageNameDash) + pageNameDash.length)}
            >
              {planet.name}
            </Link>
          </>
        ))}
      </div>

      <Pagination pathName={'/' + pageName} totalPosts={data.count} paginate={{page}} />
    </div>
  )
}