import { deleteBook, updateBook } from '@/lib/data';
import React, { MouseEvent } from 'react'
import { TableCell } from '../ui/table';
import { Button } from '../ui/button';

type InProgressRowProps = {
  book: Book;
  books: Book[] | null;
  setBooks: React.Dispatch<React.SetStateAction<Book[] | null>>;
}

const InProgressRow = ({book, books, setBooks}: InProgressRowProps) => {
  

  const handleDelete = async (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    e.preventDefault();
    const book_name = e.currentTarget.value;

    const book_id = books?.filter((book: Book) => book.book_name === book_name)[0].book_id;
    if (book_id)
      await deleteBook(book_id)
    else alert('Book not found')
  }


  const handleProgress = async (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    e.preventDefault();
    const book_name = e.currentTarget.value;

    const book_id = books?.filter((book: Book) => book.book_name === book_name)[0].book_id;
    if (book_id)
      await updateBook(book_id, 'in-progress')
    else alert('Book not found')
  }

  return (
    <TableCell className="text-center">
    {
      book.book_status === 'in-progress' ?
        <>
          <p>
            {book.book_name}
          </p>
          <Button onClick={handleDelete} value={book.book_name} className="bg-red-600 my-2">Delete</Button>
        </> :
        <Button onClick={handleProgress} value={book.book_name} className="bg-blue-600"> Reading </Button>
    }

  </TableCell>
  )
}

export default InProgressRow
