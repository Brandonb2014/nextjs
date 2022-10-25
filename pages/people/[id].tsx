import { useRouter } from 'next/router';
import useSWR from 'swr';
import Head from 'next/head';
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

const fetcher = async (url: string) => {
  const res = await fetch(url);
  const data: peopleDetailResponse = await res.json();

  if (res.status !== 200) {
    throw new Error(data.message);
  }
  return data;
}

export default function People() {
  const { query } = useRouter();
  const router = useRouter();

  const { data, error } = useSWR(
    () => `https://swapi.dev/api/people/${query.id}`,
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
        <title>{data.name}</title>
        <meta charSet='utf-8' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <span className='text-2xl'><span onClick={() => router.back()} className='text-xl hover:text-sky-400 cursor-pointer'>People</span> &gt;&gt; {data.name}</span>
      <div className='flex items-center flex-col text-2xl py-5'>
        <div>
          <span>Name: </span>
          <span>{data.name}</span>
        </div>
        <div>
          <span>Height: </span>
          <span>{data.height}</span>
        </div>
        <div>
          <span>Mass: </span>
          <span>{data.mass}</span>
        </div>
        <div>
          <span>Hair Color: </span>
          <span>{data.hair_color}</span>
        </div>
        <div>
          <span>Skin Color: </span>
          <span>{data.skin_color}</span>
        </div>
        <div>
          <span>Eye Color: </span>
          <span>{data.eye_color}</span>
        </div>
        <div>
          <span>Birth Year: </span>
          <span>{data.birth_year}</span>
        </div>
        <div>
          <span>Gender: </span>
          <span>{data.gender}</span>
        </div>
        <div>
          <span>Films: </span>
          <span>{data.films}</span>
        </div>
        <div>
          <span>Species: </span>
          <span>{data.species}</span>
        </div>
        <div>
          <span>Starships: </span>
          <span>{data.starships}</span>
        </div>
        <div>
          <span>Vehicles: </span>
          <span>{data.vehicles}</span>
        </div>
      </div>
    </div>
  );
}

const filmFetcher = async (url: string) => {
  if (url) {
    const res = await fetch(url);
    const data = await res.json();
  console.log('data:', data);
    if (res.status !== 200) {
      throw new Error(data.message);
    }
    return data;
  }
  return '';
}

function FilmsList(films) {
  let listOfNames = '';

  films.forEach(film => {
    const { data, error } = useSWR(
      () => film,
      filmFetcher
    );
  
    if (error) {
      return (
        <div className='min-h-screen flex justify-center pt-96 text-3xl'>
          {error.message}
        </div>
      );
    }

    if (!data) {
      return 'Loading...';
    }

    listOfNames += (listOfNames !== '' ? ', ' + data.title : data.title);
    console.log('data:', data);
  });

  return listOfNames;
}