import { useRouter } from "next/router";
import Link from 'next/link';
import Head from 'next/head';
import useSWR from 'swr';

const fetcher = async (url: string) => {
  const res = await fetch(url)
  const data = await res.json()

  if (res.status !== 200) {
    throw new Error(data.message)
  }
  return data
}

export default function Planet({
  backUrl = 'https://swapi.dev/api/planets/?page=1'
}) {
  const { query } = useRouter()
  const { data, error } = useSWR(
    () => `https://swapi.dev/api/planets/${query.id}`,
    fetcher
  )
    
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
      <Link href='/planets'>Back</Link>

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
  )
}