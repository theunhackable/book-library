import { deleteBook, updateBook } from '@/lib/data';
import React, { MouseEvent } from 'react'
import { TableCell } from '../ui/table';
import { Button } from '../ui/button';

type InProgressRowProps = {
  book: Book;
  books: Book[];
  setBooks: React.Dispatch<React.SetStateAction<Book[]>>;
}

const InProgressRow = ({book, books, setBooks}: InProgressRowProps) => {
  
  const {book_id, book_name, book_status} = book;
  
  const handleDelete = async (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    e.preventDefault();

    const res = await deleteBook(book_id)
    if(res) {
      const newBooks: Book[] = books.filter((book: Book) => book.book_id !== book_id)
      setBooks(newBooks)
    }
  }


  const handleProgress = async (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    e.preventDefault();

    if (book_id){
      const newBook =  {...book, book_status: 'in-progress'}
      const res = await updateBook(book_id, newBook)
      if(res) {
        const newBooks: Book[] = books.filter((book: Book) => book.book_id !== book_id)

        setBooks(prev => {
          const newBooks = prev.map( (book: Book) => {
            if(book.book_id === book_id) {
              return {
                ...book,
                book_status: 'in-progress'
              }
            }
            return book
          })
          return newBooks
        })
      }
    }
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
          <Button onClick={handleDelete} className="bg-red-600 my-2">Delete</Button>
        </> :
        <Button onClick={handleProgress} className="bg-blue-600"> Reading </Button>
    }

  </TableCell>
  )
}

export default InProgressRow
