import { useRouter } from 'next/router';
import useSWR from 'swr';
import Head from 'next/head';

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

  const { data, error } = useSWR(
    () => `https://swapi.dev/api/people/${query.id}`,
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
    </div>
  );
}