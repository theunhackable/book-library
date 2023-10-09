import { getBooksData } from '@/lib/data';
import React from 'react'

const UserDetails = async() => {
  const books = await getBooksData();

  return (
    <section className='bg-[#f2f2f2] p-5 text-center'>
      <h2 className='text-xl font-bold mb-1'>
        Jhon Wick
      </h2>
      <p className='text-sm italic'>
        Number of Books: {books === null ? 0 : books?.length}
      </p>
    </section>
  )
}

export default UserDetails