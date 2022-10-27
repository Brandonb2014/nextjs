import Link from 'next/link';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import Head from 'next/head';
import Loading from '../../components/Loading';
import React, { useState, useEffect } from 'react';

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
  const [loadedRefs, setLoadedRefs] = useState([]);
  const [homeWorld, setHomeworld] = useState([]);
  
  const { query } = useRouter();
  const page = query.page ?? 1;
  
  const { data, error } = useSWR(
    () => `https://swapi.dev/api/people/${query.id}`,
    fetcher
  );

  useEffect(() => {
    const fetchRefs = async (refs: string[]) => {
      setLoadedRefs(
        await Promise.all(
          refs.map((ref) => 
            fetch(`${ref}`)
              .then((resp) => resp.json()).then((films) => {
                return films.title;
              })
          )
        )
      );
    }

    if (data?.films) {
      setLoadedRefs(['Loading...']);
      fetchRefs(data.films);
    }

    },
    [ data ]
  );

  useEffect(() => {
    const fetchRefs = async (refs: string[]) => {
      setHomeworld(
        await Promise.all(
          refs.map((ref) => 
            fetch(`${ref}`)
              .then((resp) => resp.json()).then((respJson) => {
                return {
                  name: respJson.name,
                  url: respJson.url
                }
              })
          )
        )
      );
    }

    if (data?.homeworld) {
      setHomeworld(['Loading...']);
      fetchRefs([data.homeworld]);
    }

    },
    [ data ]
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
  
  const { name, height, mass, hair_color, skin_color, eye_color, birth_year, gender } = data;
  return (
    <div className='min-h-screen'>
      <Head>
        <title>{name}</title>
        <meta charSet='utf-8' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <span className='text-2xl'>
        <Link href={{ pathname: '/people', query: { page: page } }}>
          <span>
            <a className='text-xl hover:text-sky-400 cursor-pointer'>People</a> &gt;&gt; {name}
          </span>
        </Link>
      </span>
      <div className='flex items-center flex-col text-2xl py-5'>
        <div>
          <span className='text-orange-800 font-semibold'>Name: </span>
          <span>{name}</span>
        </div>
        <div>
          <span className='text-orange-800 font-semibold'>Height: </span>
          <span>{height}</span>
        </div>
        <div>
          <span className='text-orange-800 font-semibold'>Mass: </span>
          <span>{mass}</span>
        </div>
        <div>
          <span className='text-orange-800 font-semibold'>Hair Color: </span>
          <span>{hair_color}</span>
        </div>
        <div>
          <span className='text-orange-800 font-semibold'>Skin Color: </span>
          <span>{skin_color}</span>
        </div>
        <div>
          <span className='text-orange-800 font-semibold'>Eye Color: </span>
          <span>{eye_color}</span>
        </div>
        <div>
          <span className='text-orange-800 font-semibold'>Birth Year: </span>
          <span>{birth_year}</span>
        </div>
        <div>
          <span className='text-orange-800 font-semibold'>Gender: </span>
          <span>{gender}</span>
        </div>
        <div>
          <span className='text-orange-800 font-semibold'>Homeworld: </span>
          {homeWorldLink(homeWorld)}
        </div>
        <div className='flex'>
          <span className='text-orange-800 font-semibold'>Films:&nbsp;</span>
          <span>
            {loadedRefs.map((film) => {
              return <p key={film}>{film}</p>
            })}
          </span>
        </div>
      </div>
    </div>
  );
}

function homeWorldLink(homeWorld) {
  if (homeWorld?.length && homeWorld[0] === 'Loading...') {
    return <span>Loading...</span>
  } else if (homeWorld?.length) {
    return (
      <Link
        href={'/planets/' + homeWorld[0].url.substr(homeWorld[0].url.indexOf('planets/') + 8)}
        key={homeWorld[0].url.substr(homeWorld[0].url.indexOf('planets/') + 8)}
      >
        <a className='hover:text-sky-400'>{homeWorld[0].name}</a>
      </Link>
    );
  } else {
    return <span>N/A</span>
  }
}