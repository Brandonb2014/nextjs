import React from 'react';
import Link from 'next/link';

function PreviousPage(currentPage) {
  if (currentPage === 1) {
    return <span />;
  }

  return (
    <Link href={{ pathname: '/planets', query: { page: currentPage - 1 } }}>
      <a className='hover:text-sky-400'>Previous</a>
    </Link>
  );
}

function NextPage(currentPage, pageNumbers) {
  if (currentPage === pageNumbers) {
    return <span />;
  }

  return (
    <Link href={{ pathname: '/planets', query: { page: currentPage + 1 } }}>
      <a className='hover:text-sky-400'>Next</a>
    </Link>
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
      {PreviousPage(currentPage)}
      {pageNumbers.map(number => (
        <Link key={number} href={{ pathname: pathName, query: { page: number } }}>
          <a className='mx-5 hover:text-sky-400'>{number}</a>
        </Link>
      ))}
      {NextPage(currentPage, pageNumbers.length)}
    </nav>
  );
}

export default Pagination;