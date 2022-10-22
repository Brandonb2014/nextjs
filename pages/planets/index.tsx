import Link from 'next/link';
import useSWR from 'swr';
import { useRouter } from "next/router";

const fetcher = async (url: string) => {
  const res = await fetch(url);
  const data = await res.json();

  if (res.status !== 200) {
    throw new Error(data.message);
  }

  console.log('data:', data);
  return data;
}

export default function PlanetsList({
  url = 'https://swapi.dev/api/planets/?page=1'
}) {
  const router = useRouter();
  console.log('router:', router);
  console.log('url:', url);
  const { data, error } = useSWR(
    () => url,
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
      <div>
        {data.results.map((planet) => (
          <>
            <Link href={'/planets/' + planet.url.substr(planet.url.indexOf("planets/") + 8)} key={planet.url.substr(planet.url.indexOf("planets/") + 8)}>
              {planet.name}
            </Link>
          </>
        ))}
      </div>
      <Link href='/planets'>Next</Link>

    </div>
  )
}