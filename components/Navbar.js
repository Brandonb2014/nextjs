import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function Navbar() {
  const router = useRouter();

  return (
    <div className='bg-zinc-200'>
      <header>
        <nav className='flex justify-center'>
          <Link href='/'>
            <span className={'flex flex-col hover:bg-slate-400 cursor-pointer p-2 mt-1' + (router.pathname == '/' ? ' active' : '')}>
              <Image src='/home.png' alt='' width={50} height={50} />
              <a>Home</a>
            </span>
          </Link>
          <Link href={{ pathname: '/planets', query: { page: 1 } }}>
            <span className={'flex flex-col hover:bg-slate-400 cursor-pointer p-2 mt-1' + (router.pathname.includes('/planets') ? ' active' : '')}>
              <Image src='/planet.png' alt='' width={50} height={50} />
              <a>Planets</a>
            </span>
          </Link>
          <Link href={{ pathname: '/people', query: { page: 1 } }}>
            <span className={'flex flex-col hover:bg-slate-400 cursor-pointer p-2 mt-1' + (router.pathname.includes('/people') ? ' active' : '')}>
              <Image src='/people.png' alt='' width={50} height={50} />
              <a>People</a>
            </span>
          </Link>
        </nav>
      </header>
    </div>
  );
}