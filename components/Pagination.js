import React from 'react';
import Link from 'next/link';

function PreviousPage(currentPage) {
  if (currentPage === 1) {
    return <span />;
  }

  return (
    <a className='hover:text-sky-400'>Previous</a>
  );
}

function NextPage(currentPage, pageNumbers) {
  if (currentPage === pageNumbers) {
    return <span />;
  }

  return (
    <a className='hover:text-sky-400'>Next</a>
  );
}

const Pagination = ({ pathName, totalPosts, paginate }) => {
  const pageNumbers = [];
  const currentPage = parseInt(paginate.page);

  for (let i = 1; i <= Math.ceil(totalPosts / 10); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className='flex justify-center text-3xl'>
      <>
        <Link href={{ pathname: pathName, query: { page: currentPage - 1 } }}>
          {PreviousPage(currentPage)}
        </Link>
        {pageNumbers.map(number => (
          <Link key={number} href={{ pathname: pathName, query: { page: number } }}>
            <a className='mx-5 hover:text-sky-400'>{number}</a>
          </Link>
        ))}
        <Link href={{ pathname: pathName, query: { page: currentPage + 1 } }}>
          {NextPage(currentPage, pageNumbers.length)}
        </Link>
      </>
    </nav>
  );
}

export default Pagination;