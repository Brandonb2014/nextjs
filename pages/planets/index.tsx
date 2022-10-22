import Link from 'next/link';
import useSWR from 'swr';
import { useRouter } from "next/router";
import Pagination from '../../components/Pagination';

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
  console.log('router:', router);
  const { data, error } = useSWR(
    () => 'https://swapi.dev/api/planets/?page=' + page,
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

      <Pagination totalPosts={data.count} paginate={{page}} />
    </div>
  )
}