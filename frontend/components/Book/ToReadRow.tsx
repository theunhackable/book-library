import React, { MouseEvent } from 'react'
import { TableCell } from '../ui/table'
import { Button } from '../ui/button'
import { deleteBook, updateBook } from '@/lib/data';
type ToReadRowProps = {
  book: Book;
  books: Book[] | null;
  setBooks: React.Dispatch<React.SetStateAction<Book[] | null>>;
}
const ToReadRow = ({book, books, setBooks}: ToReadRowProps) => {

  const handleToRead = async (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    e.preventDefault();
    const book_name = e.currentTarget.value;

    const book_id = books?.filter((book: Book) => book.book_name === book_name)[0].book_id;
    if (book_id)
      await updateBook(book_id, 'to-read')
    else alert('Book not found')
  }

  const handleDelete = async (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    e.preventDefault();
    const book_name = e.currentTarget.value;

    const book_id = books?.filter((book: Book) => book.book_name === book_name)[0].book_id;
    if (book_id)
      await deleteBook(book_id)
    else alert('Book not found')
  }
  return (
    <TableCell className="text-center">
    {
      book.book_status === 'to-read' ?
        <>
          <p>
            {book.book_name}
          </p>
          <Button onClick={handleDelete} value={book.book_name} className="bg-red-600 my-2">Delete</Button>
        </> :
        <Button onClick={handleToRead} value={book.book_name} className="bg-yellow-600" > To Read </Button>
    }

  </TableCell>
  )
}

export default ToReadRow
