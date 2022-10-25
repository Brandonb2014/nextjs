import Link from 'next/link';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Pagination from '../../components/Pagination';
import Loading from '../../components/Loading';

type peopleDetailResponse = {
  birth_year: string,
  created: string,
  edited: string,
  eye_color: string,
  films: [string],
  gender: string,
  hair_color: string,
  height: string,
  homeworld: string,
  mass: string,
  name: string,
  skin_color: string,
  species: [string],
  starships: [string],
  url: string,
  vehicles: [string],
  message: string
};

type peopleResponse = {
  count: number,
  next: string,
  previous: string,
  results: [peopleDetailResponse],
  message: string
};

const fetcher = async (url: string) => {
  const res = await fetch(url);
  const data: peopleResponse = await res.json();

  if (res.status !== 200) {
    throw new Error(data.message);
  }

  return data;
}

export default function PeopleList() {
  const router = useRouter();
  const page = router.query.page;
  const pageName: string = 'people';
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
        <title>People</title>
        <meta charSet='utf-8' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <p className='md:text-3xl text-lg flex justify-center py-5'>
        Click a name to get more information.
      </p>
      <div className='flex justify-center flex-wrap md:text-2xl py-5'>
        {data.results.map((person) => (
          <Link
            href={'/' + pageNameDash + person.url.substr(person.url.indexOf(pageNameDash) + pageNameDash.length)}
            key={person.url.substr(person.url.indexOf(pageNameDash) + pageNameDash.length)}
          >
            <a className='md:m-5 m-2 hover:text-sky-400'>{person.name}</a>
          </Link>
        ))}
      </div>

      <Pagination pathName={'/' + pageName} totalPosts={data.count} paginate={{page}} />
    </div>
  );
}