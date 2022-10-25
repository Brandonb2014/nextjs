import Link from 'next/link';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import Pagination from '../../components/Pagination';

const fetcher = async (url: string) => {
  const res = await fetch(url);
  const data = await res.json();

  if (res.status !== 200) {
    throw new Error(data.message);
  }

  return data;
}

export default function PeopleList() {
  const router = useRouter();
  const page = router.query.page;
  const pageName = 'people';
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
      <div>
        {data.results.map((person) => (
          <>
            <Link
              href={'/' + pageNameDash + person.url.substr(person.url.indexOf(pageNameDash) + pageNameDash.length)}
              key={person.url.substr(person.url.indexOf(pageNameDash) + pageNameDash.length)}
            >
              {person.name}
            </Link>
          </>
        ))}
      </div>

      <Pagination pathName={'/' + pageName} totalPosts={data.count} paginate={{page}} />
    </div>
  );
}