import { useRouter } from "next/router";
import useSWR from 'swr';
import Head from 'next/head';
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

const fetcher = async (url: string) => {
  const res = await fetch(url);
  const data: planetDetailResponse = await res.json();

  if (res.status !== 200) {
    throw new Error(data.message);
  }
  return data;
}

export default function Planet() {
  const { query } = useRouter();
  const router = useRouter();

  const { data, error } = useSWR(
    () => `https://swapi.dev/api/planets/${query.id}`,
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
      <span className='text-2xl'><span onClick={() => router.back()} className='text-xl hover:text-sky-400 cursor-pointer'>Planets</span> &gt;&gt; {data.name}</span>
      <div className='flex items-center flex-col text-2xl py-5'>
        <div>
          <span>Name: </span>
          <span>{data.name}</span>
        </div>
        <div>
          <span>Climate: </span>
          <span>{data.climate}</span>
        </div>
        <div>
          <span>Surface Water: </span>
          <span>{data.surface_water}</span>
        </div>
        <div>
          <span>Terrain: </span>
          <span>{data.terrain}</span>
        </div>
        <div>
          <span>Diameter: </span>
          <span>{data.diameter}</span>
        </div>
        <div>
          <span>Gravity: </span>
          <span>{data.gravity}</span>
        </div>
        <div>
          <span>Orbital Period: </span>
          <span>{data.orbital_period}</span>
        </div>
        <div>
          <span>Rotation Period: </span>
          <span>{data.rotation_period}</span>
        </div>
      </div>
    </div>
  );
}