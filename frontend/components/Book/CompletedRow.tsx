import React, { MouseEvent, useState } from 'react'
import { TableCell } from '../ui/table'
import { Button } from '../ui/button'
import { deleteBook, updateBook } from '@/lib/data';

type CompletedRowProps = {
  book: Book;
  books: Book[] | null;
  setBooks: React.Dispatch<React.SetStateAction<Book[] | null>>;
  
}
const CompletedRow = ( { book, books, setBooks }: CompletedRowProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const handleDelete = async (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    e.preventDefault();
    const book_name = e.currentTarget.value;

    const book_id = books?.filter((book: Book) => book.book_name === book_name)[0].book_id;
    if (book_id)
      await deleteBook(book_id)
    else alert('Book not found')
  }


  const handleComplete = async (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    e.preventDefault();
    const book_name = e.currentTarget.value;

    const book_id = books?.filter((book: Book) => book.book_name === book_name)[0].book_id;
    if (book_id)
      await updateBook(book_id, 'completed')
    else alert('Book not found')
  }
  return (
    <TableCell className="text-center">
    {
      book.book_status === 'completed' ?
        <>
          <p>
            {book.book_name}
          </p>
          <Button onClick={handleDelete} value={book.book_name} className="bg-red-600 my-2">Delete</Button>
        </> :
        <Button onClick={handleComplete} value={book.book_name} className="bg-green-600" disabled={loading}> Completed </Button>
    }

  </TableCell>

  )
}

export default CompletedRow