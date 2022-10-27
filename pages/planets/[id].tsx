import Link from 'next/link';
import { useRouter } from "next/router";
import useSWR from 'swr';
import Head from 'next/head';
import Loading from '../../components/Loading';
import React, { useState, useEffect } from 'react';

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
  const [loadedRefs, setLoadedRefs] = useState([]);

  const { query } = useRouter();
  const page = query.page ?? 1;

  const { data, error } = useSWR(
    () => `https://swapi.dev/api/planets/${query.id}`,
    fetcher
  );

  useEffect(() => {
    const fetchRefs = async (refs: string[]) => {
      setLoadedRefs(
        await Promise.all(
          refs.map((ref) => 
            fetch(`${ref}`)
              .then((resp) => resp.json()).then((resident) => {
                return {
                  name: resident.name,
                  url: resident.url
                };
              })
          )
        )
      );
    }

    if (data?.residents) {
      setLoadedRefs(['Loading...']);
      fetchRefs(data.residents);
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
  
  const { name, climate, surface_water, terrain, diameter, gravity, orbital_period, rotation_period } = data;
  return (
    <div className='min-h-screen'>
      <Head>
        <title>{name}</title>
        <meta charSet='utf-8' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <span className='text-2xl'>
        <Link href={{ pathname: '/planets', query: { page: page } }}>
          <span>
            <a className='text-xl hover:text-sky-400 cursor-pointer'>Planets</a> &gt;&gt; {name}
          </span>
        </Link>
      </span>
      <div className='flex items-center flex-col text-2xl py-5'>
        <div>
          <span className='text-orange-800 font-semibold'>Name: </span>
          <span>{name}</span>
        </div>
        <div>
          <span className='text-orange-800 font-semibold'>Climate: </span>
          <span>{climate}</span>
        </div>
        <div>
          <span className='text-orange-800 font-semibold'>Surface Water: </span>
          <span>{surface_water}</span>
        </div>
        <div>
          <span className='text-orange-800 font-semibold'>Terrain: </span>
          <span>{terrain}</span>
        </div>
        <div>
          <span className='text-orange-800 font-semibold'>Diameter: </span>
          <span>{diameter}</span>
        </div>
        <div>
          <span className='text-orange-800 font-semibold'>Gravity: </span>
          <span>{gravity}</span>
        </div>
        <div>
          <span className='text-orange-800 font-semibold'>Orbital Period: </span>
          <span>{orbital_period}</span>
        </div>
        <div>
          <span className='text-orange-800 font-semibold'>Rotation Period: </span>
          <span>{rotation_period}</span>
        </div>
        <div className='flex'>
          <span className='text-orange-800 font-semibold'>Residents:&nbsp;</span>
          {residentsList(loadedRefs)}
        </div>
      </div>
    </div>
  );
}

function residentsList(residents) {
  if (residents?.length && residents[0] === 'Loading...') {
    return <span>Loading...</span>
  } else if (residents?.length) {
    return (
      <ul>
      {residents.map((resident) => (
        <li key={resident.name}>
          <Link
            href={'/people/' + resident.url.substr(resident.url.indexOf('people/') + 7)}
            key={resident.url.substr(resident.url.indexOf('people/') + 7)}
          >
            <a className='hover:text-sky-400'>{resident.name}</a>
          </Link>
        </li>
      ))}
      </ul>
    );
  } else {
    return <span>N/A</span>
  }
}