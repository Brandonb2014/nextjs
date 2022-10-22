import React from 'react';
import Link from 'next/link';

function PreviousPage(currentPage) {
  if (currentPage === 1) {
    return <span />
  }

  return (
    <Link href={{ pathname: '/planets', query: { page: currentPage - 1 } }}>
      Previous
    </Link>
  )
}

function NextPage(currentPage, pageNumbers) {
  if (currentPage === pageNumbers) {
    return <span />
  }

  return (
    <Link href={{ pathname: '/planets', query: { page: currentPage + 1 } }}>
      Next
    </Link>
  )
}

const Pagination = ({ totalPosts, paginate }) => {
  const pageNumbers = [];
  const currentPage = parseInt(paginate.page);

  for (let i = 1; i <= Math.ceil(totalPosts / 10); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      {PreviousPage(currentPage)}
      {pageNumbers.map(number => (
        <Link key={number} href={{ pathname: '/planets', query: { page: number } }}>
          {number}
        </Link>
      ))}
      {NextPage(currentPage, pageNumbers.length)}
    </nav>
  )
}

export default Pagination;